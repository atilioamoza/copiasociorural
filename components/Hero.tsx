
import React from 'react';

interface HeroProps {
  onStartInvest: () => void;
  onShowHowItWorks: () => void;
}

const Hero: React.FC<HeroProps> = ({ onStartInvest, onShowHowItWorks }) => {
  return (
    <div className="relative overflow-hidden pt-16 pb-20 lg:pt-24 lg:pb-32">
      <div className="max-w-7xl mx-auto px-4 md:px-8 flex flex-col items-center text-center">
        <span className="inline-block px-4 py-1.5 rounded-full bg-[#4B5320]/10 text-[#4B5320] font-bold text-xs uppercase tracking-widest mb-6">
          Trato Directo • Sin Intermediarios
        </span>
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-[#2d3312] mb-6 leading-tight">
          SocioRural: Tu inversión <br/>
          <span className="text-[#4B5320] italic">directo a la portera</span>
        </h1>
        <p className="text-lg md:text-xl text-gray-600 max-w-2xl mb-10 font-light">
          Conectamos a pequeños productores rurales con inversores que buscan seguridad, 
          transparencia y rentabilidad real. Inversión con rostro humano.
        </p>
        
        {/* Botones Principales */}
        <div className="flex flex-col sm:flex-row gap-4 mb-16">
          <button 
            onClick={onStartInvest}
            className="bg-[#4B5320] text-white px-10 py-5 rounded-2xl text-lg font-black uppercase tracking-widest hover:bg-[#3a4119] transform hover:-translate-y-1 transition-all shadow-2xl"
          >
            Ver Cartelera Rural
          </button>
          <button 
            onClick={onShowHowItWorks}
            className="bg-white border-2 border-[#4B5320]/20 text-[#4B5320] px-10 py-5 rounded-2xl text-lg font-black uppercase tracking-widest hover:bg-gray-50 transition-all shadow-sm"
          >
            Cómo Funciona
          </button>
        </div>
        
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-16">
          <div className="flex flex-col items-center">
            <span className="text-2xl font-bold text-[#4B5320]">Uruguay</span>
            <span className="text-sm text-gray-500 font-medium">Foco 100% Local</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-2xl font-bold text-[#4B5320]">100%</span>
            <span className="text-sm text-gray-500 font-medium">Transparente</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-2xl font-bold text-[#4B5320]">Directo</span>
            <span className="text-sm text-gray-500 font-medium">Productor e Inversor</span>
          </div>
        </div>
      </div>
      
      {/* Decorative background elements */}
      <div className="absolute top-0 right-0 -z-10 w-96 h-96 bg-[#4B5320]/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 -z-10 w-64 h-64 bg-[#8B4513]/5 rounded-full blur-3xl"></div>
    </div>
  );
};

export default Hero;
