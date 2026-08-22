import { describe, it, expect } from 'vitest';
import { convertQuantity } from './conversions';

describe("convertQuantity utility",()=>{

    it("correctly converts grams to kilograms",()=>{
        const result = convertQuantity(250,"g","kg");
        expect(result).toBe(0.25);
    })

    it("correctly converts tablespoons to milliliters",()=>{
        const result = convertQuantity(3,"tbsp","ml");
        expect(result).toBe(45);
    })

    it("returns 0 when converting incompatible units",()=>{
        const result = convertQuantity(250,"g","l");
        expect(result).toBe(0);
    })

    it("returns 0 if units are the same",()=>{
        const result = convertQuantity(8,"tsp","tsp");
        expect(result).toBe(0);
    })
})