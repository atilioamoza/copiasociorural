
import React from 'react';
import { ArrowLeft, Table, Info } from 'lucide-react';
import { LIVESTOCK_DB, AGRO_DB } from '../utils/financial';

interface ReferenceValuesProps {
  onBack: () => void;
}

const ReferenceValues: React.FC<ReferenceValuesProps> = ({ onBack }) => {
  return (
    <div className="max-w-7xl mx-auto px-4 md:px-8 py-12">
      <button 
        onClick={onBack}
        className="flex items-center gap-2 text-[#4B5320] font-black uppercase tracking-widest text-xs mb-8 hover:translate-x-[-4px] transition-transform"
      >
        <ArrowLeft className="w-4 h-4" />
        Volver
      </button>

      <div className="mb-12">
        <div className="flex items-center gap-4 mb-4">
          <div className="w-12 h-12 bg-[#4B5320]/10 rounded-2xl flex items-center justify-center text-[#4B5320]">
            <Table className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-3xl md:text-5xl font-black text-[#2d3312] tracking-tight uppercase">Valores de Referencia</h1>
            <p className="text-gray-500 font-medium">Parámetros técnicos y precios base para el análisis de razonabilidad.</p>
          </div>
        </div>
      </div>

      <div className="space-y-16">
        {/* Ganadería */}
        <section>
          <h2 className="text-xl font-black text-[#4B5320] uppercase tracking-widest mb-6 flex items-center gap-3">
            <span className="w-8 h-8 bg-[#4B5320] text-white rounded-lg flex items-center justify-center text-xs">01</span>
            Sector Ganadero
          </h2>
          <div className="bg-white rounded-[2.5rem] border border-gray-100 shadow-xl overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-[#4B5320] text-white">
                    <th className="p-6 text-[10px] font-black uppercase tracking-widest">Categoría</th>
                    <th className="p-6 text-[10px] font-black uppercase tracking-widest text-center">Precio Ref. (USD)</th>
                    <th className="p-6 text-[10px] font-black uppercase tracking-widest text-center">Peso Ref. (kg)</th>
                    <th className="p-6 text-[10px] font-black uppercase tracking-widest text-center">Potencial Biológico</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {Object.entries(LIVESTOCK_DB).filter(([key]) => key !== 'Otros').map(([name, data]: [string, any]) => (
                    <tr key={name} className="hover:bg-gray-50 transition-colors">
                      <td className="p-6">
                        <span className="font-bold text-[#2d3312] text-sm">{name}</span>
                      </td>
                      <td className="p-6 text-center">
                        <span className="font-mono text-sm text-gray-600">
                          {data.perHead ? `$${data.refPrice}/cab` : `$${data.refPrice}/kg`}
                        </span>
                      </td>
                      <td className="p-6 text-center">
                        <span className="font-mono text-sm text-gray-600">{data.refW} kg</span>
                      </td>
                      <td className="p-6 text-center">
                        <span className="text-xs font-bold text-[#8B4513] bg-[#8B4513]/5 px-3 py-1 rounded-full uppercase tracking-tighter">
                          Máx {data.bioMax}kg
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* Agricultura */}
        <section>
          <h2 className="text-xl font-black text-[#4B5320] uppercase tracking-widest mb-6 flex items-center gap-3">
            <span className="w-8 h-8 bg-[#4B5320] text-white rounded-lg flex items-center justify-center text-xs">02</span>
            Sector Agrícola y Hortícola
          </h2>
          <div className="bg-white rounded-[2.5rem] border border-gray-100 shadow-xl overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-[#4B5320] text-white">
                    <th className="p-6 text-[10px] font-black uppercase tracking-widest">Cultivo</th>
                    <th className="p-6 text-[10px] font-black uppercase tracking-widest text-center">Rango Precio (USD)</th>
                    <th className="p-6 text-[10px] font-black uppercase tracking-widest text-center">Rinde Esperado</th>
                    <th className="p-6 text-[10px] font-black uppercase tracking-widest text-center">Costo Impl. (USD)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {Object.entries(AGRO_DB).map(([name, data]: [string, any]) => (
                    <tr key={name} className="hover:bg-gray-50 transition-colors">
                      <td className="p-6">
                        <div className="flex flex-col">
                          <span className="font-bold text-[#2d3312] text-sm">{name}</span>
                          <span className="text-[10px] text-gray-400 uppercase font-black tracking-widest">{data.group}</span>
                        </div>
                      </td>
                      <td className="p-6 text-center">
                        <span className="font-mono text-sm text-gray-600">
                          ${data.priceRange[0]} - ${data.priceRange[1]} / {data.unit}
                        </span>
                      </td>
                      <td className="p-6 text-center">
                        <span className="font-mono text-sm text-gray-600">
                          {data.yieldRange[0]} - {data.yieldRange[1]} {data.yieldUnit}
                        </span>
                      </td>
                      <td className="p-6 text-center">
                        <span className="font-mono text-sm text-gray-600">
                          ${data.costRange[0]} - ${data.costRange[1]} / ha
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* Nota Legal */}
        <div className="bg-[#f5f2ed] border border-[#4B5320]/10 p-8 rounded-3xl flex gap-4 items-start">
          <Info className="w-6 h-6 text-[#4B5320] shrink-0 mt-1" />
          <p className="text-gray-500 text-sm leading-relaxed italic">
            "Información técnica de elaboración propia basada en el análisis de reportes públicos y mercados locales. Estos valores son estrictamente referenciales para el cálculo de razonabilidad en SocioRural."
          </p>
        </div>
      </div>
    </div>
  );
};

export default ReferenceValues;
