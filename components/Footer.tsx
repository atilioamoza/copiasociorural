
import React from 'react';
import { Home, Facebook, Twitter } from 'lucide-react';
import { AppView } from '../types';

interface FooterProps {
  setView: (view: AppView) => void;
  onOpenAbout: () => void;
  onOpenTerms: () => void;
}

const Footer: React.FC<FooterProps> = ({ setView, onOpenAbout, onOpenTerms }) => {
  const handleNavigate = (view: AppView) => {
    setView(view);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-gray-900 text-gray-400 pt-16 pb-8 px-4 md:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          {/* Columna 1: Marca */}
          <div className="space-y-6">
            <div 
              className="flex items-center gap-3 cursor-pointer group w-fit" 
              onClick={() => handleNavigate('home')}
            >
              <div className="w-10 h-10 bg-[#4B5320] rounded-xl flex items-center justify-center text-white font-black text-xl shadow-lg group-hover:rotate-6 transition-transform relative">
                SR
                <div className="absolute -top-1 -right-1 bg-[#8B4513] rounded-full p-1 shadow-sm">
                  <Home className="w-2 h-2" />
                </div>
              </div>
              <div>
                <span className="text-xl font-black text-white tracking-tighter uppercase leading-none block">SocioRural</span>
                <p className="text-[9px] text-[#8B4513] uppercase font-black tracking-[0.2em] leading-none mt-1">Inversión Directa</p>
              </div>
            </div>
            <p className="text-gray-400 text-sm max-w-xs leading-relaxed font-medium italic">
              "Donde el ahorro uruguayo financia la producción real."
            </p>
          </div>

          {/* Columna 2: Navegación */}
          <div className="space-y-6">
            <h4 className="text-[10px] font-black uppercase text-gray-600 tracking-[0.2em]">Navegación</h4>
            <div className="flex flex-col gap-4">
              <button 
                onClick={() => handleNavigate('how-it-works')}
                className="text-gray-300 hover:text-[#a3b18a] transition-colors text-left font-bold text-sm w-fit"
              >
                ¿Cómo funciona?
              </button>
              <button 
                onClick={() => handleNavigate('reference-values')}
                className="text-gray-300 hover:text-[#a3b18a] transition-colors text-left font-bold text-sm w-fit"
              >
                Valores de Referencia
              </button>
            </div>
          </div>

          {/* Columna 3: Acción */}
          <div className="space-y-6">
            <h4 className="text-[10px] font-black uppercase text-gray-600 tracking-[0.2em]">Institucional</h4>
            <div className="flex flex-col gap-4">
              <button 
                onClick={onOpenAbout}
                className="bg-white/5 hover:bg-[#4B5320] text-white px-6 py-3 rounded-xl transition-all font-black uppercase tracking-widest text-xs border border-white/10 hover:border-transparent shadow-lg hover:shadow-none transform hover:translate-y-0.5 w-fit"
              >
                Sobre el Proyecto
              </button>
              <button 
                onClick={onOpenTerms}
                className="bg-white/5 hover:bg-[#4B5320] text-white px-6 py-3 rounded-xl transition-all font-black uppercase tracking-widest text-xs border border-white/10 hover:border-transparent shadow-lg hover:shadow-none transform hover:translate-y-0.5 w-fit"
              >
                Términos y Condiciones
              </button>
              <button 
                onClick={() => handleNavigate('contact')}
                className="bg-white/5 hover:bg-[#4B5320] text-white px-6 py-3 rounded-xl transition-all font-black uppercase tracking-widest text-xs border border-white/10 hover:border-transparent shadow-lg hover:shadow-none transform hover:translate-y-0.5 w-fit"
              >
                Contacto
              </button>
              <div className="flex gap-4 pt-2">
                <a href="#" className="p-2 bg-white/5 rounded-lg hover:bg-[#4B5320] transition-all text-gray-500 hover:text-white">
                  <Facebook className="w-5 h-5" />
                </a>
                <a href="#" className="p-2 bg-white/5 rounded-lg hover:bg-[#4B5320] transition-all text-gray-500 hover:text-white">
                  <Twitter className="w-5 h-5" />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Separador Sutil */}
        <hr className="border-white/5 mb-8" />

        {/* Copyright */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] font-bold uppercase tracking-widest text-gray-600">
          <p>© {new Date().getFullYear()} SocioRural. Todos los derechos reservados.</p>
          <div className="flex gap-6">
            <button 
              onClick={onOpenTerms}
              className="hover:text-gray-400 transition-colors uppercase"
            >
              Términos y Condiciones
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
