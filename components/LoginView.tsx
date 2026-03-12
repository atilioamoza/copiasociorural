
import React, { useState } from 'react';
import { QUICK_USERS, COLORS } from '../constants';
import { User } from '../types';

interface LoginViewProps {
  onLogin: (user: User) => void;
  onCancel?: () => void;
}

const LoginView: React.FC<LoginViewProps> = ({ onLogin, onCancel }) => {
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');
  const [step, setStep] = useState<'phone' | 'otp'>('phone');

  const handleSendOtp = () => {
    if (phone.length >= 8) {
      setStep('otp');
    }
  };

  const handleVerifyOtp = () => {
    if (otp === '1234') {
      onLogin(QUICK_USERS[0]);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-[#f5f2ed] bg-[url('https://www.transparenttextures.com/patterns/wood-pattern.png')]">
      <div className="w-full max-w-md animate-in fade-in zoom-in duration-500">
        <div className="bg-white rounded-[3rem] shadow-2xl overflow-hidden border border-gray-100">
          <div className="bg-[#4B5320] p-12 text-center text-white relative">
            {onCancel && (
              <button 
                onClick={onCancel}
                className="absolute top-8 left-8 p-2 rounded-full hover:bg-white/10 transition-all"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15 19l-7-7 7-7"/></svg>
              </button>
            )}
            <div className="w-20 h-20 bg-white rounded-3xl mx-auto flex items-center justify-center text-[#4B5320] font-black text-3xl mb-6 shadow-xl rotate-3">
              SR
            </div>
            <h1 className="text-3xl font-black tracking-tight mb-2 uppercase">SocioRural</h1>
            <p className="text-white/60 text-xs font-black tracking-[0.3em] uppercase">Inversión Directa</p>
          </div>

          <div className="p-10 space-y-8">
            {step === 'phone' ? (
              <div className="space-y-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Número de Celular</label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 font-bold">+598</span>
                    <input 
                      type="tel" 
                      placeholder="099 123 456"
                      value={phone} 
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full bg-gray-50 border-0 rounded-2xl p-4 pl-16 text-sm font-bold text-gray-700 focus:ring-2 focus:ring-[#4B5320] transition-all" 
                    />
                  </div>
                  <p className="text-[9px] text-gray-400 italic ml-1">Te enviaremos un código de validación vía WhatsApp.</p>
                </div>
                <button 
                  onClick={handleSendOtp}
                  disabled={phone.length < 8}
                  className="w-full bg-[#4B5320] text-white py-5 rounded-2xl font-black uppercase text-xs tracking-[0.2em] shadow-xl hover:bg-[#3a4119] transition-all transform active:scale-95 disabled:opacity-50 disabled:scale-100"
                >
                  Validar Celular
                </button>
              </div>
            ) : (
              <div className="space-y-6 animate-in slide-in-from-right duration-300">
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Código de Validación</label>
                  <input 
                    type="text" 
                    placeholder="••••"
                    maxLength={4}
                    value={otp} 
                    onChange={(e) => setOtp(e.target.value)}
                    className="w-full bg-gray-50 border-0 rounded-2xl p-4 text-center text-2xl font-black tracking-[1em] text-gray-700 focus:ring-2 focus:ring-[#4B5320] transition-all" 
                  />
                  <p className="text-[9px] text-gray-400 italic text-center">Ingresa el código de 4 dígitos enviado al {phone}</p>
                </div>
                <button 
                  onClick={handleVerifyOtp}
                  className="w-full bg-[#4B5320] text-white py-5 rounded-2xl font-black uppercase text-xs tracking-[0.2em] shadow-xl hover:bg-[#3a4119] transition-all transform active:scale-95"
                >
                  Confirmar Código
                </button>
                <button onClick={() => setStep('phone')} className="w-full text-[10px] font-black text-gray-400 uppercase tracking-widest hover:text-[#4B5320] transition-colors">Cambiar número</button>
              </div>
            )}

            <div className="relative pt-4 text-center">
              <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-gray-100"></div></div>
              <span className="relative bg-white px-4 text-[10px] font-black text-gray-300 uppercase tracking-[0.2em]">Acceso Rápido (Simulado)</span>
            </div>

            <div className="grid grid-cols-1 gap-3">
              {QUICK_USERS.map((u) => (
                <button 
                  key={u.id}
                  onClick={() => onLogin(u)}
                  className="group flex items-center justify-between p-4 bg-gray-50 rounded-2xl hover:bg-[#4B5320]/5 border border-transparent hover:border-[#4B5320]/10 transition-all text-left"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center font-black text-[#4B5320] shadow-sm border border-gray-100 group-hover:scale-110 transition-transform">
                      {u.name.charAt(0)}
                    </div>
                    <div>
                      <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest leading-none mb-1">Nivel {u.verificationLevel} • {u.verificationLevel === 1 ? 'Base' : u.verificationLevel === 2 ? 'Verificado' : 'Pro'}</p>
                      <p className="text-sm font-bold text-gray-700">{u.name}</p>
                    </div>
                  </div>
                  <svg className="w-5 h-5 text-gray-200 group-hover:text-[#4B5320] transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M9 5l7 7-7 7" /></svg>
                </button>
              ))}
            </div>
            
            {onCancel && (
              <button 
                onClick={onCancel}
                className="w-full py-4 text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] hover:text-gray-600 transition-all"
              >
                Seguir explorando como invitado
              </button>
            )}
          </div>
        </div>
        <p className="text-center mt-8 text-[10px] font-black text-gray-400 uppercase tracking-widest leading-loose">
          SocioRural Uruguay • Gestión de Activos Reales <br/>
          Democratizando la rentabilidad del campo.
        </p>
      </div>
    </div>
  );
};

export default LoginView;
