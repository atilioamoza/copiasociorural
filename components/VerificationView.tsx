
import React, { useState } from 'react';
import { User, VerificationLevel } from '../types';

interface VerificationViewProps {
  user: User;
  onUpdateUser: (updatedUser: User) => void;
  onBack: () => void;
}

const VerificationView: React.FC<VerificationViewProps> = ({ user, onUpdateUser, onBack }) => {
  const [step, setStep] = useState<VerificationLevel>(user.verificationLevel);
  const [isUploading, setIsUploading] = useState(false);

  const handleUpload = (field: 'idFront' | 'idBack' | 'selfie') => {
    setIsUploading(true);
    // Simulate upload
    setTimeout(() => {
      onUpdateUser({
        ...user,
        [field]: 'https://via.placeholder.com/400x250?text=Documento+Cargado'
      });
      setIsUploading(false);
    }, 1500);
  };

  const handleCompleteLevel2 = () => {
    onUpdateUser({
      ...user,
      verificationLevel: 2
    });
    setStep(2);
  };

  const handleCompleteLevel3 = (bpsCode: string) => {
    onUpdateUser({
      ...user,
      verificationLevel: 3,
      bpsCode
    });
    setStep(3);
  };

  return (
    <div className="max-w-2xl mx-auto py-12 px-4">
      <button 
        onClick={onBack}
        className="mb-8 flex items-center gap-2 text-[#4B5320] font-bold hover:text-[#8B4513] transition-colors group"
      >
        <svg className="w-5 h-5 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
        </svg>
        Volver
      </button>

      <div className="bg-white rounded-[3rem] shadow-xl border border-gray-100 overflow-hidden">
        <div className="bg-[#4B5320] p-10 text-white">
          <h1 className="text-3xl font-black tracking-tight uppercase mb-2">Verificación de Identidad</h1>
          <p className="text-white/60 text-sm">Aumenta tu nivel de confianza en la comunidad SocioRural.</p>
        </div>

        <div className="p-10">
          {/* Progress Stepper */}
          <div className="flex items-center justify-between mb-12 relative">
            <div className="absolute top-1/2 left-0 w-full h-1 bg-gray-100 -translate-y-1/2 z-0"></div>
            <div className={`absolute top-1/2 left-0 h-1 bg-[#4B5320] -translate-y-1/2 z-0 transition-all duration-500`} style={{ width: `${(user.verificationLevel - 1) * 50}%` }}></div>
            
            {[1, 2, 3].map((lvl) => (
              <div key={lvl} className="relative z-10 flex flex-col items-center gap-2">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-black text-sm transition-all ${user.verificationLevel >= lvl ? 'bg-[#4B5320] text-white' : 'bg-white border-2 border-gray-200 text-gray-300'}`}>
                  {lvl}
                </div>
                <span className={`text-[9px] font-black uppercase tracking-widest ${user.verificationLevel >= lvl ? 'text-[#4B5320]' : 'text-gray-300'}`}>
                  {lvl === 1 ? 'Base' : lvl === 2 ? 'Verificado' : 'Pro'}
                </span>
              </div>
            ))}
          </div>

          {user.verificationLevel === 1 && (
            <div className="space-y-8 animate-in fade-in slide-in-from-bottom duration-500">
              <div className="bg-amber-50 border border-amber-100 p-6 rounded-3xl flex gap-4 items-start">
                <div className="bg-amber-100 p-2 rounded-xl text-amber-600">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
                </div>
                <div>
                  <h3 className="font-bold text-amber-900 mb-1">Nivel Verificado Requerido</h3>
                  <p className="text-amber-700 text-xs leading-relaxed">Para publicar rondas de inversión o contactar a otros usuarios, necesitamos validar tu identidad real.</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Cédula de Identidad (Frente)</label>
                  <div 
                    onClick={() => handleUpload('idFront')}
                    className={`aspect-[1.6/1] rounded-3xl border-2 border-dashed flex flex-col items-center justify-center cursor-pointer transition-all ${user.idFront ? 'border-emerald-200 bg-emerald-50' : 'border-gray-200 hover:border-[#4B5320]/30 bg-gray-50'}`}
                  >
                    {user.idFront ? (
                      <svg className="w-12 h-12 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" /></svg>
                    ) : (
                      <>
                        <svg className="w-8 h-8 text-gray-300 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                        <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Subir Frente</span>
                      </>
                    )}
                  </div>
                </div>
                <div className="space-y-4">
                  <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Cédula de Identidad (Dorso)</label>
                  <div 
                    onClick={() => handleUpload('idBack')}
                    className={`aspect-[1.6/1] rounded-3xl border-2 border-dashed flex flex-col items-center justify-center cursor-pointer transition-all ${user.idBack ? 'border-emerald-200 bg-emerald-50' : 'border-gray-200 hover:border-[#4B5320]/30 bg-gray-50'}`}
                  >
                    {user.idBack ? (
                      <svg className="w-12 h-12 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" /></svg>
                    ) : (
                      <>
                        <svg className="w-8 h-8 text-gray-300 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                        <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Subir Dorso</span>
                      </>
                    )}
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Selfie de Validación</label>
                <div 
                  onClick={() => handleUpload('selfie')}
                  className={`aspect-video rounded-3xl border-2 border-dashed flex flex-col items-center justify-center cursor-pointer transition-all ${user.selfie ? 'border-emerald-200 bg-emerald-50' : 'border-gray-200 hover:border-[#4B5320]/30 bg-gray-50'}`}
                >
                  {user.selfie ? (
                    <svg className="w-12 h-12 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" /></svg>
                  ) : (
                    <>
                      <svg className="w-8 h-8 text-gray-300 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
                      <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Tomar Selfie</span>
                    </>
                  )}
                </div>
              </div>

              <button 
                onClick={handleCompleteLevel2}
                disabled={!user.idFront || !user.idBack || !user.selfie || isUploading}
                className="w-full bg-[#4B5320] text-white py-5 rounded-2xl font-black uppercase text-xs tracking-[0.2em] shadow-xl hover:bg-[#3a4119] transition-all transform active:scale-95 disabled:opacity-50 disabled:scale-100"
              >
                {isUploading ? 'Validando Datos...' : 'Enviar para Verificación'}
              </button>
            </div>
          )}

          {user.verificationLevel === 2 && (
            <div className="space-y-8 animate-in fade-in slide-in-from-bottom duration-500">
              <div className="bg-emerald-50 border border-emerald-100 p-8 rounded-[2.5rem] text-center">
                <div className="w-20 h-20 bg-emerald-500 text-white rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                  <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" /></svg>
                </div>
                <h3 className="text-2xl font-black text-emerald-900 mb-2 uppercase tracking-tight">¡Cuenta Verificada!</h3>
                <p className="text-emerald-700 text-sm leading-relaxed max-w-sm mx-auto">Ya puedes publicar rondas de inversión y contactar a otros miembros de la comunidad con total confianza.</p>
              </div>

              <div className="space-y-6">
                <div className="relative">
                  <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-gray-100"></div></div>
                  <span className="relative bg-white pr-4 text-[10px] font-black text-gray-300 uppercase tracking-[0.2em]">Opcional: Nivel Pro</span>
                </div>

                <div className="space-y-4">
                  <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Código de Historia Laboral BPS</label>
                  <input 
                    type="text" 
                    placeholder="Ingrese código de validación BPS"
                    className="w-full bg-gray-50 border-0 rounded-2xl p-4 text-sm font-bold text-gray-700 focus:ring-2 focus:ring-[#4B5320] transition-all" 
                    onChange={(e) => {
                      if (e.target.value.length > 5) {
                        // Just for demo
                      }
                    }}
                  />
                  <p className="text-[9px] text-gray-400 italic ml-1">Valida tus antecedentes rurales mediante tu historial laboral oficial.</p>
                </div>

                <button 
                  onClick={() => handleCompleteLevel3('BPS-12345')}
                  className="w-full bg-white border-2 border-[#4B5320] text-[#4B5320] py-4 rounded-2xl font-black uppercase text-xs tracking-[0.2em] hover:bg-[#4B5320] hover:text-white transition-all transform active:scale-95"
                >
                  Obtener Sello de Trayectoria
                </button>
              </div>
            </div>
          )}

          {user.verificationLevel === 3 && (
            <div className="space-y-8 animate-in fade-in slide-in-from-bottom duration-500">
              <div className="bg-[#4B5320] p-8 rounded-[2.5rem] text-center text-white shadow-2xl">
                <div className="w-20 h-20 bg-white text-[#4B5320] rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                  <svg className="w-10 h-10" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
                </div>
                <h3 className="text-2xl font-black mb-2 uppercase tracking-tight">Perfil Trayectoria PRO</h3>
                <p className="text-white/60 text-sm leading-relaxed max-w-sm mx-auto">Has alcanzado el máximo nivel de verificación. Tu historial laboral BPS valida tus antecedentes en el sector rural.</p>
              </div>
              
              <button 
                onClick={onBack}
                className="w-full bg-gray-50 text-gray-400 py-4 rounded-2xl font-black uppercase text-xs tracking-[0.2em] hover:bg-gray-100 transition-all"
              >
                Volver a la Cartelera
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default VerificationView;
