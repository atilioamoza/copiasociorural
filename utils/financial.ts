
import { MarketStatus } from '../types';

/**
 * MATRIZ TÉCNICA URUGUAY 2026 - SOCIORURAL
 * Fuente: Referencias MGAP / INAC / ACG Calibradas para 2026 (Actual).
 */
export const LIVESTOCK_DB: any = {
  'Terneros <140kg': { refPrice: 3.85, type: 'ternero', refW: 120, bioMax: 480, coeBase: 20.8 },
  'Terneros 140-180kg': { refPrice: 3.55, type: 'ternero', refW: 160, bioMax: 520, coeBase: 20.8 },
  'Terneros >180kg': { refPrice: 3.30, type: 'ternero', refW: 210, bioMax: 550, coeBase: 20.8 },
  'Novillos 1-2 años': { refPrice: 3.20, type: 'novillo', refW: 300, bioMax: 650, coeBase: 22.0 },
  'Novillos 2-3 años': { refPrice: 3.30, type: 'novillo', refW: 400, bioMax: 720, coeBase: 22.0 },
  'Novillos +3 años': { refPrice: 3.10, type: 'novillo', refW: 500, bioMax: 780, coeBase: 22.0 },
  'Terneras': { refPrice: 3.31, type: 'ternero', refW: 160, bioMax: 480, coeBase: 20.8 },
  'Vaquillonas 1-2 años': { refPrice: 3.00, type: 'novillo', refW: 280, bioMax: 520, coeBase: 22.0 },
  'Vaquillonas +2 años': { refPrice: 2.90, type: 'novillo', refW: 380, bioMax: 550, coeBase: 22.0 },
  'Vaca de Invernada': { refPrice: 2.30, type: 'vaca_invernada', refW: 380, bioMax: 600, coeBase: 50.0 },
  'Piezas de Cría': { perHead: true, refPrice: 620, type: 'cria', refW: 350, bioMax: 600, coeBase: 19.1 },
  'Vientres Preñados': { perHead: true, refPrice: 850, type: 'cria', refW: 450, bioMax: 650, coeBase: 19.1 },
  'Vientres Entorados': { perHead: true, refPrice: 800, type: 'cria', refW: 420, bioMax: 620, coeBase: 19.1 },
  'Ovinos': { refPrice: 2.10, type: 'ovino', refW: 45, bioMax: 60, coeBase: 12.0 },
  'Otros': { refPrice: 0, type: 'otro', refW: 0, bioMax: 9999, coeBase: 0 },
};

/**
 * BASE DE DATOS MÓDULO AGRÍCOLA (AGRO_DB)
 * Intervalos de confianza 95% y rendimientos sugeridos.
 */
