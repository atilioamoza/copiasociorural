
import React from 'react';
import { X, ShieldCheck } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface TermsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const TermsModal: React.FC<TermsModalProps> = ({ isOpen, onClose }) => {
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
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative w-full max-w-2xl bg-white rounded-[2.5rem] shadow-2xl overflow-hidden"
          >
            {/* Header */}
            <div className="bg-[#4B5320] p-8 text-white relative">
              <button 
                onClick={onClose}
                className="absolute top-6 right-6 p-2 hover:bg-white/10 rounded-full transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center">
                  <ShieldCheck className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h2 className="text-2xl font-black tracking-tight uppercase">Términos y Condiciones</h2>
                  <p className="text-white/60 text-[10px] font-black uppercase tracking-widest">SocioRural - Marco Legal</p>
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="p-10 max-h-[70vh] overflow-y-auto custom-scrollbar">
              <div className="space-y-8">
                <p className="text-gray-500 font-medium leading-relaxed">
                  Al utilizar esta plataforma, usted acepta las siguientes condiciones de uso:
                </p>

                <div className="space-y-6">
                  <section className="space-y-2">
                    <h3 className="text-[#4B5320] font-black text-xs uppercase tracking-widest flex items-center gap-2">
                      <span className="w-6 h-6 bg-[#4B5320]/10 rounded-lg flex items-center justify-center text-[10px]">01</span>
                      Naturaleza de la Plataforma
                    </h3>
                    <p className="text-gray-600 text-sm leading-relaxed pl-8">
                      SocioRural es una infraestructura tecnológica de conexión y análisis técnico. No somos una institución financiera, no captamos ahorro público ni administramos fondos de terceros. Somos un puente digital entre la ciudad y el campo.
                    </p>
                  </section>

                  <section className="space-y-2">
                    <h3 className="text-[#4B5320] font-black text-xs uppercase tracking-widest flex items-center gap-2">
                      <span className="w-6 h-6 bg-[#4B5320]/10 rounded-lg flex items-center justify-center text-[10px]">02</span>
                      Independencia en los Acuerdos
                    </h3>
                    <p className="text-gray-600 text-sm leading-relaxed pl-8">
                      Todos los negocios, contratos y pagos se pactan de forma directa y voluntaria entre el Inversor y el Productor. SocioRural no interviene, no cobra comisiones por transacción ni garantiza el resultado de los acuerdos privados.
                    </p>
                  </section>

                  <section className="space-y-2">
                    <h3 className="text-[#4B5320] font-black text-xs uppercase tracking-widest flex items-center gap-2">
                      <span className="w-6 h-6 bg-[#4B5320]/10 rounded-lg flex items-center justify-center text-[10px]">03</span>
                      Herramienta de Razonabilidad
                    </h3>
                    <p className="text-gray-600 text-sm leading-relaxed pl-8">
                      La plataforma incluye una matriz técnica para verificar la coherencia de los proyectos cargados. Sin embargo, esta información es referencial. Es responsabilidad exclusiva del usuario realizar su propia evaluación antes de concretar cualquier movimiento de capital.
                    </p>
                  </section>

                  <section className="space-y-2">
                    <h3 className="text-[#4B5320] font-black text-xs uppercase tracking-widest flex items-center gap-2">
                      <span className="w-6 h-6 bg-[#4B5320]/10 rounded-lg flex items-center justify-center text-[10px]">04</span>
                      Exclusión de Responsabilidad
                    </h3>
                    <p className="text-gray-600 text-sm leading-relaxed pl-8">
                      SocioRural no se hace responsable por incumplimientos, fraudes o pérdidas derivadas de los acuerdos entre usuarios. Al ser una herramienta de contacto directo, el riesgo y la decisión recaen íntegramente en las partes involucradas.
                    </p>
                  </section>

                  <section className="space-y-2">
                    <h3 className="text-[#4B5320] font-black text-xs uppercase tracking-widest flex items-center gap-2">
                      <span className="w-6 h-6 bg-[#4B5320]/10 rounded-lg flex items-center justify-center text-[10px]">05</span>
                      Propiedad y Transferencia
                    </h3>
                    <p className="text-gray-600 text-sm leading-relaxed pl-8">
                      SocioRural es un activo tecnológico independiente. Nos reservamos el derecho de transferir, vender o ceder la plataforma y su base de datos a futuros inversores o empresas interesadas en dar continuidad y escala a esta herramienta de conexión agropecuaria.
                    </p>
                  </section>
                </div>
              </div>

              {/* Footer Action */}
              <div className="mt-12 pt-8 border-t border-gray-100">
                <button 
                  onClick={onClose}
                  className="w-full bg-[#4B5320] text-white py-5 rounded-2xl font-black uppercase text-xs tracking-widest shadow-xl hover:bg-[#3a4119] transition-all transform active:scale-95"
                >
                  Cerrar
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default TermsModal;
