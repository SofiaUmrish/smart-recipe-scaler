export type Unit = "g" | "kg" | "ml" | "l" | "tsp" | "tbsp" | "pcs";

export interface Ingredient {
    id: string;
    name: string;
    quantity: number;
    unit: Unit;
}

export interface RecipeLayer {
    id: string;
    name: string;
    ingredients: Ingredient[];
}

export interface Recipe {
    id: string;
    name: string;
    originalDiameter?: number;
    originalServings?: number;
    layers: RecipeLayer[];
}