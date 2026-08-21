import { useState, useEffect } from 'react';
import type { RecipeLayer } from '../types/recipe';

interface NutritionCalculatorProps{
    layers: RecipeLayer[];
    servings: string;
    onBack: () => void;
}

interface NutritionResult {
    calories: number;
    protein_g: number;
    fat_total_g: number;
    carbohydrates_total_g: number;
    sugar_g: number;
    fiber_g: number;
    fat_saturated_g: number;
    cholesterol_mg: number;
}

export default function NutritionCalculator({layers, servings, onBack }: NutritionCalculatorProps){

    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");
    const [nutritionData, setNutritionData] = useState<NutritionResult | null>(null);

    const API_KEY = import.meta.env.VITE_CALORIE_NINJAS_KEY;

    const fetchNutrition = async () =>{

        setIsLoading(true);
        setError("");

        try{
            let queryText ="" 
            
            layers.map((layer)=>{
                layer.ingredients.map((ingredient)=> {

                    queryText +=`${ingredient.name} ${ingredient.quantity} ${ingredient.unit}, `
                })
            })

            const res = await fetch(`https://api.calorieninjas.com/v1/nutrition?query=${queryText}`,
            {
                headers: { 'X-Api-Key': API_KEY }
            })

            const data = await res.json()

            let totalCalories = 0;
            let totalProtein = 0;
            let totalFat = 0;
            let totalCarbs = 0;
            let totalSugar = 0;
            let totalFiber = 0;
            let totalSatFat = 0;
            let totalCholesterol = 0;

            data.items.forEach((item)=>{
                totalCalories += item.calories;
                totalProtein += item.protein_g;
                totalFat += item.fat_total_g;
                totalCarbs += item.carbohydrates_total_g;
                totalSugar += item.sugar_g;
                totalFiber += item.fiber_g;
                totalSatFat += item.fat_saturated_g;
                totalCholesterol += item.cholesterol_mg;
            })

            setNutritionData({
                calories: totalCalories,
                protein_g: totalProtein,
                fat_total_g: totalFat,
                carbohydrates_total_g: totalCarbs,
                sugar_g: totalSugar,
                fiber_g: totalFiber,
                fat_saturated_g: totalSatFat,
                cholesterol_mg: totalCholesterol,
            });


        }catch(err){

            setError("Failed to calculate nutrition. Please try again.");

        }finally{

            setIsLoading(false);

        }


    }

    useEffect(()=>{
        fetchNutrition()
    },[])

    return(
        <div className="max-w-4xl mx-4 md:mx-auto bg-stone-600 rounded-3xl p-6 sm:p-8 border border-stone-500 shadow-xl">
            <button 
                onClick={onBack}
                className="mb-6 px-4 py-2 bg-stone-700 hover:bg-stone-800 text-stone-300 hover:text-amber-200 rounded-xl text-sm font-bold transition-colors inline-flex items-center gap-2"
            >
                ← Back to Recipe
            </button>

            <div className="text-center mb-8">
                <h2 className="text-3xl font-black text-amber-200 mb-2">Nutrition Facts</h2>
                <p className="text-stone-400 text-sm">
                    Estimated total for the entire dish
                </p>
            </div>

            {isLoading && (
                <div className="flex flex-col items-center justify-center py-10 animate-pulse">
                    <p className="text-amber-200 font-bold">Calculating macros...</p>
                </div>
            )}

            {error && !isLoading && (
                <div className="bg-red-500/10 border border-red-500/30 rounded-2xl p-6 text-center">
                    <p className="text-red-400 font-bold mb-4">{error}</p>
                    <button 
                        onClick={fetchNutrition}
                        className="px-6 py-2 bg-stone-700 hover:bg-stone-800 text-stone-300 rounded-xl font-bold transition-colors"
                    >
                        Try Again
                    </button>
                </div>
            )}

            {nutritionData && !isLoading && !error && (
                <div>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                        <div className="bg-stone-700 p-5 rounded-2xl border border-stone-500 text-center hover:border-amber-200/50 transition-colors">
                            <p className="text-xs font-bold uppercase tracking-wider text-stone-400 mb-1">Calories</p>
                            <p className="text-3xl font-black text-amber-200">
                                {Math.round(nutritionData.calories)}
                            </p>
                            <p className="text-xs text-stone-500 mt-1">kcal</p>
                        </div>

                        <div className="bg-stone-700 p-5 rounded-2xl border border-stone-500 text-center hover:border-amber-200/50 transition-colors">
                            <p className="text-xs font-bold uppercase tracking-wider text-stone-400 mb-1">Protein</p>
                            <p className="text-3xl font-black text-amber-200">
                                {Math.round(nutritionData.protein_g)}
                            </p>
                            <p className="text-xs text-stone-500 mt-1">g</p>
                        </div>

                        <div className="bg-stone-700 p-5 rounded-2xl border border-stone-500 text-center hover:border-amber-200/50 transition-colors">
                            <p className="text-xs font-bold uppercase tracking-wider text-stone-400 mb-1">Fat</p>
                            <p className="text-3xl font-black text-amber-200">
                                {Math.round(nutritionData.fat_total_g)}
                            </p>
                            <p className="text-xs text-stone-500 mt-1">g</p>
                        </div>

                        <div className="bg-stone-700 p-5 rounded-2xl border border-stone-500 text-center hover:border-amber-200/50 transition-colors">
                            <p className="text-xs font-bold uppercase tracking-wider text-stone-400 mb-1">Carbs</p>
                            <p className="text-3xl font-black text-amber-200">
                                {Math.round(nutritionData.carbohydrates_total_g)}
                            </p>
                            <p className="text-xs text-stone-500 mt-1">g</p>
                        </div>
                    </div>
                    <div className="mt-6 bg-stone-700/50 rounded-2xl p-5 border border-stone-500/50">
                        <h4 className="text-sm font-bold text-stone-400 mb-4 uppercase tracking-wider text-left">Detailed Breakdown</h4>
                        
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-sm">
                            <div className="flex flex-col">
                                <span className="text-stone-400">Sugar</span>
                                <span className="font-bold text-amber-100">{Math.round(nutritionData.sugar_g)} g</span>
                            </div>
                            <div className="flex flex-col">
                                <span className="text-stone-400">Fiber</span>
                                <span className="font-bold text-amber-100">{Math.round(nutritionData.fiber_g)} g</span>
                            </div>
                            <div className="flex flex-col">
                                <span className="text-stone-400">Saturated Fat</span>
                                <span className="font-bold text-amber-100">{Math.round(nutritionData.fat_saturated_g)} g</span>
                            </div>
                            <div className="flex flex-col">
                                <span className="text-stone-400">Cholesterol</span>
                                <span className="font-bold text-amber-100">{Math.round(nutritionData.cholesterol_mg)} mg</span>
                            </div>
                        </div>
                    </div>
                </div>
            )}
            
            {nutritionData && servings && Number(servings) > 0 && !isLoading && !error && (
                <div className="mt-6 text-center border-t border-stone-500 pt-6">
                    <p className="text-sm font-bold text-stone-400">
                        Per serving (1 of {servings}): <span className="text-amber-200">{Math.round(nutritionData.calories / Number(servings))} kcal</span>
                    </p>
                </div>
            )}

        </div>
    );
}