
import React from 'react';
import { X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface AboutProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const AboutProjectModal: React.FC<AboutProjectModalProps> = ({ isOpen, onClose }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          />
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl overflow-hidden max-h-[90vh] flex flex-col"
          >
            {/* Header */}
            <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
              <h2 className="text-2xl font-black text-[#4B5320] uppercase tracking-tight">Sobre el Proyecto</h2>
              <button 
                onClick={onClose}
                className="p-2 hover:bg-gray-200 rounded-full transition-colors text-gray-400 hover:text-gray-600"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Content */}
            <div className="p-8 overflow-y-auto custom-scrollbar space-y-8">
              <section className="space-y-3">
                <h3 className="text-lg font-black text-[#4B5320] uppercase tracking-widest flex items-center gap-2">
                  <div className="w-2 h-6 bg-[#8B4513] rounded-full" />
                  Misión
                </h3>
                <p className="text-gray-600 leading-relaxed font-medium">
                  Nuestra misión es devolverle el protagonismo al trato directo. Queremos que el ahorro de los uruguayos financie la producción real y no estructuras financieras oscuras. Facilitamos que quien tiene el capital se encuentre cara a cara con el productor, eliminando intermediarios que solo agregan riesgo y opacidad al esfuerzo del trabajo en el campo.
                </p>
              </section>

              <section className="space-y-3">
                <h3 className="text-lg font-black text-[#4B5320] uppercase tracking-widest flex items-center gap-2">
                  <div className="w-2 h-6 bg-[#4B5320] rounded-full" />
                  Visión
                </h3>
                <p className="text-gray-600 leading-relaxed font-medium">
                  Buscamos un interior fuerte, donde el desarrollo sea fruto de acuerdos voluntarios y transparentes. Nuestra visión es que la inversión se traduzca en vacas y cultivos que el inversor pueda ver, no en papeles o promesas de rentabilidad mágica. Apostamos al arraigo y al trabajo genuino como única forma de evitar el desarraigo hacia los márgenes de la capital.
                </p>
              </section>

              <section className="space-y-4">
                <h3 className="text-lg font-black text-[#4B5320] uppercase tracking-widest flex items-center gap-2">
                  <div className="w-2 h-6 bg-[#8B4513] rounded-full" />
                  Valores
                </h3>
                <div className="space-y-6">
                  <div className="bg-gray-50 p-5 rounded-2xl border-l-4 border-[#4B5320]">
                    <h4 className="font-black text-[#4B5320] uppercase text-xs tracking-widest mb-2">Inversión Real</h4>
                    <p className="text-sm text-gray-600 leading-relaxed">
                      Aquí no hay "misterios" ni fondos comunes; el inversor contacta directo al productor. Si hay negocio, es porque hay producción detrás.
                    </p>
                  </div>
                  
                  <div className="bg-gray-50 p-5 rounded-2xl border-l-4 border-[#8B4513]">
                    <h4 className="font-black text-[#8B4513] uppercase text-xs tracking-widest mb-2">Libertad y Propiedad</h4>
                    <p className="text-sm text-gray-600 leading-relaxed">
                      Creemos en la soberanía de las partes para acordar sus términos. La plataforma es un puente técnico, no un administrador de tu dinero.
                    </p>
                  </div>

                  <div className="bg-gray-50 p-5 rounded-2xl border-l-4 border-[#4B5320]">
                    <h4 className="font-black text-[#4B5320] uppercase text-xs tracking-widest mb-2">Transparencia de Hecho</h4>
                    <p className="text-sm text-gray-600 leading-relaxed">
                      La mejor garantía es el contacto directo. Rechazamos los esquemas que ocultan la realidad productiva bajo promesas financieras que después nadie puede explicar.
                    </p>
                  </div>
                </div>
              </section>
            </div>

            {/* Footer */}
            <div className="p-6 bg-gray-50 border-t border-gray-100 flex justify-end">
              <button 
                onClick={onClose}
                className="bg-[#4B5320] text-white px-8 py-3 rounded-xl font-black uppercase tracking-widest text-xs hover:bg-[#3a4119] transition-all shadow-lg hover:shadow-none transform hover:translate-y-0.5"
              >
                Entendido
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default AboutProjectModal;
