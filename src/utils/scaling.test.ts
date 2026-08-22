import { describe, it, expect } from 'vitest';
import { calculateScaleFactor } from './scaling';

describe("convertQuantity utility",()=>{

    it("correctly scales up based on diameter",()=>{
        const result = calculateScaleFactor('diameter', 18, 36, 0, 0);
        expect(result).toBe(4);
    })

    it("correctly scales down based on diameter",()=>{
        const result = calculateScaleFactor('diameter', 20, 10, 0, 0);
        expect(result).toBe(0.25);
    })

    it("correctly scales up based on servings",()=>{
        const result = calculateScaleFactor('serving', 0, 0, 8, 16);
        expect(result).toBe(2);
    })

    it("correctly scales down based on servings",()=>{
        const result = calculateScaleFactor('serving', 0, 0, 8, 4);
        expect(result).toBe(0.5);
    })
})