export const AGRO_DB: any = {
  // Hortícolas (Precio USD/kg, Rendimiento ton/ha)
  'Tomate': { group: 'Pequeños', unit: 'kg', priceRange: [1.29, 1.97], yieldRange: [40, 80], costRange: [8000, 15000], yieldUnit: 'ton/ha' },
  'Morrón': { group: 'Pequeños', unit: 'kg', priceRange: [1.54, 1.94], yieldRange: [30, 60], costRange: [7000, 12000], yieldUnit: 'ton/ha' },
  'Lechuga': { group: 'Pequeños', unit: 'kg', priceRange: [0.96, 1.41], yieldRange: [20, 40], costRange: [4000, 8000], yieldUnit: 'ton/ha' },
  'Cebolla': { group: 'Pequeños', unit: 'kg', priceRange: [1.15, 1.51], yieldRange: [25, 45], costRange: [5000, 9000], yieldUnit: 'ton/ha' },
  'Zanahoria': { group: 'Pequeños', unit: 'kg', priceRange: [0.89, 1.23], yieldRange: [30, 50], costRange: [4500, 8000], yieldUnit: 'ton/ha' },
  'Zapallito': { group: 'Pequeños', unit: 'kg', priceRange: [1.24, 1.68], yieldRange: [20, 40], costRange: [4000, 7000], yieldUnit: 'ton/ha' },
  'Papa': { group: 'Pequeños', unit: 'kg', priceRange: [0.80, 1.17], yieldRange: [20, 35], costRange: [3500, 6500], yieldUnit: 'ton/ha' },
  'Ajo': { group: 'Pequeños', unit: 'kg', priceRange: [2.47, 3.35], yieldRange: [8, 15], costRange: [6000, 10000], yieldUnit: 'ton/ha' },
  'Remolacha': { group: 'Pequeños', unit: 'kg', priceRange: [0.80, 1.19], yieldRange: [30, 50], costRange: [4000, 7000], yieldUnit: 'ton/ha' },
  'Acelga/Esp.': { group: 'Pequeños', unit: 'kg', priceRange: [0.78, 1.13], yieldRange: [15, 30], costRange: [3000, 6000], yieldUnit: 'ton/ha' },
  'Pepino': { group: 'Pequeños', unit: 'kg', priceRange: [0.80, 1.50], yieldRange: [30, 60], costRange: [5000, 10000], yieldUnit: 'ton/ha' },
  'Berenjena': { group: 'Pequeños', unit: 'kg', priceRange: [0.90, 1.60], yieldRange: [20, 45], costRange: [6000, 11000], yieldUnit: 'ton/ha' },
  'Frutilla': { group: 'Pequeños', unit: 'kg', priceRange: [2.00, 3.50], yieldRange: [15, 30], costRange: [10000, 18000], yieldUnit: 'ton/ha' },
  'Espinaca': { group: 'Pequeños', unit: 'kg', priceRange: [0.80, 1.40], yieldRange: [15, 35], costRange: [3500, 7000], yieldUnit: 'ton/ha' },
  'Zapallo (Kabutiá/común)': { group: 'Pequeños', unit: 'kg', priceRange: [0.40, 0.90], yieldRange: [25, 50], costRange: [4000, 8000], yieldUnit: 'ton/ha' },
  'Chaucha (judía verde)': { group: 'Pequeños', unit: 'kg', priceRange: [1.00, 1.80], yieldRange: [10, 25], costRange: [4500, 8500], yieldUnit: 'ton/ha' },
  'Brócoli': { group: 'Pequeños', unit: 'kg', priceRange: [0.90, 1.50], yieldRange: [15, 30], costRange: [5000, 9000], yieldUnit: 'ton/ha' },
  
  // Extensivos (Precio USD/ton, Rendimiento kg/ha)
  'Soja': { group: 'Grandes', unit: 'ton', priceRange: [348.81, 444.63], yieldRange: [2800, 3200], costRange: [600, 800], yieldUnit: 'kg/ha' },
  'Trigo': { group: 'Grandes', unit: 'ton', priceRange: [180.40, 208.49], yieldRange: [4000, 5000], costRange: [500, 700], yieldUnit: 'kg/ha' },
  'Cebada': { group: 'Grandes', unit: 'ton', priceRange: [175.50, 199.50], yieldRange: [4000, 4500], costRange: [500, 700], yieldUnit: 'kg/ha' },
  'Maíz': { group: 'Grandes', unit: 'ton', priceRange: [193.13, 227.42], yieldRange: [7000, 9000], costRange: [800, 1200], yieldUnit: 'kg/ha' },
  'Colza': { group: 'Grandes', unit: 'ton', priceRange: [431.67, 491.44], yieldRange: [1700, 2000], costRange: [600, 900], yieldUnit: 'kg/ha' },
  'Arroz': { group: 'Grandes', unit: 'ton', priceRange: [382.80, 537.42], yieldRange: [8000, 9500], costRange: [1500, 2500], yieldUnit: 'kg/ha' },
  'Sorgo': { group: 'Grandes', unit: 'ton', priceRange: [186.52, 227.93], yieldRange: [5000, 7000], costRange: [500, 800], yieldUnit: 'kg/ha' },
  'Avena': { group: 'Grandes', unit: 'ton', priceRange: [175.50, 199.50], yieldRange: [3000, 5000], costRange: [400, 600], yieldUnit: 'kg/ha' },
  'Girasol': { group: 'Grandes', unit: 'ton', priceRange: [392.49, 456.40], yieldRange: [2000, 2500], costRange: [600, 900], yieldUnit: 'kg/ha' },
  'Caña Azúcar': { group: 'Grandes', unit: 'ton', priceRange: [39.15, 47.41], yieldRange: [60000, 90000], costRange: [1200, 2000], yieldUnit: 'kg/ha' },
  'Lino': { group: 'Grandes', unit: 'ton', priceRange: [423.95, 496.05], yieldRange: [1000, 1800], costRange: [600, 900], yieldUnit: 'kg/ha' },
  'Lupino': { group: 'Grandes', unit: 'ton', priceRange: [380.04, 462.18], yieldRange: [1500, 2500], costRange: [500, 800], yieldUnit: 'kg/ha' },
  'Chía': { group: 'Grandes', unit: 'ton', priceRange: [897.51, 1091.38], yieldRange: [800, 1500], costRange: [800, 1200], yieldUnit: 'kg/ha' },
};

