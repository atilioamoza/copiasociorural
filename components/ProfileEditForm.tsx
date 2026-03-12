
import React, { useState, useRef } from 'react';
import { Producer, ExperienceEntry } from '../types';
import { URUGUAY_DEPARTMENTS } from '../constants';

interface ProfileEditFormProps {
  producer: Producer;
  onBack: () => void;
  onSave: (producer: Producer) => void;
}

const ProfileEditForm: React.FC<ProfileEditFormProps> = ({ producer, onBack, onSave }) => {
  const [formData, setFormData] = useState<Producer>({ ...producer });
  const [newExp, setNewExp] = useState<ExperienceEntry>({ establishment: '', role: '', period: '', achievement: '' });
  const [newEdu, setNewEdu] = useState('');
  const [newSkill, setNewSkill] = useState('');

  const fileInputRef = useRef<HTMLInputElement>(null);
  const coverInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, field: 'profileImage' | 'coverImage') => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData(prev => ({ ...prev, [field]: reader.result as string }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleListAction = (type: 'exp' | 'edu' | 'skill', action: 'add' | 'remove', index?: number) => {
    if (type === 'exp') {
      if (action === 'add' && newExp.establishment && newExp.role) {
        setFormData(prev => ({ ...prev, experience: [...prev.experience, newExp] }));
        setNewExp({ establishment: '', role: '', period: '', achievement: '' });
      } else if (action === 'remove' && index !== undefined) {
        setFormData(prev => ({ ...prev, experience: prev.experience.filter((_, i) => i !== index) }));
      }
    } else if (type === 'edu') {
      if (action === 'add' && newEdu) {
        setFormData(prev => ({ ...prev, education: [...prev.education, newEdu] }));
        setNewEdu('');
      } else if (action === 'remove' && index !== undefined) {
        setFormData(prev => ({ ...prev, education: prev.education.filter((_, i) => i !== index) }));
      }
    } else if (type === 'skill') {
      if (action === 'add' && newSkill) {
        setFormData(prev => ({ ...prev, skills: [...prev.skills, newSkill] }));
        setNewSkill('');
      } else if (action === 'remove' && index !== undefined) {
        setFormData(prev => ({ ...prev, skills: prev.skills.filter((_, i) => i !== index) }));
      }
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <div className="max-w-4xl mx-auto py-12 px-4 md:px-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <button onClick={onBack} className="mb-8 flex items-center gap-2 text-[#4B5320] font-bold hover:text-[#8B4513] transition-colors group bg-white px-4 py-2 rounded-full shadow-sm border border-gray-100">
        <svg className="w-5 h-5 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path></svg>
        Volver al perfil
      </button>

      <div className="bg-white rounded-[3rem] shadow-2xl overflow-hidden border border-gray-100">
        <div className="bg-[#4B5320] p-12 text-white">
          <h2 className="text-3xl font-bold mb-2">Editar Mi Perfil Profesional</h2>
          <p className="text-white/60 font-medium italic">Personaliza tu presencia digital en SocioRural para conectar mejor con socios inversores.</p>
        </div>

        <form onSubmit={handleSubmit} className="p-12 space-y-12">
          
          {/* FOTOS DEL PERFIL */}
          <section className="space-y-6">
            <h3 className="text-[11px] font-black uppercase text-gray-400 tracking-[0.3em] flex items-center gap-3">
              <div className="w-8 h-px bg-gray-200"></div>
              Fotos del Perfil
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <label className="text-[10px] font-black uppercase text-gray-400 tracking-widest block ml-1">Foto de Portada</label>
                <div 
                  className="relative h-40 bg-gray-100 rounded-3xl overflow-hidden group cursor-pointer border-2 border-dashed border-gray-200 hover:border-[#4B5320]/30 transition-all"
                  onClick={() => coverInputRef.current?.click()}
                >
                  <img src={formData.coverImage} className="w-full h-full object-cover opacity-60 group-hover:opacity-100 transition-opacity" alt="Cover" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="bg-white/90 backdrop-blur px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest text-[#4B5320] shadow-xl">Cambiar Portada</span>
                  </div>
                  <input 
                    type="file" 
                    ref={coverInputRef} 
                    className="hidden" 
                    accept="image/*"
                    onChange={(e) => handleFileChange(e, 'coverImage')}
                  />
                </div>
              </div>
              <div className="space-y-4">
                <label className="text-[10px] font-black uppercase text-gray-400 tracking-widest block ml-1">Foto de Perfil</label>
                <div className="flex items-center gap-6">
                  <div 
                    className="w-24 h-24 bg-[#4B5320] rounded-[2rem] flex items-center justify-center text-white text-3xl font-black cursor-pointer hover:scale-105 transition-transform overflow-hidden"
                    onClick={() => fileInputRef.current?.click()}
                  >
                    {formData.profileImage ? (
                      <img src={formData.profileImage} className="w-full h-full object-cover" alt="Profile" />
                    ) : (
                      formData.name.charAt(0)
                    )}
                  </div>
                  <button 
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="px-6 py-3 border-2 border-gray-100 rounded-2xl text-[10px] font-black uppercase tracking-widest text-gray-500 hover:border-[#4B5320]/20 hover:text-[#4B5320] transition-all"
                  >
                    Subir nueva foto
                  </button>
                  <input 
                    type="file" 
                    ref={fileInputRef} 
                    className="hidden" 
                    accept="image/*"
                    onChange={(e) => handleFileChange(e, 'profileImage')}
                  />
                </div>
              </div>
            </div>
          </section>

          {/* INFORMACIÓN BÁSICA */}
          <section className="space-y-8 pt-6 border-t border-gray-50">
            <h3 className="text-[11px] font-black uppercase text-gray-400 tracking-[0.3em] flex items-center gap-3">
              <div className="w-8 h-px bg-gray-200"></div>
              Información Principal
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-3">
                <label className="text-[10px] font-black uppercase text-gray-400 tracking-widest ml-1">Nombre Completo</label>
                <input name="name" type="text" value={formData.name} onChange={handleChange} className="w-full bg-gray-50 border-2 border-transparent rounded-2xl px-6 py-4 font-bold focus:ring-4 focus:ring-[#4B5320]/5 focus:bg-white focus:border-[#4B5320] outline-none transition-all shadow-sm" />
              </div>
              <div className="space-y-3">
                <label className="text-[10px] font-black uppercase text-gray-400 tracking-widest ml-1">Departamento de Operación</label>
                <select 
                  name="locationDetails" 
                  value={formData.locationDetails} 
                  onChange={(e) => setFormData(prev => ({ ...prev, locationDetails: e.target.value }))}
                  className="w-full bg-gray-50 border-2 border-transparent rounded-2xl px-6 py-4 font-bold focus:ring-4 focus:ring-[#4B5320]/5 focus:bg-white focus:border-[#4B5320] outline-none transition-all shadow-sm appearance-none"
                >
                  <option value="">Seleccionar departamento</option>
                  {URUGUAY_DEPARTMENTS.map(dept => (
                    <option key={dept} value={dept}>{dept}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-3">
                <label className="text-[10px] font-black uppercase text-gray-400 tracking-widest ml-1">DICOSE</label>
                <input name="dicose" type="text" value={formData.dicose} onChange={handleChange} className="w-full bg-gray-50 border-2 border-transparent rounded-2xl px-6 py-4 font-bold focus:ring-4 focus:ring-[#4B5320]/5 focus:bg-white focus:border-[#4B5320] outline-none transition-all shadow-sm" />
              </div>
            </div>

            <div className="space-y-3">
              <label className="text-[10px] font-black uppercase text-gray-400 tracking-widest ml-1">Titular / Headline Profesional</label>
              <input name="headline" type="text" value={formData.headline} onChange={handleChange} className="w-full bg-gray-50 border-2 border-transparent rounded-2xl px-6 py-4 font-bold text-[#8B4513] focus:ring-4 focus:ring-[#4B5320]/5 focus:bg-white focus:border-[#4B5320] outline-none transition-all shadow-sm" />
            </div>

            <div className="space-y-3">
              <label className="text-[10px] font-black uppercase text-gray-400 tracking-widest ml-1">Biografía / Acerca de</label>
              <textarea name="bio" value={formData.bio} onChange={handleChange} rows={4} className="w-full bg-gray-50 border-2 border-transparent rounded-2xl px-6 py-4 font-medium text-gray-600 focus:ring-4 focus:ring-[#4B5320]/5 focus:bg-white focus:border-[#4B5320] outline-none transition-all shadow-sm leading-relaxed" />
            </div>
          </section>

          {/* TRAYECTORIA (EXPERIENCIA) */}
          <section className="space-y-8 pt-6 border-t border-gray-50">
            <h3 className="text-[11px] font-black uppercase text-gray-400 tracking-[0.3em] flex items-center gap-3">
              <div className="w-8 h-px bg-gray-200"></div>
              Trayectoria Profesional
            </h3>
            
            <div className="space-y-4">
              {formData.experience.map((exp, i) => (
                <div key={i} className="flex items-center justify-between p-6 bg-gray-50 rounded-3xl border border-gray-100">
                  <div>
                    <p className="font-bold text-gray-800">{exp.role}</p>
                    <p className="text-xs text-[#8B4513] font-medium">{exp.establishment} • {exp.period}</p>
                  </div>
                  <button type="button" onClick={() => handleListAction('exp', 'remove', i)} className="text-red-400 hover:text-red-600 p-2">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
                  </button>
                </div>
              ))}
            </div>

            <div className="bg-[#f5f2ed] p-8 rounded-[2.5rem] border border-gray-100 space-y-6">
              <p className="text-[10px] font-black text-[#4B5320] uppercase tracking-widest mb-2">Agregar nueva experiencia</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input placeholder="Establecimiento" value={newExp.establishment} onChange={e => setNewExp({...newExp, establishment: e.target.value})} className="bg-white border border-gray-100 rounded-xl px-4 py-3 text-sm font-medium" />
                <input placeholder="Cargo/Rol" value={newExp.role} onChange={e => setNewExp({...newExp, role: e.target.value})} className="bg-white border border-gray-100 rounded-xl px-4 py-3 text-sm font-medium" />
                <input placeholder="Periodo (Ej: 2018 - 2022)" value={newExp.period} onChange={e => setNewExp({...newExp, period: e.target.value})} className="bg-white border border-gray-100 rounded-xl px-4 py-3 text-sm font-medium" />
                <input placeholder="Logro principal" value={newExp.achievement} onChange={e => setNewExp({...newExp, achievement: e.target.value})} className="bg-white border border-gray-100 rounded-xl px-4 py-3 text-sm font-medium" />
              </div>
              <button type="button" onClick={() => handleListAction('exp', 'add')} className="w-full py-4 bg-white border-2 border-[#4B5320]/20 text-[#4B5320] rounded-2xl font-black uppercase text-[10px] tracking-widest hover:bg-[#4B5320] hover:text-white transition-all">
                Añadir a la trayectoria
              </button>
            </div>
          </section>

          {/* FORMACIÓN Y APTITUDES */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 pt-6 border-t border-gray-50">
            <section className="space-y-6">
              <h3 className="text-[11px] font-black uppercase text-gray-400 tracking-[0.3em] flex items-center gap-3">
                <div className="w-8 h-px bg-gray-200"></div>
                Formación
              </h3>
              <div className="flex gap-2">
                <input placeholder="Ej: Ing. Agrónomo - UDELAR" value={newEdu} onChange={e => setNewEdu(e.target.value)} className="flex-grow bg-gray-50 border border-gray-100 rounded-xl px-4 py-3 text-sm font-medium" />
                <button type="button" onClick={() => handleListAction('edu', 'add')} className="bg-[#4B5320] text-white px-4 rounded-xl font-bold">+</button>
              </div>
              <div className="space-y-2">
                {formData.education.map((edu, i) => (
                  <div key={i} className="flex items-center justify-between p-3 bg-white border border-gray-50 rounded-xl">
                    <span className="text-xs font-medium text-gray-600">{edu}</span>
                    <button type="button" onClick={() => handleListAction('edu', 'remove', i)} className="text-gray-300 hover:text-red-500">×</button>
                  </div>
                ))}
              </div>
            </section>

            <section className="space-y-6">
              <h3 className="text-[11px] font-black uppercase text-gray-400 tracking-[0.3em] flex items-center gap-3">
                <div className="w-8 h-px bg-gray-200"></div>
                Aptitudes
              </h3>
              <div className="flex gap-2">
                <input placeholder="Ej: Manejo de Pasturas" value={newSkill} onChange={e => setNewSkill(e.target.value)} className="flex-grow bg-gray-50 border border-gray-100 rounded-xl px-4 py-3 text-sm font-medium" />
                <button type="button" onClick={() => handleListAction('skill', 'add')} className="bg-[#4B5320] text-white px-4 rounded-xl font-bold">+</button>
              </div>
              <div className="flex flex-wrap gap-2">
                {formData.skills.map((skill, i) => (
                  <div key={i} className="flex items-center gap-2 px-4 py-2 bg-[#4B5320]/5 text-[#4B5320] rounded-full text-xs font-black uppercase tracking-widest border border-[#4B5320]/10">
                    {skill}
                    <button type="button" onClick={() => handleListAction('skill', 'remove', i)} className="hover:text-red-500">×</button>
                  </div>
                ))}
              </div>
            </section>
          </div>
          
          {/* REDES SOCIALES */}
          <section className="space-y-8 pt-6 border-t border-gray-50">
            <h3 className="text-[11px] font-black uppercase text-gray-400 tracking-[0.3em] flex items-center gap-3">
              <div className="w-8 h-px bg-gray-200"></div>
              Redes Sociales
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase text-gray-400 tracking-widest block ml-1">Facebook</label>
                <input 
                  type="url" 
                  placeholder="https://facebook.com/..." 
                  value={formData.socialLinks?.facebook || ''} 
                  onChange={(e) => setFormData(prev => ({ ...prev, socialLinks: { ...prev.socialLinks, facebook: e.target.value } }))}
                  className="w-full bg-gray-50 border border-gray-100 rounded-xl px-4 py-3 text-sm font-medium focus:border-[#4B5320] outline-none transition-all"
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase text-gray-400 tracking-widest block ml-1">LinkedIn</label>
                <input 
                  type="url" 
                  placeholder="https://linkedin.com/in/..." 
                  value={formData.socialLinks?.linkedin || ''} 
                  onChange={(e) => setFormData(prev => ({ ...prev, socialLinks: { ...prev.socialLinks, linkedin: e.target.value } }))}
                  className="w-full bg-gray-50 border border-gray-100 rounded-xl px-4 py-3 text-sm font-medium focus:border-[#4B5320] outline-none transition-all"
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase text-gray-400 tracking-widest block ml-1">Instagram</label>
                <input 
                  type="url" 
                  placeholder="https://instagram.com/..." 
                  value={formData.socialLinks?.instagram || ''} 
                  onChange={(e) => setFormData(prev => ({ ...prev, socialLinks: { ...prev.socialLinks, instagram: e.target.value } }))}
                  className="w-full bg-gray-50 border border-gray-100 rounded-xl px-4 py-3 text-sm font-medium focus:border-[#4B5320] outline-none transition-all"
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase text-gray-400 tracking-widest block ml-1">X (Twitter)</label>
                <input 
                  type="url" 
                  placeholder="https://x.com/..." 
                  value={formData.socialLinks?.x || ''} 
                  onChange={(e) => setFormData(prev => ({ ...prev, socialLinks: { ...prev.socialLinks, x: e.target.value } }))}
                  className="w-full bg-gray-50 border border-gray-100 rounded-xl px-4 py-3 text-sm font-medium focus:border-[#4B5320] outline-none transition-all"
                />
              </div>
            </div>
          </section>

          <div className="flex gap-4 pt-12 border-t border-gray-100">
            <button type="button" onClick={onBack} className="flex-1 py-5 font-bold text-gray-400 hover:text-gray-600 transition-colors uppercase text-xs tracking-widest">
              Cancelar
            </button>
            <button type="submit" className="flex-2 bg-[#4B5320] text-white py-5 px-12 rounded-[2rem] font-black uppercase text-xs tracking-widest shadow-xl hover:bg-[#3a4119] transition-all transform hover:-translate-y-1 active:scale-95 flex items-center justify-center gap-3">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path></svg>
              GUARDAR CAMBIOS DEL PERFIL
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProfileEditForm;
