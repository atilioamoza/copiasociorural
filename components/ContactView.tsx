
import React, { useState } from 'react';
import { Project } from '../types';

interface ContactViewProps {
  project: Project;
  onBack: () => void;
}

const ContactView: React.FC<ContactViewProps> = ({ project, onBack }) => {
  const [accepted, setAccepted] = useState(false);
  const producer = project.producer;

  const handleWhatsApp = () => {
    const message = encodeURIComponent(`Hola ${producer.name}, vi tu proyecto "${project.title}" en SocioRural y me gustaría obtener más información.`);
    window.open(`https://wa.me/${producer.phone.replace(/\s+/g, '')}?text=${message}`, '_blank');
  };

  const handleCall = () => {
    window.location.href = `tel:${producer.phone}`;
  };

  const handleEmail = () => {
    window.location.href = `mailto:${producer.email}?subject=Consulta SocioRural: ${project.title}`;
  };

  return (
    <div className="max-w-2xl mx-auto bg-white rounded-[3rem] shadow-2xl overflow-hidden border border-gray-100 animate-in fade-in zoom-in duration-300">
      <div className="bg-[#4B5320] p-8 text-white relative">
        <button onClick={onBack} className="absolute top-6 left-6 p-2 hover:bg-white/10 rounded-full transition-colors">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" /></svg>
        </button>
        <div className="flex flex-col items-center text-center mt-4">
          <div className="w-24 h-24 bg-white/20 rounded-[2rem] flex items-center justify-center text-4xl font-black mb-4 shadow-inner">
            {producer.name.charAt(0)}
          </div>
          <h2 className="text-3xl font-black tracking-tight">{producer.name}</h2>
          <p className="text-white/60 text-xs uppercase font-black tracking-widest mt-2">DICOSE: {producer.dicose}</p>
        </div>
      </div>

      <div className="p-10 space-y-8">
        <div className="text-center">
          <p className="text-gray-500 font-medium text-sm mb-2">Estás interesado en:</p>
          <p className="text-[#4B5320] font-black text-lg uppercase tracking-tight">{project.title}</p>
        </div>

        {!accepted ? (
          <div className="bg-amber-50/50 border border-amber-100 rounded-[2rem] p-8 space-y-6 animate-in slide-in-from-bottom-4 duration-500">
            <div className="flex items-center gap-3 text-amber-800">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
              <h3 className="font-black uppercase tracking-widest text-xs">Compromiso y Responsabilidad</h3>
            </div>
            
            <div className="space-y-4 text-sm text-amber-900/80 leading-relaxed">
              <p><strong>Seriedad:</strong> Por respeto al trabajo del productor, contacta únicamente si tienes una intención real de inversión. Evita consultas por mera curiosidad.</p>
              <p><strong>Trato Directo:</strong> Estás saliendo de la plataforma. La negociación, el intercambio de documentación (DICOSE, Guías, Contratos) y la verificación del ganado son responsabilidad exclusiva de las partes.</p>
              <p><strong>Acuerdo Libre:</strong> SocioRural no interviene, no garantiza, ni es parte del contrato. El acuerdo es un negocio privado entre particulares.</p>
              <p><strong>Obligaciones:</strong> Cada parte es responsable de cumplir con sus obligaciones tributarias (DGI) y legales correspondientes.</p>
              <p><strong>Seguridad:</strong> Recomendamos siempre verificar físicamente los lotes y antecedentes antes de realizar cualquier transferencia de fondos.</p>
            </div>

            <button 
              onClick={() => setAccepted(true)}
              className="w-full bg-[#4B5320] text-white py-5 rounded-2xl font-black uppercase text-xs tracking-widest shadow-xl hover:bg-[#3a4119] transition-all transform active:scale-95"
            >
              Entendido y Acepto
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <button 
              onClick={handleWhatsApp}
              className="flex items-center justify-between p-6 bg-emerald-50 border border-emerald-100 rounded-3xl hover:bg-emerald-100 transition-all group"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-emerald-500 text-white rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.246 2.248 3.484 5.232 3.484 8.412-.003 6.557-5.338 11.892-11.893 11.892-1.997-.001-3.951-.5-5.688-1.448l-6.309 1.656zm6.29-4.143c1.589.943 3.133 1.415 4.75 1.416 5.482.001 9.944-4.461 9.946-9.942 0-2.656-1.035-5.147-2.912-7.023-1.879-1.878-4.369-2.912-7.025-2.913-5.483 0-9.944 4.461-9.947 9.942 0 1.742.459 3.449 1.332 4.959l-1.076 3.932 4.032-1.059zm11.367-7.055c-.301-.15-.1.15-1.779-.839-.33-.164-.578-.246-.784-.051-.206.194-.784.784-.962.987-.178.203-.354.23-.655.079-.301-.15-1.27-.467-2.42-1.492-.894-.798-1.497-1.783-1.673-2.083-.176-.3-.019-.461.13-.611.135-.135.301-.35.451-.525.15-.175.201-.3.301-.5.1-.2.05-.375-.025-.525-.075-.15-.784-1.891-1.074-2.591-.283-.682-.563-.589-.784-.6-.201-.009-.431-.01-.661-.01-.23 0-.605.086-.921.431-.316.345-1.206 1.181-1.206 2.876 0 1.695 1.235 3.331 1.405 3.556.171.225 2.428 3.708 5.884 5.199.821.354 1.462.565 1.96.722.825.263 1.577.225 2.171.137.662-.098 2.035-.831 2.321-1.636.285-.804.285-1.493.199-1.636-.086-.144-.316-.23-.617-.38z"/></svg>
                </div>
                <div className="text-left">
                  <p className="text-emerald-900 font-black uppercase text-[10px] tracking-widest">WhatsApp</p>
                  <p className="text-emerald-700 font-bold">{producer.phone}</p>
                </div>
              </div>
              <svg className="w-5 h-5 text-emerald-300 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M13 7l5 5m0 0l-5 5m5-5H6" /></svg>
            </button>

            <button 
              onClick={handleCall}
              className="flex items-center justify-between p-6 bg-blue-50 border border-blue-100 rounded-3xl hover:bg-blue-100 transition-all group"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-blue-500 text-white rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
                </div>
                <div className="text-left">
                  <p className="text-blue-900 font-black uppercase text-[10px] tracking-widest">Llamada Directa</p>
                  <p className="text-blue-700 font-bold">{producer.phone}</p>
                </div>
              </div>
              <svg className="w-5 h-5 text-blue-300 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M13 7l5 5m0 0l-5 5m5-5H6" /></svg>
            </button>

            <button 
              onClick={handleEmail}
              className="flex items-center justify-between p-6 bg-amber-50 border border-amber-100 rounded-3xl hover:bg-amber-100 transition-all group"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-amber-500 text-white rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                </div>
                <div className="text-left">
                  <p className="text-amber-900 font-black uppercase text-[10px] tracking-widest">Correo Electrónico</p>
                  <p className="text-amber-700 font-bold">{producer.email}</p>
                </div>
              </div>
              <svg className="w-5 h-5 text-amber-300 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M13 7l5 5m0 0l-5 5m5-5H6" /></svg>
            </button>
          </div>
        )}

      </div>
    </div>
  );
};

export default ContactView;
