
import React, { useState, useMemo, useEffect, useRef } from 'react';
import { Project, Producer, LivestockSubType, ProjectCategory, CropType } from '../types';
import { URUGUAY_DEPARTMENTS } from '../constants';
import ProjectCard from './ProjectCard';
import { 
  validatePurchasePrice, 
  validateAnimalLoad,
  validateSalePrice,
  LIVESTOCK_DB,
  PASTURE_GDP,
  MARKET_PROJECTIONS_2027,
  GASTOS_COMPRA,
  GASTOS_VENTA,
  AGRO_DB,
  calculateAgroRevenue,
  validateAgroParams,
  calculateProjectFinancials,
  calculateBreedingBusiness
} from '../utils/financial';

interface ProducerProfileFormProps {
  onBack: () => void;
  onPublish: (project: Project) => void;
  currentUser: Producer;
}

const InputField = ({ label, value, onChange, onEnter, suffix, alert, sub, suggestion, rangeHint, isWarning, disabled }: any) => (
  <div className="space-y-2">
    <label className="text-[10px] font-black uppercase text-gray-400 tracking-widest block">{label}</label>
    <div className="relative">
      <input 
        type="number" 
        value={value} 
        step="0.01"
        onChange={e => onChange(Number(e.target.value))}
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            onEnter?.();
          }
        }}
        disabled={disabled}
        className={`w-full bg-gray-50 border-4 rounded-2xl p-4 font-bold outline-none transition-all ${disabled ? 'opacity-50 cursor-not-allowed' : ''} ${alert ? 'border-red-400' : isWarning ? 'border-amber-400 bg-amber-50/50' : 'border-transparent focus:border-[#4B5320]'}`}
      />
      {suffix && <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-300 font-bold text-xs">{suffix}</span>}
    </div>
    {(suggestion || rangeHint) && (
      <div className="flex flex-wrap items-center gap-2 mt-1">
        {suggestion && (
          <button 
            onClick={() => onChange(suggestion)}
            className="text-[9px] text-[#4B5320] font-bold uppercase tracking-tighter bg-[#4B5320]/10 px-2 py-1 rounded-md hover:bg-[#4B5320]/20 transition-colors flex items-center gap-1"
          >
            <svg className="w-2.5 h-2.5" fill="currentColor" viewBox="0 0 20 20"><path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z" /><path fillRule="evenodd" d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" clipRule="evenodd" /></svg>
            Sugerido: {suggestion} {suffix}
          </button>
        )}
        {rangeHint && (
          <span className="text-[9px] text-gray-400 font-bold uppercase tracking-tighter bg-gray-100 px-2 py-1 rounded-md">
            Rango: {rangeHint} {suffix}
          </span>
        )}
      </div>
    )}
    {isWarning && !alert && <p className="text-[10px] text-amber-600 font-bold">⚠ Valor fuera de rango técnico.</p>}
    {sub && <p className="text-[9px] text-gray-400 font-medium italic mt-1 pl-1">💡 {sub}</p>}
    {alert && <p className="text-[10px] text-red-500 font-bold">⚠ {alert}</p>}
  </div>
);

