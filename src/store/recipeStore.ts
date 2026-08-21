import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { RecipeLayer, Recipe} from '../types/recipe';

interface RecipeState {

    currentRecipeId: string | null;
    recipeName: string;
    diameter: string;
    servings: string;
    layers: RecipeLayer[];

    targetDiameter: string;
    targetServings: string;
    scaleMode: "diameter" | "serving";

    viewMode: "original" | "scaled";

    savedRecipes: Recipe[];

    saveCurrentRecipe: () => void;
    loadRecipe: (recipe: Recipe) => void;
    deleteRecipe: (id: string) => void;
    resetForm: () => void;

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

export const useRecipeStore = create<RecipeState>()(persist ((set, get)=>({
    
            currentRecipeId: null,
            recipeName: "",
            diameter: "",
            servings: "",
            layers: [],
            targetDiameter: "",
            targetServings: "",
            scaleMode: "diameter",
            viewMode: "original",
            savedRecipes: [],

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

            saveCurrentRecipe: () => {

                const state = get();

                if(state.currentRecipeId){
                    set({
                        savedRecipes: state.savedRecipes.map((recipe)=>
                            recipe.id===state.currentRecipeId ? 
                            {
                                ...recipe,
                                name: state.recipeName,
                                originalDiameter: Number(state.diameter),
                                originalServings: Number(state.servings),
                                layers: state.layers
                            }
                            :
                            recipe
                        ),

                        currentRecipeId: null,
                        recipeName: "",
                        diameter: "",
                        servings: "",
                        layers: []
                    })
                }else {
                    const newRecipe = {
                        id: crypto.randomUUID(),
                        name: state.recipeName,
                        originalDiameter: Number(state.diameter),
                        originalServings: Number(state.servings),
                        layers: state.layers,
                        createdAt: Date.now()
                    };
            
                    set({
                        savedRecipes: [...state.savedRecipes, newRecipe],
                        
                        currentRecipeId: null,
                        recipeName: "",
                        diameter: "",
                        servings: "",
                        layers: []
                    });
                }

            },

            loadRecipe: (recipe) => set({
                currentRecipeId: recipe.id,
                recipeName: recipe.name,
                diameter: recipe.originalDiameter ? recipe.originalDiameter.toString() : "",
                servings: recipe.originalServings ? recipe.originalServings.toString() : "",
                layers: recipe.layers,
                viewMode: "original",
                scaleMode: "diameter"
            }),
            
            deleteRecipe: (id) => set((state) => ({
                savedRecipes: state.savedRecipes.filter(
                    (recipe) => recipe.id !== id
                )
            })),

            resetForm: () => set({
                currentRecipeId: null,
                recipeName: "",
                diameter: "",
                servings: "",
                layers: [],
                viewMode: "original",
                scaleMode: "diameter"
            }),
            
            }),

    {
        name: "smart-recipe-storage",
        partialize: (state) => ({
            savedRecipes: state.savedRecipes
        }),
    }
))