import React, { useState } from 'react';
import { Project, Producer } from '../types';
import { jsPDF } from 'jspdf';
import { calculateAnimalLoad } from '../utils/financial';

interface MatchModalProps {
  project: Project | null;
  isLoggedIn: boolean;
  isOwnProject?: boolean;
  onClose: () => void;
  onContactProducer: (project: Project) => void;
  onViewProducerProfile: (producer: Producer, project: Project) => void;
  onLoginRequired: () => void;
}

const MatchModal: React.FC<MatchModalProps> = ({ project, isLoggedIn, isOwnProject = false, onClose, onContactProducer, onLoginRequired }) => {
  const [activeImage, setActiveImage] = useState<string | null>(null);

  if (!project) return null;

  const isLivo = project.category === 'livestock';
  const lData = project.livestockData;
  const aData = project.agricultureData;
  
  const haciendaInvestment = project.projections.initialInvestment;
  const projectedGrossIncome = project.projections.expectedExitValue;

  const exportPDF = async () => {
    if (!isLoggedIn) {
      onLoginRequired();
      return;
    }

    const doc = new jsPDF({ orientation: 'landscape', format: 'a4', unit: 'mm' });
    const p = project;
    const displayId = p.id;
    const margin = 20;
    const pageWidth = 297;
    const primaryColor = [75, 83, 32];
    
    // Fondo crema suave
    doc.setFillColor(247, 246, 242);
    doc.rect(0, 0, pageWidth, 45, 'F');
    
    let textStartX = margin;

    try {
      const img = new Image();
      img.crossOrigin = 'Anonymous';
      img.src = 'https://i.ibb.co/bgqgM6cN/logosociorural.png';
      await new Promise((resolve, reject) => {
        img.onload = resolve;
        img.onerror = reject;
      });
      const imgHeight = 35; // Altura máxima para el encabezado de 45mm
      const imgWidth = (img.width * imgHeight) / img.height;
      // Centrar verticalmente en la franja superior de 45mm
      const imgY = (45 - imgHeight) / 2;
      doc.addImage(img, 'PNG', margin, imgY, imgWidth, imgHeight);
      textStartX = margin + imgWidth + 10;
    } catch (e) {
      console.error('Error loading logo for PDF', e);
    }

    // Título principal
    doc.setTextColor(27, 67, 50); // #1B4332
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(18);
    doc.text(`SocioRural: Ficha Técnica ${p.category === 'livestock' ? 'Ganadera' : 'Agrícola'}`, textStartX, 18);
    
    // Datos secundarios
    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    doc.text(`ID: #${displayId}  |  PRODUCTOR: ${p.producer.name.toUpperCase()}  |  DEP: ${p.department}`, textStartX, 28);

    // Divisor dorado
    doc.setDrawColor(212, 175, 55); // #D4AF37
    doc.setLineWidth(0.5);
    doc.line(margin, 42, pageWidth - margin, 42);

    doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2]);
    doc.setFontSize(16);
    doc.setFont('helvetica', 'bold');
    let y = 60;
    doc.text(p.title.toUpperCase(), margin, y);

    // SECCIÓN 1: INVERSIÓN
    y += 10;
    doc.setFontSize(10);
    doc.setTextColor(150, 150, 150);
    doc.text('1. ESCENARIO DE INVERSIÓN (ENTRADA)', margin, y);
    doc.setDrawColor(220, 220, 210);
    doc.line(margin, y + 2, pageWidth - margin, y + 2);

    doc.setTextColor(60, 60, 60);
    doc.setFontSize(9);
    y += 10;
    
    if (isLivo) {
      doc.setFont('helvetica', 'bold');
      doc.text('CATEGORÍA:', margin, y);
      doc.text('CANTIDAD:', 80, y);
      doc.text('PESO ENTRADA:', 140, y);
      doc.text('PRECIO COMPRA:', 210, y);
      y += 6;
      doc.setFont('helvetica', 'normal');
      doc.text(`${p.subCategory}`, margin, y);
      doc.text(`${lData?.headCount || 0} cabezas`, 80, y);
      doc.text(`${lData?.entryWeight || 0} kg`, 140, y);
      doc.text(`USD ${lData?.purchasePriceKg.toFixed(2) || '0.00'}/kg`, 210, y);
    } else {
      doc.setFont('helvetica', 'bold');
      doc.text('CULTIVO:', margin, y);
      doc.text('SUPERFICIE:', 100, y);
      doc.text('COSTO IMPLANTACIÓN:', 190, y);
      y += 6;
      doc.setFont('helvetica', 'normal');
      doc.text(`${p.subCategory}`, margin, y);
      doc.text(`${aData?.hectares || 0} ha`, 100, y);
      doc.text(`USD ${aData?.implCostHa.toFixed(2) || '0.00'}/ha`, 190, y);
    }

    y += 10;
    doc.setFillColor(245, 245, 240);
    doc.rect(margin, y - 4, pageWidth - (margin * 2), 12, 'F');
    doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2]);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(12);
    doc.text(`INVERSIÓN TOTAL ESTIMADA: USD ${Math.round(haciendaInvestment).toLocaleString()}`, margin + 5, y + 4);

    // SECCIÓN 2: SALIDA
    y += 20;
    doc.setFontSize(10);
    doc.setTextColor(150, 150, 150);
    doc.text('2. ESCENARIO DE RETORNO (OBJETIVOS)', margin, y);
    doc.setDrawColor(220, 220, 210);
    doc.line(margin, y + 2, pageWidth - margin, y + 2);

    y += 10;
    doc.setTextColor(60, 60, 60);
    doc.setFontSize(9);
    doc.setFont('helvetica', 'bold');
    if (isLivo) {
      doc.text('PESO SALIDA:', margin, y);
      doc.text('PRECIO VENTA:', 100, y);
    } else {
      doc.text('RENDIMIENTO:', margin, y);
      doc.text('PRECIO VENTA:', 100, y);
    }
    doc.text('PLAZO:', 190, y);

    y += 6;
    doc.setFont('helvetica', 'normal');
    if (isLivo) {
      doc.text(`${lData?.targetExitWeight || 0} kg`, margin, y);
      doc.text(`USD ${lData?.salePriceKg.toFixed(2) || '0.00'}/kg`, 100, y);
    } else {
      doc.text(`${aData?.expectedYield} ${aData?.unit === 'kg' ? 'ton/ha' : 'kg/ha'}`, margin, y);
      doc.text(`USD ${aData?.salePriceUnit.toFixed(2) || '0.00'}/${aData?.unit}`, 100, y);
    }
    doc.text(`${p.term}`, 190, y);

    y += 10;
    doc.setFillColor(240, 245, 240);
    doc.rect(margin, y - 4, pageWidth - (margin * 2), 12, 'F');
    doc.setTextColor(139, 69, 19);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(12);
    doc.text(`RECAUDACIÓN BRUTA PROYECTADA: USD ${Math.round(projectedGrossIncome).toLocaleString()}`, margin + 5, y + 4);

    // SECCIÓN 3: DESGLOSE DE CRÍA (SI APLICA)
    if (p.projections.breedingBreakdown) {
        y += 20;
        doc.setFontSize(10);
        doc.setTextColor(150, 150, 150);
        doc.text('3. DESGLOSE DE CRÍA', margin, y);
        doc.setDrawColor(220, 220, 210);
        doc.line(margin, y + 2, pageWidth - margin, y + 2);
        
        y += 10;
        doc.setTextColor(60, 60, 60);
        doc.setFontSize(9);
        doc.setFont('helvetica', 'normal');
        if (lData?.weaningRate) {
          doc.text(`Tasa de Destete: ${lData.weaningRate}%`, margin, y);
          y += 6;
        }
        doc.text(`Venta de Terneros: USD ${p.projections.breedingBreakdown.stockTerneros?.toLocaleString() || 0}`, margin, y);
        y += 6;
        doc.text(`Valor Residual Vacas: USD ${p.projections.breedingBreakdown.stockVacas?.toLocaleString() || 0}`, margin, y);
    }

    doc.save(`Ficha_${p.category}_${p.id}.pdf`);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose}></div>
      {activeImage && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 bg-black/90" onClick={() => setActiveImage(null)}>
          <img src={activeImage} className="max-w-full max-h-full object-contain rounded-xl shadow-2xl" />
        </div>
      )}
      <div className="relative bg-[#f5f2ed] rounded-[3rem] w-full max-w-5xl max-h-[95vh] overflow-y-auto shadow-2xl animate-in zoom-in duration-300 border border-gray-100">
        <div className="p-8 md:p-12 text-white sticky top-0 z-10 shadow-lg bg-[#4B5320]">
          <button onClick={onClose} className="absolute top-4 left-4 flex items-center gap-2 text-white font-black text-[11px] uppercase tracking-widest">Cerrar</button>
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mt-8">
            <div>
              <span className="px-3 py-1 bg-white/20 rounded-full text-[10px] font-bold uppercase tracking-widest">{isLivo ? 'Ficha Ganadera' : 'Ficha Agrícola'} 2026</span>
              <h2 className="text-3xl md:text-5xl font-bold tracking-tight mt-2">{project.title}</h2>
            </div>
            <button onClick={exportPDF} className="bg-white text-[#4B5320] px-7 py-4 rounded-2xl font-black uppercase text-xs tracking-widest shadow-lg">Descargar Ficha PDF</button>
          </div>
        </div>
        <div className="p-8 md:p-12 space-y-12">
           <section className="bg-white p-10 rounded-[2.5rem] border border-gray-100 shadow-sm">
              <h3 className="text-xl font-black text-[#2d3312] mb-8 uppercase tracking-tighter">1. Escenario de Inversión (ID: #{project.id})</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8">
                <div className="md:col-span-1"><p className="text-[10px] font-black text-gray-400 uppercase mb-1">Actividad</p><p className="text-lg font-bold text-gray-800">{project.subCategory}</p></div>
                {isLivo ? (
                  <>
                    <div><p className="text-[10px] font-black text-gray-400 uppercase mb-1">Cantidad</p><p className="text-lg font-bold text-gray-800">{lData?.headCount} cabezas</p></div>
                    <div><p className="text-[10px] font-black text-gray-400 uppercase mb-1">Peso Entrada</p><p className="text-lg font-bold text-gray-800">{lData?.entryWeight} kg</p></div>
                    <div><p className="text-[10px] font-black text-gray-400 uppercase mb-1">Precio Compra</p><p className="text-lg font-bold text-gray-800">USD {lData?.purchasePriceKg.toFixed(2)}/kg</p></div>
                  </>
                ) : (
                  <>
                    <div><p className="text-[10px] font-black text-gray-400 uppercase mb-1">Superficie</p><p className="text-lg font-bold text-gray-800">{aData?.hectares} ha</p></div>
                    <div><p className="text-[10px] font-black text-gray-400 uppercase mb-1">Costo Implantación</p><p className="text-lg font-bold text-gray-800">USD {aData?.implCostHa.toFixed(2)}/ha</p></div>
                    <div className="hidden md:block"></div>
                  </>
                )}
                <div className="p-4 bg-[#4B5320]/5 rounded-2xl border border-[#4B5320]/10 col-span-2 md:col-span-1 lg:col-span-1">
                  <p className="text-[10px] font-black text-[#4B5320] uppercase mb-1">Capital Inicial</p>
                  <p className="text-2xl font-black text-[#4B5320]">USD {Math.round(haciendaInvestment).toLocaleString()}</p>
                </div>
              </div>
           </section>
           <section className="bg-white p-10 rounded-[2.5rem] border border-gray-100 shadow-sm">
              <h3 className="text-xl font-black text-[#2d3312] mb-8 uppercase tracking-tighter">2. Retorno Proyectado</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                {isLivo ? (
                  <>
                    <div><p className="text-[10px] font-black text-gray-400 uppercase mb-1">Peso Objetivo</p><p className="text-base font-bold text-gray-800">{lData?.targetExitWeight} kg</p></div>
                    <div><p className="text-[10px] font-black text-gray-400 uppercase mb-1">Precio Venta</p><p className="text-base font-bold text-gray-800">USD {lData?.salePriceKg.toFixed(2)}/kg</p></div>
                  </>
                ) : (
                  <>
                    <div><p className="text-[10px] font-black text-gray-400 uppercase mb-1">Rendimiento</p><p className="text-base font-bold text-gray-800">{aData?.expectedYield} {aData?.unit === 'kg' ? 'ton/ha' : 'kg/ha'}</p></div>
                    <div><p className="text-[10px] font-black text-gray-400 uppercase mb-1">Precio Venta</p><p className="text-base font-bold text-gray-800">USD {aData?.salePriceUnit.toFixed(2)}/{aData?.unit}</p></div>
                  </>
                )}
                <div><p className="text-[10px] font-black text-gray-400 uppercase mb-1">Plazo</p><p className="text-base font-bold text-gray-800">{project.term}</p></div>
                <div className="p-4 bg-[#8B4513]/5 rounded-2xl border border-[#8B4513]/10">
                  <p className="text-[10px] font-black text-[#8B4513] uppercase mb-1">Recaudación Bruta</p>
                  <p className="text-lg font-black text-[#8B4513]">USD {Math.round(projectedGrossIncome).toLocaleString()}</p>
                </div>
              </div>
              {project.projections.breedingBreakdown && (
                <div className="mt-8 p-6 bg-gray-50 rounded-3xl space-y-4">
                  <h4 className="text-xs font-black text-gray-400 uppercase tracking-widest">Desglose de Salida</h4>
                  <div className="flex justify-between border-b border-gray-200 pb-2">
                    <span className="text-sm text-gray-600">Venta de Terneros</span>
                    <span className="text-sm font-bold text-gray-900">USD {project.projections.breedingBreakdown.stockTerneros?.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between border-b border-gray-200 pb-2">
                    <span className="text-sm text-gray-600">Valor Residual Vacas</span>
                    <span className="text-sm font-bold text-gray-900">USD {project.projections.breedingBreakdown.stockVacas?.toLocaleString()}</span>
                  </div>
                </div>
              )}
           </section>
           {!isOwnProject && (
             <button onClick={() => isLoggedIn ? onContactProducer(project) : onLoginRequired()} className="w-full bg-[#4B5320] text-white py-6 rounded-3xl font-black text-xl shadow-xl uppercase tracking-widest">CONTACTAR AL PRODUCTOR</button>
           )}
           <div className="bg-amber-50 p-6 rounded-2xl border border-amber-100 text-center italic text-xs text-amber-900 leading-relaxed font-medium">
             "Datos basados en promedios históricos de Uruguay (Zafra 2020-2025). Sujeto a condiciones climáticas y mercado local."
           </div>
        </div>
      </div>
    </div>
  );
};

export default MatchModal;
