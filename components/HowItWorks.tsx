
import React from 'react';

interface HowItWorksProps {
  onBack: () => void;
}

const HowItWorks: React.FC<HowItWorksProps> = ({ onBack }) => {
  const steps = [
    {
      title: "Explora Proyectos",
      description: "Navega por las propuestas de negocios y proyectos agrícolas de productores uruguayos. Revisa sus antecedentes, historial de trabajo y plazos de cada ciclo.",
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      )
    },
    {
      title: "Contacta al Productor",
      description: "Obtén el teléfono directo del productor para consultar detalles específicos del establecimiento, las garantías ofrecidas y el historial productivo.",
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
        </svg>
      )
    },
    {
      title: "Acuerda el Trato",
      description: "Una vez conformes, acuerden los términos finales para firmar contratos y realizar la transferencia de capital de forma directa y fuera de la plataforma.",
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      )
    }
  ];

  return (
    <div className="max-w-4xl mx-auto py-12 px-4 md:px-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <button 
        onClick={onBack}
        className="mb-8 flex items-center gap-2 text-[#4B5320] font-bold hover:text-[#8B4513] transition-colors group bg-white px-4 py-2 rounded-full shadow-sm border border-gray-100"
      >
        <svg className="w-5 h-5 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
        </svg>
        Volver atrás
      </button>

      <div className="bg-white rounded-[3rem] shadow-2xl overflow-hidden border border-gray-100">
        <div className="bg-[#4B5320] p-12 text-white">
          <h2 className="text-4xl font-bold mb-4">¿Cómo funciona SocioRural?</h2>
          <p className="text-white/70 text-lg leading-relaxed font-light">
            Nuestra misión es facilitar el contacto directo entre pequeños productores e inversores urbanos. 
            Somos una herramienta de canalización del ahorro que brinda transparencia y acceso a la rentabilidad de la tierra uruguaya.
          </p>
        </div>

        <div className="p-12 space-y-16">
          {/* El Proceso */}
          <section className="space-y-10">
            <h3 className="text-[11px] font-black uppercase text-gray-400 tracking-[0.3em] flex items-center gap-3">
              <div className="w-8 h-px bg-gray-200"></div>
              El Proceso Paso a Paso
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {steps.map((step, i) => (
                <div key={i} className="space-y-6">
                  <div className="w-16 h-16 bg-[#4B5320]/5 rounded-2xl flex items-center justify-center text-[#4B5320]">
                    {step.icon}
                  </div>
                  <div>
                    <h4 className="text-xl font-bold text-[#2d3312] mb-3">{step.title}</h4>
                    <p className="text-gray-500 text-sm leading-relaxed">{step.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Advertencia Legal / Funcionamiento */}
          <section className="bg-amber-50/50 rounded-[2.5rem] border border-amber-100 p-10 space-y-8">
            <h3 className="text-[11px] font-black uppercase text-amber-700/50 tracking-[0.3em] flex items-center gap-3">
              <div className="w-8 h-px bg-amber-200"></div>
              Aclaraciones Importantes
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              <div className="space-y-4">
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-amber-200 flex items-center justify-center text-amber-800 text-[10px] font-black">1</div>
                  <p className="text-sm text-amber-900/80 leading-relaxed italic">
                    <strong>SocioRural NO maneja fondos:</strong> La plataforma funciona exclusivamente como un canal de contacto y análisis. Todas las transacciones financieras ocurren de forma externa y directa entre las partes.
                  </p>
                </div>
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-amber-200 flex items-center justify-center text-amber-800 text-[10px] font-black">2</div>
                  <p className="text-sm text-amber-900/80 leading-relaxed italic">
                    <strong>Sin responsabilidad de rentabilidad:</strong> No asumimos responsabilidad por los resultados productivos o financieros de los proyectos. La inversión rural conlleva riesgos climáticos y de mercado que el inversor debe evaluar.
                  </p>
                </div>
              </div>
              <div className="space-y-4">
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-amber-200 flex items-center justify-center text-amber-800 text-[10px] font-black">3</div>
                  <p className="text-sm text-amber-900/80 leading-relaxed italic">
                    <strong>Trato Directo:</strong> Fomentamos la comunicación personal. Al contactar, obtienes el teléfono directo para coordinar visitas al establecimiento o llamadas para mayor seguridad.
                  </p>
                </div>
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-amber-200 flex items-center justify-center text-amber-800 text-[10px] font-black">4</div>
                  <p className="text-sm text-amber-900/80 leading-relaxed italic">
                    <strong>Matchmaking Puro:</strong> Somos un mercado de conexiones. Nuestra labor termina cuando las partes deciden formalizar su asociación comercial fuera de la plataforma.
                  </p>
                </div>
              </div>
            </div>
          </section>

          <div className="pt-4 flex justify-center">
            <button 
              onClick={onBack}
              className="px-10 py-4 bg-[#4B5320] text-white rounded-2xl font-black uppercase text-xs tracking-widest shadow-xl hover:bg-[#3a4119] transition-all transform hover:-translate-y-1 active:scale-95"
            >
              ¡Entendido, quiero empezar!
            </button>
          </div>
        </div>
      </div>
      
      <div className="mt-12 text-center text-gray-400 text-[10px] font-black uppercase tracking-[0.2em] max-w-lg mx-auto leading-relaxed">
        Al utilizar SocioRural, aceptas que eres responsable de realizar tu propia auditoría de riesgos antes de transferir capital a cualquier tercero.
      </div>
    </div>
  );
};

export default HowItWorks;
