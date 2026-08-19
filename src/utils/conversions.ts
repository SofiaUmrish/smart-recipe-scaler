import type { Unit } from '../types/recipe';

const conversionRates: Record<Unit, number | null> = {
    g: 1,
    kg: 1000,
    ml: 1,
    l: 1000,
    tsp: 5,   // 1 tsp = 5 ml
    tbsp: 15, // 1 tbsp = 15 мл
    pcs: null
};

const canConvert = (fromUnit: Unit, toUnit: Unit): boolean => {
    const weightUnits = ["g", "kg"];
    const volumeUnits = ["ml", "l", "tsp", "tbsp"];

    if(weightUnits.includes(fromUnit)&&weightUnits.includes(toUnit)  ||
    volumeUnits.includes(fromUnit)&&volumeUnits.includes(toUnit)){
        return true
    }

    return false
}

export const convertQuantity = (quantity: number, fromUnit: Unit, toUnit: Unit) => {
    if(fromUnit===toUnit || !canConvert(fromUnit, toUnit)){
        return 0
    }
    const fromConversionRate = conversionRates[fromUnit];
    const toConversionRate = conversionRates[toUnit];

    return (quantity * fromConversionRate) / toConversionRate


}