/**
 * LÓGICA DE CÁLCULO AGRÍCOLA
 */
export function calculateAgroRevenue(cropName: string, hectares: number, yieldValue: number, priceValue: number): number {
  const meta = AGRO_DB[cropName];
  if (!meta) return 0;

  if (meta.unit === 'kg') {
    // Hortícolas: Ingreso Bruto = Hectáreas * (Rendimiento_ton * 1000) * Precio_kg
    return hectares * (yieldValue * 1000) * priceValue;
  } else {
    // Extensivos: Ingreso Bruto = Hectáreas * (Rendimiento_kg / 1000) * Precio_ton
    return hectares * (yieldValue / 1000) * priceValue;
  }
}

export function validateAgroParams(cropName: string, yieldValue: number, priceValue: number, costValue: number) {
  const meta = AGRO_DB[cropName];
  if (!meta) return { status: 'green' as MarketStatus, msg: '' };

  const [minP, maxP] = meta.priceRange;
  const [minY, maxY] = meta.yieldRange;
  const [minC, maxC] = meta.costRange;

  if (priceValue > maxP * 1.15) return { status: 'yellow' as MarketStatus, msg: 'Precio de venta superior al rango histórico.' };
  if (yieldValue > maxY * 1.2) return { status: 'red' as MarketStatus, msg: 'Rendimiento excede potencial productivo promedio.' };
  if (costValue < minC * 0.8) return { status: 'yellow' as MarketStatus, msg: 'Costo de implantación inusualmente bajo.' };

  return { status: 'green' as MarketStatus, msg: '' };
}

export const GASTOS_COMPRA = 0.04; // 4%
export const GASTOS_VENTA = 0.055; // 5.5%

export const MARKET_PROJECTIONS_2027: Record<string, number> = {
  'Novillo gordo': 5.55,
  'Vaca gorda': 5.25,
  'Ternero': 3.65,
  'Vaca de invernada': 2.40
};

export const PASTURE_GDP: Record<string, number> = {
  'Campo Natural': 0.400,
  'Pasturas Mejoradas': 0.700,
  'Suplementación/Confinamiento': 1.050
};

export const UA_FACTORS: Record<string, number> = {
  ternero: 0.45,
  novillo: 0.65,
  vaca_invernada: 1.00,
  cria: 1.00,
  ovino: 0.15,
  otro: 1.00
};

export const CARGA_MAX_CN = 1.10;

export function getUAFactor(subCategory: string): number {
  const meta = LIVESTOCK_DB[subCategory];
  if (!meta) return 1.0;
  return UA_FACTORS[meta.type] || 1.0;
}