const ProducerProfileForm: React.FC<ProducerProfileFormProps> = ({ onBack, onPublish, currentUser }) => {
  const [category, setCategory] = useState<ProjectCategory | null>(null);
  const [step, setStep] = useState(0);
  const [isPreview, setIsPreview] = useState(false);
  const [isPublished, setIsPublished] = useState(false);
  const [activePreviewImage, setActivePreviewImage] = useState<string | null>(null);

  // --- COMMON INPUTS ---
  const [department, setDepartment] = useState('Florida');
  const [hectares, setHectares] = useState(100);
  const [duration, setDuration] = useState(12);
  const [description, setDescription] = useState('');
  
  // --- LIVESTOCK SPECIFIC ---
  const [subCategory, setSubCategory] = useState<LivestockSubType>('Novillos 1-2 años');
  const [customSubCategory, setCustomSubCategory] = useState('');
  const [headCount, setHeadCount] = useState(100);
  const [entryWeight, setEntryWeight] = useState(300);
  const [purchasePrice, setPurchasePrice] = useState(3.20);
  const [pastureType, setPastureType] = useState('Campo Natural');
  const [targetExitWeight, setTargetExitWeight] = useState(480);
  const [weaningRate, setWeaningRate] = useState(95);
  const [salePrice, setSalePrice] = useState(5.42);
  
  const isLivo = category === 'livestock';
  const isBreeding = isLivo && ['Piezas de Cría', 'Vientres Preñados', 'Vientres Entorados'].includes(subCategory);

  useEffect(() => {
    if (subCategory === 'Piezas de Cría') setDuration(5);
    else if (subCategory === 'Vientres Preñados') setDuration(11);
    else if (subCategory === 'Vientres Entorados') setDuration(16);
  }, [subCategory]);
  
  // --- AGRICULTURE SPECIFIC ---
  const [cropType, setCropType] = useState<CropType>('Soja');
  const [implCostHa, setImplCostHa] = useState(700);
  const [expectedYield, setExpectedYield] = useState(3000);
  const [salePriceUnit, setSalePriceUnit] = useState(400);

  // States for "Otros" Category (Direct Amounts)
  const [totalInvestment, setTotalInvestment] = useState(10000);
  const [totalRevenue, setTotalRevenue] = useState(15000);
  
  // Multimedia State
  const [gallery, setGallery] = useState<string[]>([]);
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  
  const fileInputRef = useRef<HTMLInputElement>(null);
  const videoInputRef = useRef<HTMLInputElement>(null);

  // 1. Calibración de valores por defecto al cambiar categoría o tipo
  useEffect(() => {
    if (category === 'livestock') {
      if (subCategory === 'Otros') return;
      const meta = LIVESTOCK_DB[subCategory];
      if (meta) {
        setEntryWeight(meta.refW);
        setPurchasePrice(meta.refPrice);
        if (meta.type === 'cria') {
          setTargetExitWeight(150);
          setSalePrice(MARKET_PROJECTIONS_2027['Ternero'] || 3.65);
          setWeaningRate(95);
        }
      }
    } else if (category === 'agriculture') {
      const meta = AGRO_DB[cropType];
      if (meta) {
        setImplCostHa(meta.costRange[0]);
        setExpectedYield(meta.yieldRange[0]);
        setSalePriceUnit(meta.priceRange[0]);
        setDuration(meta.group === 'Pequeños' ? 6 : 8);
      }
    }
  }, [category, subCategory, cropType]);

  // 2. Actualización de proyecciones técnicas (Solo Ganadería)
  useEffect(() => {
    if (category === 'livestock' && subCategory !== 'Otros') {
      const meta = LIVESTOCK_DB[subCategory];
      if (meta && meta.type !== 'cria') {
        const days = duration * 30;
        const gdp = PASTURE_GDP[pastureType] || 0.4;
        setTargetExitWeight(Math.round(meta.refW + (days * gdp * 0.95)));
        
        let projectionKey = 'Novillo gordo';
        if (meta?.type === 'ternero') {
          projectionKey = duration >= 9 ? 'Novillo gordo' : 'Ternero';
        } else if (meta?.type === 'vaca_invernada') {
          projectionKey = 'Vaca gorda';
        } else if (subCategory.toLowerCase().includes('vaca') || subCategory.toLowerCase().includes('vaquillona')) {
          projectionKey = 'Vaca gorda';
        }
        
        setSalePrice(MARKET_PROJECTIONS_2027[projectionKey] || 5.0);
      }
    }
  }, [category, subCategory, pastureType, duration]);

  const financialResults = useMemo(() => {
    const mockProject = {
      category,
      subCategory: subCategory === 'Otros' ? 'Otros' : (category === 'livestock' ? subCategory : cropType),
      livestockData: category === 'livestock' && subCategory !== 'Otros' ? {
        headCount,
        entryWeight,
        purchasePriceKg: purchasePrice,
        targetExitWeight,
        salePriceKg: salePrice,
        durationMonths: duration,
        weaningRate
      } : undefined,
      agricultureData: category === 'agriculture' ? {
        hectares,
        implCostHa,
        expectedYield,
        salePriceUnit
      } : undefined
    };

    if (category === 'livestock' && subCategory === 'Otros') {
      return { haciendaInvestment: totalInvestment, grossIncome: totalRevenue, status: 'green' as any };
    }

    const results = calculateProjectFinancials(mockProject);
    return {
      haciendaInvestment: results.initialInvestment,
      grossIncome: results.expectedExitValue,
      status: results.marketStatus,
      breedingBreakdown: (results as any).breedingBreakdown
    };
  }, [category, headCount, entryWeight, purchasePrice, targetExitWeight, salePrice, subCategory, totalInvestment, totalRevenue, cropType, hectares, implCostHa, expectedYield, salePriceUnit, duration, weaningRate]);

  const loadVal = useMemo(() => validateAnimalLoad(headCount, subCategory, hectares, pastureType), [headCount, subCategory, hectares, pastureType]);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && gallery.length < 6) {
      const remainingSlots = 6 - gallery.length;
      const filesToProcess = Array.from(files).slice(0, remainingSlots) as File[];
      filesToProcess.forEach(file => {
        const reader = new FileReader();
        reader.onloadend = () => setGallery(prev => [...prev, reader.result as string]);
        reader.readAsDataURL(file);
      });
    }
  };

  const handleVideoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setVideoUrl(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const handleNext = () => {
    if (isPreview) {
      publish();
    } else if (step === 5) {
      setIsPreview(true);
    } else {
      setStep(s => s + 1);
    }
  };

  const renderStep = () => {
    switch(step) {
      case 0: return (
        <div className="space-y-8">
          <h3 className="text-2xl font-bold text-gray-800 tracking-tight">1. Ubicación y Escala</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <InputField label="Hectáreas Productivas" value={hectares} onChange={setHectares} onEnter={handleNext} suffix="ha" />
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase text-gray-400 tracking-widest block">Departamento</label>
              <select value={department} onChange={e => setDepartment(e.target.value)} className="w-full bg-gray-50 rounded-2xl p-4 font-bold text-lg outline-none border-4 border-transparent focus:border-[#4B5320] appearance-none">
                {URUGUAY_DEPARTMENTS.map(dept => <option key={dept} value={dept}>{dept}</option>)}
              </select>
            </div>
          </div>
        </div>
      );
      case 1: return (
        <div className="space-y-8">
          <h3 className="text-2xl font-bold text-gray-800 tracking-tight">2. Planificación del Negocio</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="md:col-span-2">
               <label className="text-[10px] font-black uppercase text-gray-400 tracking-widest block mb-2">{category === 'livestock' ? 'Categoría Ganadera' : 'Tipo de Cultivo'}</label>
               <select 
                  value={category === 'livestock' ? subCategory : cropType} 
                  onChange={e => category === 'livestock' ? setSubCategory(e.target.value as LivestockSubType) : setCropType(e.target.value as CropType)} 
                  className="w-full bg-gray-50 rounded-2xl p-4 font-bold text-xl outline-none border-4 border-transparent focus:border-[#4B5320]"
                >
                 {category === 'livestock' 
                  ? Object.keys(LIVESTOCK_DB).map(k => <option key={k} value={k}>{k}</option>)
                  : Object.keys(AGRO_DB).map(k => <option key={k} value={k}>{k}</option>)
                 }
               </select>

               {category === 'livestock' && subCategory === 'Otros' && (
                 <div className="mt-4 animate-in slide-in-from-top-2 duration-300">
                    <label className="text-[10px] font-black uppercase text-gray-400 tracking-widest block mb-2">Especificar Variedad</label>
                    <input 
                      type="text" 
                      value={customSubCategory} 
                      onChange={e => setCustomSubCategory(e.target.value)} 
                      onKeyDown={e => e.key === 'Enter' && handleNext()}
                      className="w-full bg-white border-4 border-[#4B5320]/10 focus:border-[#4B5320] rounded-2xl p-4 font-bold outline-none placeholder:font-medium" 
                      placeholder="Ej: Cerdos, Gallinas, Apicultura..." 
                    />
                 </div>
               )}
            </div>
            {category === 'livestock' ? (
              <>
                {! (subCategory === 'Otros') && <InputField label="Cabezas" value={headCount} onChange={setHeadCount} onEnter={handleNext} suffix="cab" />}
                <div className={`space-y-2 ${subCategory === 'Otros' ? 'md:col-span-2' : ''}`}>
                  <label className="text-[10px] font-black uppercase text-gray-400 tracking-widest block">Base Forrajera</label>
                  <select value={pastureType} onChange={e => setPastureType(e.target.value)} className="w-full bg-gray-50 rounded-2xl p-4 font-bold text-lg outline-none border-4 border-transparent focus:border-[#4B5320]">
                    {Object.keys(PASTURE_GDP).map(p => <option key={p} value={p}>{p}</option>)}
                  </select>
                </div>
              </>
            ) : (
              <div className="md:col-span-2">
                <p className="text-[10px] font-black text-[#4B5320] uppercase tracking-widest bg-[#4B5320]/5 p-4 rounded-xl">
                  🎯 Grupo: {AGRO_DB[cropType]?.group} • Unidad de Comercialización: {AGRO_DB[cropType]?.unit}
                </p>
              </div>
            )}
          </div>
        </div>
      );
      case 2: 
        let purchaseRange = null;
        let weightRange = null;
        let isPurchaseWarning = false;
        let isWeightWarning = false;

        if (category === 'livestock' && subCategory !== 'Otros') {
          const meta = LIVESTOCK_DB[subCategory];
          const isBreeding = meta?.type === 'cria';
          purchaseRange = [meta.refPrice * 0.85, meta.refPrice * 1.15];
          isPurchaseWarning = purchasePrice < purchaseRange[0] || purchasePrice > purchaseRange[1];

          // Determinar rango de peso por nombre de categoría (solo si especifica kg)
          if (subCategory.toLowerCase().includes('kg')) {
            if (subCategory.includes('<')) {
              const limit = parseInt(subCategory.match(/\d+/)![0]);
              weightRange = [limit * 0.5, limit];
            } else if (subCategory.includes('>')) {
              const limit = parseInt(subCategory.match(/\d+/)![0]);
              weightRange = [limit, limit * 1.5];
            } else if (subCategory.includes('-')) {
              const matches = subCategory.match(/\d+/g);
              if (matches && matches.length >= 2) {
                weightRange = [parseInt(matches[0]), parseInt(matches[1])];
              }
            }
          }

          // Fallback al peso de referencia de la base de datos si no se detectó rango en el nombre
          if (!weightRange) {
            weightRange = [meta.refW * 0.75, meta.refW * 1.25];
          }
          isWeightWarning = entryWeight < weightRange[0] || entryWeight > weightRange[1];
        } else if (category === 'agriculture') {
          const meta = AGRO_DB[cropType];
          purchaseRange = meta.costRange;
          isPurchaseWarning = implCostHa < purchaseRange[0] || implCostHa > purchaseRange[1];
        }

        return (
        <div className="space-y-8">
          <h3 className="text-2xl font-bold text-gray-800 tracking-tight">3. Escenario de Inversión</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {category === 'livestock' ? (
               subCategory === 'Otros' ? (
                <InputField label="Monto de Inversión Inicial" value={totalInvestment} onChange={setTotalInvestment} onEnter={handleNext} suffix="USD" sub="Capital total requerido para la operación." />
              ) : (
                <>
                  <InputField 
                    label={isBreeding ? "Precio Entrada (USD/cabeza)" : "Precio Compra (USD/kg)"}
                    value={purchasePrice} 
                    onChange={setPurchasePrice} 
                    onEnter={handleNext}
                    suffix={LIVESTOCK_DB[subCategory]?.perHead ? "USD/cab" : "USD/kg"} 
                    sub={`Ref. mercado: $${LIVESTOCK_DB[subCategory]?.refPrice.toFixed(2)}`}
                    rangeHint={purchaseRange ? `${purchaseRange[0].toFixed(2)} - ${purchaseRange[1].toFixed(2)}` : null}
                    isWarning={isPurchaseWarning}
                  />
                  <InputField 
                    label="Peso Entrada" 
                    value={entryWeight} 
                    onChange={setEntryWeight} 
                    onEnter={handleNext}
                    suffix="kg" 
                    sub={LIVESTOCK_DB[subCategory]?.perHead ? "Peso promedio de la vaca" : `Ref. categoría: ${LIVESTOCK_DB[subCategory]?.refW}kg`}
                    rangeHint={weightRange ? `${weightRange[0]} - ${weightRange[1]}` : null}
                    isWarning={isWeightWarning}
                  />
                </>
              )
            ) : (
              <InputField 
                label="Costo Implantación" 
                value={implCostHa} 
                onChange={setImplCostHa} 
                onEnter={handleNext}
                suffix="USD/ha" 
                sub={`Rango histórico: $${AGRO_DB[cropType]?.costRange[0]} - $${AGRO_DB[cropType]?.costRange[1]}`}
                rangeHint={purchaseRange ? `${purchaseRange[0]} - ${purchaseRange[1]}` : null}
                isWarning={isPurchaseWarning}
              />
            )}
            <InputField label="Duración del Ciclo" value={duration} onChange={setDuration} onEnter={handleNext} suffix="meses" />
          </div>
        </div>
      );
      case 3: 
        const meta = category === 'livestock' && subCategory !== 'Otros' ? LIVESTOCK_DB[subCategory] : null;
        const days = duration * 30;
        const gdp = PASTURE_GDP[pastureType] || 0.4;
        const suggestedWeight = meta ? (isBreeding ? 150 : Math.round(entryWeight + (days * gdp * 0.95))) : null;
        
        let projectionKey = 'Novillo gordo';
        if (isBreeding) projectionKey = 'Ternero';
        else if (meta?.type === 'ternero') projectionKey = duration >= 9 ? 'Novillo gordo' : 'Ternero';
        else if (meta?.type === 'vaca_invernada') projectionKey = 'Vaca gorda';
        else if (subCategory.toLowerCase().includes('vaca') || subCategory.toLowerCase().includes('vaquillona')) projectionKey = 'Vaca gorda';
        const suggestedPrice = meta ? (MARKET_PROJECTIONS_2027[projectionKey] || 5.0) : null;

        let exitWeightRange = null;
        let exitPriceRange = null;
        let isExitWeightWarning = false;
        let isExitPriceWarning = false;

        if (category === 'livestock' && subCategory !== 'Otros') {
          exitWeightRange = [suggestedWeight! * 0.85, suggestedWeight! * 1.15];
          isExitWeightWarning = targetExitWeight < exitWeightRange[0] || targetExitWeight > exitWeightRange[1];
          
          exitPriceRange = [suggestedPrice! * 0.85, suggestedPrice! * 1.15];
          isExitPriceWarning = salePrice < exitPriceRange[0] || salePrice > exitPriceRange[1];
        } else if (category === 'agriculture') {
          const agroMeta = AGRO_DB[cropType];
          exitWeightRange = agroMeta.yieldRange;
          isExitWeightWarning = expectedYield < exitWeightRange[0] || expectedYield > exitWeightRange[1];
          
          exitPriceRange = agroMeta.priceRange;
          isExitPriceWarning = salePriceUnit < exitPriceRange[0] || salePriceUnit > exitPriceRange[1];
        }

        return (
        <div className="space-y-8">
          <h3 className="text-2xl font-bold text-gray-800 tracking-tight">4. Escenario de Salida</h3>
          {meta && (
            <div className="bg-[#4B5320]/5 p-4 rounded-2xl border border-[#4B5320]/10 animate-in fade-in slide-in-from-top-1 duration-500">
              <p className="text-[10px] font-black text-[#4B5320] uppercase tracking-widest mb-1">Análisis Técnico SocioRural</p>
              <p className="text-xs text-[#4B5320]/70 font-medium">
                {meta.type === 'ternero' && duration >= 9 
                  ? `Tras ${duration} meses, el ternero alcanza estado de Novillo Gordo para faena.` 
                  : meta.type === 'vaca_invernada' 
                  ? "La vaca de invernada se proyecta como Vaca Gorda tras el ciclo de engorde."
                  : `Crecimiento estimado de ${(gdp * 0.95).toFixed(3)} kg/día en ${pastureType}.`
                }
              </p>
            </div>
          )}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {category === 'livestock' ? (
              subCategory === 'Otros' ? (
                <InputField label="Recaudación Proyectada" value={totalRevenue} onChange={setTotalRevenue} onEnter={handleNext} suffix="USD" sub="Total estimado a cobrar al finalizar." />
              ) : (
                <>
                  <InputField 
                    label={isBreeding ? "Peso Salida Objetivo (Ternero)" : "Peso Salida Objetivo"} 
                    value={targetExitWeight} 
                    onChange={setTargetExitWeight} 
                    onEnter={handleNext}
                    suffix="kg" 
                    suggestion={suggestedWeight} 
                    rangeHint={exitWeightRange ? `${Math.round(exitWeightRange[0])} - ${Math.round(exitWeightRange[1])}` : null}
                    isWarning={isExitWeightWarning}
                  />
                  <InputField 
                    label={isBreeding ? "Precio Venta Ternero (USD/kg)" : "Precio Venta (USD/kg)"} 
                    value={salePrice} 
                    onChange={setSalePrice} 
                    onEnter={handleNext}
                    suffix="USD/kg" 
                    suggestion={suggestedPrice} 
                    rangeHint={exitPriceRange ? `${exitPriceRange[0].toFixed(2)} - ${exitPriceRange[1].toFixed(2)}` : null}
                    isWarning={isExitPriceWarning}
                  />
                  {isBreeding && (
                    <InputField 
                      label="Tasa de Destete Esperada" 
                      value={weaningRate} 
                      onChange={setWeaningRate} 
                      onEnter={handleNext}
                      suffix="%" 
                      suggestion={95} 
                      rangeHint="80 - 100"
                      isWarning={weaningRate < 80 || weaningRate > 100}
                    />
                  )}
                </>
              )
            ) : (
              <>
                <InputField 
                  label={AGRO_DB[cropType]?.unit === 'kg' ? "Rendimiento (Ton/Ha)" : "Rendimiento (Kg/Ha)"}
                  value={expectedYield} 
                  onChange={setExpectedYield} 
                  onEnter={handleNext}
                  suffix={AGRO_DB[cropType]?.yieldUnit} 
                  sub={`Rango sugerido: ${AGRO_DB[cropType]?.yieldRange[0]} a ${AGRO_DB[cropType]?.yieldRange[1]}`} 
                  rangeHint={exitWeightRange ? `${exitWeightRange[0]} - ${exitWeightRange[1]}` : null}
                  isWarning={isExitWeightWarning}
                />
                <InputField 
                  label={AGRO_DB[cropType]?.unit === 'kg' ? "Precio (USD/Kg)" : "Precio (USD/Ton)"}
                  value={salePriceUnit} 
                  onChange={setSalePriceUnit} 
                  onEnter={handleNext}
                  suffix={`USD/${AGRO_DB[cropType]?.unit}`} 
                  sub={`Referencia histórico: $${AGRO_DB[cropType]?.priceRange[0]} a $${AGRO_DB[cropType]?.priceRange[1]}`} 
                  rangeHint={exitPriceRange ? `${exitPriceRange[0].toFixed(2)} - ${exitPriceRange[1].toFixed(2)}` : null}
                  isWarning={isExitPriceWarning}
                />
              </>
            )}
          </div>
        </div>
      );
      case 4: return (
        <div className="space-y-8">
          <h3 className="text-2xl font-bold text-gray-800 tracking-tight">5. Información Adicional</h3>
          <textarea value={description} onChange={e => setDescription(e.target.value)} rows={8} className="w-full bg-gray-50 border-4 border-transparent focus:border-[#4B5320] rounded-[2rem] p-8 font-medium text-gray-700 outline-none transition-all shadow-inner leading-relaxed" placeholder="Describe los detalles técnicos de tu propuesta..." />
        </div>
      );
      case 5: return (
        <div className="space-y-8">
          <div className="flex justify-between items-center">
            <h3 className="text-2xl font-bold text-gray-800 tracking-tight">6. Multimedia</h3>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            {gallery.map((img, idx) => (
              <div key={idx} className="relative aspect-square rounded-2xl overflow-hidden group border border-gray-100 shadow-sm">
                <img src={img} className="w-full h-full object-cover" />
                <button 
                  onClick={() => {
                    setGallery(prev => prev.filter((_, i) => i !== idx));
                  }} 
                  className="absolute top-2 right-2 bg-red-500 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold shadow-lg hover:bg-red-600 transition-colors"
                >
                  ×
                </button>
              </div>
            ))}
            {gallery.length < 6 && (
              <button 
                onClick={() => fileInputRef.current?.click()} 
                className="aspect-square bg-gray-50 border-4 border-dashed border-gray-200 rounded-2xl flex flex-col items-center justify-center text-gray-400 hover:bg-gray-100 hover:border-[#4B5320] hover:text-[#4B5320] transition-all group"
              >
                <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center mb-3 shadow-sm group-hover:scale-110 transition-transform">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 4v16m8-8H4" /></svg>
                </div>
                <span className="text-[10px] font-black uppercase tracking-widest">Subir Foto</span>
              </button>
            )}
            <input type="file" ref={fileInputRef} hidden multiple accept="image/*" onChange={(e) => {
              handleImageUpload(e);
            }} />
          </div>
        </div>
      );
      default: return null;
    }
  };

  const renderPreview = () => {
    const isAgro = category === 'agriculture';
    
    const previewProject: Project = {
      id: 'preview',
      title: `${isLivo ? (subCategory === 'Otros' ? customSubCategory : subCategory) : cropType} en ${department}`,
      category: category!,
      subCategory: isLivo ? (subCategory === 'Otros' ? customSubCategory : subCategory) : cropType,
      amount: Math.round(financialResults.haciendaInvestment * 1.05),
      amountRaised: 0,
      minTicket: Math.round(financialResults.haciendaInvestment * 0.1),
      deadline: '2026-12-30',
      term: `${duration} meses`,
      department,
      zone: 'Matchmaking SocioRural 2026',
      guaranteeLabel: 'Contrato de Asociación',
      producer: currentUser,
      description,
      image: gallery[0] || (isLivo 
        ? 'https://i.ibb.co/7xBKQT3C/vaca.jpg' 
        : 'https://i.ibb.co/3Y0FRXyr/campo.jpg'),
      gallery,
      videoUrl: videoUrl || undefined,
      status: 'active',
      projections: { 
        irr: 0, 
        npv: 0, 
        grossMargin: Math.round(financialResults.grossIncome - financialResults.haciendaInvestment), 
        initialInvestment: Math.round(financialResults.haciendaInvestment), 
        expectedExitValue: Math.round(financialResults.grossIncome), 
        marketStatus: financialResults.status, 
        monthlyCashFlow: [],
        breedingBreakdown: (financialResults as any).breedingBreakdown
      },
      investors: [],
      livestockData: (isLivo && subCategory !== 'Otros') ? { entryWeight, purchasePriceKg: purchasePrice, healthCostHead: 0, targetExitWeight, salePriceKg: salePrice, headCount, hectares, pastureType, durationMonths: duration, weaningRate } : undefined,
      agricultureData: !isLivo ? { implCostHa, hectares, expectedYield, salePriceUnit, unit: AGRO_DB[cropType]?.unit } : undefined
    };

    return (
      <div className="space-y-8 animate-in fade-in duration-700">
        <div className="bg-[#f5f2ed] rounded-[3rem] border border-gray-100 shadow-sm overflow-hidden">
           <div className="p-8 md:p-12 bg-[#4B5320] text-white">
              <span className="px-3 py-1 bg-white/20 rounded-full text-[10px] font-bold uppercase tracking-widest">{isLivo ? 'Ficha Ganadera' : 'Ficha Agrícola'} 2026</span>
              <h2 className="text-3xl md:text-5xl font-bold tracking-tight mt-2">{previewProject.title}</h2>
           </div>
           <div className="p-8 md:p-12 space-y-12">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                 <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
                    <h5 className="text-[10px] font-black text-gray-400 uppercase mb-4 tracking-widest">1. Escenario de Inversión</h5>
                    <div className="space-y-4">
                       <div className="flex justify-between border-b border-gray-50 pb-2">
                          <span className="text-xs text-gray-500">Actividad</span>
                          <span className="text-xs font-bold">{previewProject.subCategory}</span>
                       </div>
                       {isLivo && subCategory !== 'Otros' ? (
                         <>
                           <div className="flex justify-between border-b border-gray-50 pb-2">
                              <span className="text-xs text-gray-500">Cantidad</span>
                              <span className="text-xs font-bold">{headCount} cabezas</span>
                           </div>
                           <div className="flex justify-between border-b border-gray-50 pb-2">
                              <span className="text-xs text-gray-500">Peso Entrada</span>
                              <span className="text-xs font-bold">{entryWeight} kg</span>
                           </div>
                           <div className="flex justify-between border-b border-gray-50 pb-2">
                              <span className="text-xs text-gray-500">Precio Entrada</span>
                              <span className="text-xs font-bold">{isBreeding ? `USD ${Math.round(purchasePrice)}/cab` : `USD ${purchasePrice.toFixed(2)}/kg`}</span>
                           </div>
                         </>
                       ) : isAgro ? (
                         <>
                           <div className="flex justify-between border-b border-gray-50 pb-2">
                              <span className="text-xs text-gray-500">Superficie</span>
                              <span className="text-xs font-bold">{hectares} ha</span>
                           </div>
                           <div className="flex justify-between border-b border-gray-50 pb-2">
                              <span className="text-xs text-gray-500">Costo Implantación</span>
                              <span className="text-xs font-bold">USD {implCostHa.toLocaleString()}/ha</span>
                           </div>
                         </>
                       ) : null}
                       <div className="pt-2">
                          <p className="text-[10px] font-black text-[#4B5320] uppercase mb-1">Inversión Inicial</p>
                          <p className="text-2xl font-black text-[#4B5320]">USD {Math.round(financialResults.haciendaInvestment).toLocaleString()}</p>
                       </div>
                    </div>
                 </div>

                 <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
                    <h5 className="text-[10px] font-black text-gray-400 uppercase mb-4 tracking-widest">2. Retorno Proyectado</h5>
                    <div className="space-y-4">
                       <div className="pt-2">
                          <p className="text-[10px] font-black text-[#8B4513] uppercase mb-1">Recaudación Bruta</p>
                          <p className="text-2xl font-black text-[#8B4513]">USD {Math.round(financialResults.grossIncome).toLocaleString()}</p>
                       </div>
                       {isBreeding && (
                         <div className="mt-4 pt-4 border-t border-gray-100 space-y-3">
                             <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">Desglose de Salida ({duration} meses)</p>
                             <div className="flex justify-between">
                                <span className="text-xs text-gray-600">Vacas de Invernada: {headCount} x {entryWeight} kg @ $2.40/kg</span>
                                <span className="text-xs font-bold">USD {Math.round(headCount * entryWeight * 2.40).toLocaleString()}</span>
                             </div>
                             <div className="flex justify-between">
                                <span className="text-xs text-gray-600">Terneros/as Destetados: {Math.round(headCount * (weaningRate / 100))} x {targetExitWeight} kg @ ${salePrice.toFixed(2)}/kg</span>
                                <span className="text-xs font-bold">USD {Math.round(headCount * (weaningRate / 100) * targetExitWeight * salePrice).toLocaleString()}</span>
                             </div>
                             <div className="flex justify-between border-t border-gray-200 pt-2 mt-2">
                                <span className="text-xs font-bold text-[#4B5320]">Ingreso Bruto Total</span>
                                <span className="text-xs font-bold text-[#4B5320]">USD {Math.round(headCount * entryWeight * 2.40 + headCount * (weaningRate / 100) * targetExitWeight * salePrice).toLocaleString()}</span>
                             </div>
                         </div>
                       )}
                    </div>
                 </div>
              </div>
              
              {description && (
                <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
                  <h5 className="text-[10px] font-black text-gray-400 uppercase mb-4 tracking-widest">Descripción Técnica</h5>
                  <p className="text-gray-600 italic leading-relaxed text-sm">"{description}"</p>
                </div>
              )}
           </div>
        </div>
      </div>
    );
  };

  if (isPublished) return (
    <div className="max-w-4xl mx-auto py-24 text-center">
      <h2 className="text-7xl font-black text-[#2d3312] mb-8">RONDA LISTADA</h2>
      <button onClick={onBack} className="bg-[#4B5320] text-white px-20 py-7 rounded-[2.5rem] font-black uppercase text-xs tracking-widest">Volver a mi perfil</button>
    </div>
  );

  if (!category) return (
    <div className="max-w-5xl mx-auto py-20 px-6">
      <h2 className="text-6xl font-black text-[#2d3312] mb-12 text-center uppercase tracking-tight">Nueva Ronda</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <button onClick={() => setCategory('livestock')} className="group bg-white p-12 rounded-[4rem] border-2 border-transparent hover:border-[#4B5320] shadow-xl transition-all">
          <div className="w-20 h-20 bg-[#4B5320]/10 rounded-3xl flex items-center justify-center text-[#4B5320] mx-auto mb-6">🐄</div>
          <h3 className="text-3xl font-black text-[#2d3312]">Ganadería</h3>
          <p className="text-gray-500 mt-4 text-sm font-medium">Invernada y cría de ganado bovino u ovino.</p>
        </button>
        <button onClick={() => setCategory('agriculture')} className="group bg-white p-12 rounded-[4rem] border-2 border-transparent hover:border-[#8B4513] shadow-xl transition-all">
          <div className="w-20 h-20 bg-[#8B4513]/10 rounded-3xl flex items-center justify-center text-[#8B4513] mx-auto mb-6">🚜</div>
          <h3 className="text-3xl font-black text-[#2d3312]">Agricultura</h3>
          <p className="text-gray-500 mt-4 text-sm font-medium">Cultivos hortícolas y extensivos tradicionales.</p>
        </button>
      </div>
    </div>
  );

  return (
    <div className="max-w-6xl mx-auto py-16 px-6">
      <div className="bg-white rounded-[5rem] shadow-2xl border border-gray-100 overflow-hidden">
        <div className="p-16 md:p-24">{isPreview ? renderPreview() : renderStep()}</div>
        <div className="p-12 bg-gray-50 flex justify-between">
          <button onClick={() => isPreview ? setIsPreview(false) : step === 0 ? setCategory(null) : setStep(s => s - 1)} className="px-12 py-6 font-black uppercase text-[11px] text-gray-400">Atrás</button>
          <button 
            onClick={handleNext} 
            className="bg-[#4B5320] text-white px-16 py-6 rounded-2xl font-black uppercase text-[11px]"
          >
            {isPreview ? 'PUBLICAR OFERTA' : step === 5 ? 'VISTA PREVIA' : 'CONTINUAR'}
          </button>
        </div>
      </div>
    </div>
  );

  function publish() {
    let results;
    if (isBreeding) {
      results = calculateBreedingBusiness({ 
        headCount, 
        entryWeight, 
        purchasePrice, 
        salePriceTernero: salePrice, 
        salePriceVaca: 2.40 
      });
    } else {
      results = calculateProjectFinancials({
        category,
        subCategory: isLivo ? (subCategory === 'Otros' ? customSubCategory : subCategory) : cropType,
        livestockData: (isLivo && subCategory !== 'Otros') ? { entryWeight, purchasePriceKg: purchasePrice, healthCostHead: 0, targetExitWeight, salePriceKg: salePrice, headCount, hectares, pastureType, durationMonths: duration, weaningRate } : undefined,
        agricultureData: !isLivo ? { implCostHa, hectares, expectedYield, salePriceUnit } : undefined
      });
    }

    const finalGallery = gallery.length > 0 ? gallery : [isLivo 
      ? 'https://i.ibb.co/7xBKQT3C/vaca.jpg' 
      : 'https://i.ibb.co/3Y0FRXyr/campo.jpg'
    ];

    const finalProject: Project = {
      id: Date.now().toString(),
      title: `${isLivo ? (subCategory === 'Otros' ? customSubCategory : subCategory) : cropType} en ${department}`,
      category: category!,
      subCategory: isLivo ? (subCategory === 'Otros' ? customSubCategory : subCategory) : cropType,
      amount: results.amount,
      amountRaised: 0,
      minTicket: Math.round(results.initialInvestment * 0.1),
      deadline: '2026-12-30',
      term: `${duration} meses`,
      department,
      zone: 'Matchmaking SocioRural 2026',
      guaranteeLabel: 'Contrato de Asociación',
      producer: currentUser,
      description,
      image: finalGallery[0],
      gallery: finalGallery,
      videoUrl: videoUrl || undefined,
      status: 'active',
      projections: { 
        irr: 0, 
        npv: 0, 
        grossMargin: results.grossMargin, 
        initialInvestment: results.initialInvestment, 
        expectedExitValue: results.expectedExitValue, 
        marketStatus: results.marketStatus, 
        monthlyCashFlow: [],
        breedingBreakdown: (results as any).breedingBreakdown
      },
      investors: [],
      livestockData: (isLivo && subCategory !== 'Otros') ? { entryWeight, purchasePriceKg: purchasePrice, healthCostHead: 0, targetExitWeight, salePriceKg: salePrice, headCount, hectares, pastureType, durationMonths: duration, weaningRate } : undefined,
      agricultureData: !isLivo ? { implCostHa, hectares, expectedYield, salePriceUnit, unit: AGRO_DB[cropType]?.unit } : undefined
    };
    onPublish(finalProject);
    setIsPublished(true);
  }
};

export default ProducerProfileForm;
