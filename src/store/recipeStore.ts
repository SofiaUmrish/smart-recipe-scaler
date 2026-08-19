import { create } from 'zustand';
import type { RecipeLayer } from '../types/recipe';

interface RecipeState {
    recipeName: string;
    diameter: string;
    servings: string;
    layers: RecipeLayer[];

    targetDiameter: string;
    targetServings: string;
    scaleMode: "diameter" | "serving";

    viewMode: "original" | "scaled";

    setRecipeName: (name: string) => void;
    setDiameter: (diameter: string) => void;
    setServings: (servings: string) => void;

    setTargetDiameter: (targetDiameter: string) => void;
    setTargetServings: (targetServings: string) => void;
    setScaleMode: (scaleMode: "diameter" | "serving") => void;

    setViewMode: (viewMode: "original" | "scaled") => void;

    handleAddLayer: () => void;
    handleDeleteLayer: (id: string) => void;
    handleUpdateLayerName: (id: string, newName: string) => void;
    handleAddIngredient: (layerId: string) => void;
    handleUpdateIngredient: (layerId: string, ingredientId: string, field: string, value: string | number) => void;
    handleDeleteIngredient: (layerId: string, ingredientId: string) => void;


}

export const useRecipeStore = create<RecipeState>((set) => ({
    recipeName: "",
    diameter: "",
    servings: "",
    layers: [],
    targetDiameter: "",
    targetServings: "",
    scaleMode: "diameter",
    viewMode: "original",

    setRecipeName: (name) => set({ recipeName: name }),
    setDiameter: (diameter) => set({ diameter }),
    setServings: (servings) => set({ servings }),

    setTargetDiameter: (targetDiameter) => set({targetDiameter: targetDiameter}),
    setTargetServings: (targetServings) => set({targetServings: targetServings}),
    setScaleMode: (scaleMode) => set({scaleMode: scaleMode}),
    
    setViewMode: (viewMode) => set({viewMode: viewMode}),

    handleAddLayer: () => set((state)=>({
        layers: [
            ...state.layers, 
            {
                id: crypto.randomUUID(),
                name: "New Layer",
                ingredients: []
            }
        ]
    })),

    handleDeleteLayer: (id) => set((state)=>({
        layers: state.layers.filter((layer)=>layer.id!==id)
    })),

    handleUpdateLayerName: (id, newName) => set((state)=>({
        layers: state.layers.map((layer) => 
            layer.id === id ? { ...layer, name: newName } : layer)
            
    })),

    handleAddIngredient: (layerId) => set((state)=>({
        
        layers: state.layers.map((layer) => 

            layer.id === layerId ? 
                { ...layer, 
                        ingredients: [...layer.ingredients, 
                            {
                                id: crypto.randomUUID(),
                                name: "",
                                quantity: 0,
                                unit: "g"
                            }
                        ] } 
                : 
                layer
        )
    })),



    handleUpdateIngredient: (layerId, ingredientId, field, value) => set((state)=>({
        layers: state.layers.map((layer) => 

            layer.id === layerId ? 
                { ...layer, 
                    ingredients: layer.ingredients.map((ingredient)=>
                            ingredient.id===ingredientId ?
                               {...ingredient, [field]: value}
                                :
                                ingredient
                        )
                } 
                : 
                layer
        )
    })),

    handleDeleteIngredient: (layerId, ingredientId) => set((state)=>({
        layers: state.layers.map((layer) => 

            layer.id === layerId ? 
                { ...layer, 
                    ingredients: layer.ingredients.filter((ingredient)=>
                            ingredient.id!==ingredientId
                        )
                } 
                : 
                layer
        )
            
    })),

}))