export function calculateAnimalLoadUA(headCount: number, subCategory: string, hectares: number): number {
  if (hectares <= 0) return 0;
  return (headCount * getUAFactor(subCategory)) / hectares;
}

export function validateAnimalLoad(headCount: number, subCategory: string, hectares: number, pastureType: string) {
  if (subCategory === 'Otros') return { isValid: true, loadUA: 0, msg: '' };
  const loadUA = calculateAnimalLoadUA(headCount, subCategory, hectares);
  if (pastureType === 'Campo Natural' && loadUA > CARGA_MAX_CN) {
    return {
      isValid: false,
      loadUA,
      msg: `Carga de ${loadUA.toFixed(2)} UA/ha supera el límite de Campo Natural (1.10).`
    };
  }
  return { isValid: true, loadUA, msg: '' };
}

/**
 * VALIDACIÓN DE PRECIO DE VENTA GANADERO (SEMÁFORO 2027)
 */
export function validateSalePrice(subCategory: string, userPrice: number, livestockData?: any) {
  if (subCategory === 'Otros') return { status: 'green' as MarketStatus, msg: '' };
  
  const meta = LIVESTOCK_DB[subCategory];
  if (meta?.type === 'vaca_invernada') return { status: 'green' as MarketStatus, msg: '' };
  
  let projectionKey = 'Novillo gordo';

  if (meta?.type === 'ternero') projectionKey = 'Ternero';
  else if (meta?.type === 'vaca_invernada') projectionKey = 'Vaca de invernada';
  else if (subCategory.toLowerCase().includes('vaca') || subCategory.toLowerCase().includes('vaquillona')) projectionKey = 'Vaca gorda';
  else projectionKey = 'Novillo gordo';

  const ref = MARKET_PROJECTIONS_2027[projectionKey] || 5.0;
  
  if (userPrice > ref * 1.15) {
    return { 
      status: 'yellow' as MarketStatus, 
      msg: `Precio superior al promedio proyectado 2027 ($${ref}).` 
    };
  }
  return { status: 'green' as MarketStatus, msg: '' };
}

export function validatePurchasePrice(subCategory: string, price: number) {
  if (subCategory === 'Otros') return { status: 'green' as MarketStatus, msg: '' };
  const meta = LIVESTOCK_DB[subCategory];
  if (!meta) return { status: 'green' as MarketStatus, msg: '' };
  const ref = meta.refPrice || 3.0;
  if (price > ref * 1.3) return { status: 'red' as MarketStatus, msg: 'Precio de compra excede parámetros razonables.' };
  return { status: 'green' as MarketStatus, msg: '' };
}

export function validateProductionPlan(subCategory: string, entryW: number, months: number, exitW: number, pasture: string) {
  if (subCategory === 'Otros') return { isValid: true, msg: '' };
  const days = months * 30;
  if (days <= 0) return { isValid: false, msg: 'Plazo inválido.' };
  const dailyGain = (exitW - entryW) / days;
  const maxPotential = PASTURE_GDP[pasture] || 0.4;
  if (dailyGain > maxPotential * 1.5) return { isValid: false, msg: `GDP de ${dailyGain.toFixed(2)}kg excede el potencial biológico.` };
  return { isValid: true, msg: '' };
}

