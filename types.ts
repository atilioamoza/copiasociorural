
export type ProjectCategory = 'livestock' | 'agriculture';
export type VerificationLevel = 1 | 2 | 3; // 1: Base (Phone), 2: Verified (ID), 3: Pro (BPS)

export type LivestockSubType = 
  | 'Terneros <140kg'
  | 'Terneros 140-180kg'
  | 'Terneros >180kg'
  | 'Novillos 1-2 años'
  | 'Novillos 2-3 años'
  | 'Novillos +3 años'
  | 'Terneras' 
  | 'Vaquillonas 1-2 años'
  | 'Vaquillonas +2 años'
  | 'Vaca de Invernada'
  | 'Piezas de Cría'
  | 'Vientres Preñados'
  | 'Vientres Entorados'
  | 'Ovinos'
  | 'Otros';

export type CropType = 
  | 'Tomate' | 'Morrón' | 'Lechuga' | 'Cebolla' | 'Zanahoria' | 'Zapallito' | 'Papa' | 'Ajo' | 'Remolacha' | 'Acelga/Esp.'
  | 'Pepino' | 'Berenjena' | 'Frutilla' | 'Espinaca' | 'Zapallo (Kabutiá/común)' | 'Chaucha (judía verde)' | 'Brócoli'
  | 'Soja' | 'Trigo' | 'Cebada' | 'Maíz' | 'Colza' | 'Arroz' | 'Sorgo' | 'Avena' | 'Girasol' | 'Caña Azúcar' 
  | 'Lino' | 'Lupino' | 'Chía';

export type MarketStatus = 'green' | 'yellow' | 'red';

export type ProducerPlan = 'free' | 'premium';

export interface User {
  id: string;
  name: string;
  phoneNumber: string;
  verificationLevel: VerificationLevel;
  idFront?: string;
  idBack?: string;
  selfie?: string;
  bpsCode?: string;
  producerData?: Producer;
}

export interface CashFlowMonth {
  month: number;
  amount: number;
  label: string;
}

export interface FinancialProjections {
  irr: number; 
  npv: number;
  grossMargin: number;
  initialInvestment: number;
  expectedExitValue: number;
  monthlyCashFlow: CashFlowMonth[];
  marketStatus: MarketStatus;
  breedingBreakdown?: {
    stockVacas: number;
    stockTerneros: number;
  };
}

export interface InvestorMatch {
  id: string;
  name: string;
  amount: number;
  status: 'pending' | 'accepted' | 'rejected';
  date: string;
}

export interface ExperienceEntry {
  establishment: string;
  role: string;
  period: string;
  achievement: string;
}

export interface ProducerDocument {
  id: string;
  name: string;
  type: 'DICOSE' | 'Garantía' | 'Título' | 'Otros';
  url: string;
}

export interface SocialLinks {
  facebook?: string;
  linkedin?: string;
  instagram?: string;
  x?: string;
}

export interface Producer {
  name: string;
  email: string;
  phone: string;
  headline: string;
  bio: string;
  dicose: string;
  experienceYears: number;
  locationDetails: string;
  guaranteeType: 'Prenda' | 'Fiador' | 'Historial' | 'Ganado' | 'Otros';
  plan: ProducerPlan;
  coverImage?: string;
  profileImage?: string;
  experience: ExperienceEntry[];
  education: string[];
  skills: string[];
  documents?: ProducerDocument[];
  socialLinks?: SocialLinks;
}

export interface ChatMessage {
  id: string;
  senderId: string;
  senderName: string;
  text: string;
  timestamp: string;
}

export interface ChatSession {
  id: string;
  participantName: string;
  projectTitle: string;
  lastMessage: string;
  timestamp: string;
  unread: boolean;
  messages: ChatMessage[];
}

export interface Project {
  id: string;
  title: string;
  category: ProjectCategory;
  subCategory?: LivestockSubType | CropType | string;
  amount: number; 
  amountRaised: number; 
  minTicket: number; 
  deadline: string; 
  term: string;
  department: string;
  zone: string;
  guaranteeLabel: string;
  producer: Producer;
  description: string;
  image: string;
  gallery?: string[];
  videoUrl?: string;
  projections: FinancialProjections;
  investors: InvestorMatch[];
  status: 'active' | 'closed';
  
  livestockData?: {
    entryWeight: number;
    purchasePriceKg: number;
    healthCostHead: number;
    targetExitWeight: number;
    salePriceKg: number;
    headCount: number;
    hectares: number;
    pastureType: string;
    mermaRatio?: number;
    durationMonths?: number;
    weaningRate?: number;
  };
  agricultureData?: {
    implCostHa: number;
    hectares: number;
    expectedYield: number; // ton/ha si horti, kg/ha si extensivo
    salePriceUnit: number; // USD/kg si horti, USD/ton si extensivo
    unit: 'kg' | 'ton';
  };
}

export type AppView = 'login' | 'home' | 'muro' | 'producer-registration' | 'producer-dashboard' | 'chat' | 'chat-list' | 'producer-profile' | 'profile-edit' | 'how-it-works' | 'verification' | 'contact' | 'reference-values';