export function validateProjectReasonableness(project: any) {
  if (project.category === 'livestock' && project.livestockData) {
    const { subCategory, livestockData } = project;
    const purchaseVal = validatePurchasePrice(subCategory, livestockData.purchasePriceKg);
    const saleVal = validateSalePrice(subCategory, livestockData.salePriceKg, livestockData);
    const loadVal = validateAnimalLoad(livestockData.headCount, subCategory, livestockData.hectares, livestockData.pastureType);
    
    if (purchaseVal.status === 'red' || !loadVal.isValid) {
      return { isReasonable: false, msg: purchaseVal.msg || loadVal.msg };
    }
    if (purchaseVal.status === 'yellow' || saleVal.status === 'yellow') {
      return { isReasonable: true, warning: purchaseVal.msg || saleVal.msg };
    }
  } else if (project.category === 'agriculture' && project.agricultureData) {
    const { subCategory, agricultureData } = project;
    const agroVal = validateAgroParams(subCategory, agricultureData.expectedYield, agricultureData.salePriceUnit, agricultureData.implCostHa);
    if (agroVal.status === 'red') return { isReasonable: false, msg: agroVal.msg };
    if (agroVal.status === 'yellow') return { isReasonable: true, warning: agroVal.msg };
  }
  return { isReasonable: true };
}

export function calculateProjectFinancials(project: any) {
  let haciendaInvestment = 0;
  let grossIncome = 0;
  let status: MarketStatus = 'green';

  if (project.category === 'livestock' && project.livestockData) {
    const { headCount, entryWeight, purchasePriceKg, targetExitWeight, salePriceKg } = project.livestockData;
    const meta = LIVESTOCK_DB[project.subCategory];
    
    if (meta?.type === 'cria') {
      return calculateBreedingBusiness({ 
        headCount, 
        entryWeight, 
        purchasePrice: project.livestockData.purchasePriceKg, 
        salePriceTernero: salePriceKg, 
        salePriceVaca: 2.40,
        targetExitWeight,
        weaningRate: project.livestockData.weaningRate
      });
    } else {
      haciendaInvestment = headCount * entryWeight * purchasePriceKg;
      grossIncome = headCount * targetExitWeight * salePriceKg;
    }
    status = validateSalePrice(project.subCategory, salePriceKg, project.livestockData).status;
  } else if (project.category === 'agriculture' && project.agricultureData) {
    const { hectares, implCostHa, expectedYield, salePriceUnit } = project.agricultureData;
    haciendaInvestment = hectares * implCostHa;
    grossIncome = Math.round(calculateAgroRevenue(project.subCategory, hectares, expectedYield, salePriceUnit));
    status = validateAgroParams(project.subCategory, expectedYield, salePriceUnit, implCostHa).status;
  }

  return {
    amount: Math.round(haciendaInvestment * 1.05),
    initialInvestment: Math.round(haciendaInvestment),
    expectedExitValue: Math.round(grossIncome),
    grossMargin: Math.round(grossIncome - haciendaInvestment),
    marketStatus: status
  };
}

export function calculateBreedingBusiness(data: any) {
  const { headCount, entryWeight, purchasePrice, salePriceTernero, salePriceVaca, targetExitWeight, weaningRate } = data;
  const finalEntryWeight = entryWeight || 380;
  const finalExitWeight = targetExitWeight || 150;
  const finalWeaningRate = (weaningRate || 95) / 100;
  
  // Ingreso por Terneros: (cabezas * tasaDestete) * pesoSalidaTernero * precioSalidaTernero
  const ingresoTerneros = Math.round((headCount * finalWeaningRate) * finalExitWeight * salePriceTernero);
  
  // Valor Stock Vacas: cabezas * pesoEntrada * precioSalidaVaca
  const valorStockVacas = Math.round(headCount * finalEntryWeight * salePriceVaca);

  const expectedExitValue = ingresoTerneros + valorStockVacas;
  const initialInvestment = headCount * purchasePrice;

  return {
    initialInvestment: Math.round(initialInvestment),
    expectedExitValue: Math.round(expectedExitValue),
    grossMargin: Math.round(expectedExitValue - initialInvestment),
    amount: Math.round(initialInvestment),
    marketStatus: 'green' as MarketStatus,
    breedingBreakdown: {
      stockTerneros: ingresoTerneros,
      stockVacas: valorStockVacas
    }
  };
}

export { calculateAnimalLoadUA as calculateAnimalLoad };
