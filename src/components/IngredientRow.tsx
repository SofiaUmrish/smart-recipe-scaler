import type { Ingredient } from '../types/recipe';
import { useRecipeScaler } from '../hooks/useRecipeScaler';

interface IngredientRowProps{
    ingredient: Ingredient;
    onUpdate: (
        field: "name" | "quantity" | "unit",
        value: string | number
    ) => void;

    onDelete: () => void;

    viewMode:"original" | "scaled";
}

export default function IngredientRow({ ingredient, onUpdate, onDelete, viewMode }: IngredientRowProps){
    const scaleFactor = useRecipeScaler();
    const displayQuantity = viewMode==="scaled" ?
    (ingredient.quantity * scaleFactor).toFixed(0) : ingredient.quantity;

    return(
        <div className="flex flex-wrap sm:flex-nowrap gap-2 sm:gap-3 items-center mb-3">

            <input type="text" 
                value={ingredient.name}
                placeholder="E.g. Sugar"
                disabled={viewMode === "scaled"}
                className="w-full sm:w-auto flex-1 bg-stone-500 border border-stone-500 rounded-xl px-3 py-2 text-amber-100 placeholder-stone-400 focus:outline-none focus:ring-1 focus:ring-amber-300 transition-colors"
                onChange={(e) =>
                    onUpdate("name", e.target.value)
                }
            />

            <input type="number" 
                value={displayQuantity || ""}
                placeholder="100"
                disabled={viewMode === "scaled"}
                min="0"
                className="w-20 bg-stone-500 border border-stone-500 rounded-xl px-3 py-2 text-amber-100 placeholder-stone-400 focus:outline-none focus:ring-1 focus:ring-amber-300 transition-colors"
                onChange={(e) =>
                    onUpdate("quantity", Number(e.target.value))
                }
           />

            <select 
                value={ingredient.unit}
                disabled={viewMode === "scaled"}
                className="w-20 bg-stone-500 border border-stone-500 rounded-xl px-2 py-2 text-sm text-amber-100 focus:outline-none focus:ring-1 focus:ring-amber-300 transition-colors cursor-pointer"
                onChange={(e) =>
                    onUpdate("unit", e.target.value)
                }
            >
                <option value="g">g</option>
                <option value="kg">kg</option>
                <option value="ml">ml</option>
                <option value="l">l</option>
                <option value="tsp">tsp</option>
                <option value="tbsp">tbsp</option>
                <option value="pcs">pcs</option>
            </select>
            {viewMode === "original" && 
                (<button 
                    className="text-amber-100 rounded-md hover:bg-amber-100 hover:text-red-500 transition-colors font-bold text-xl px-2 py-1"
                    title="Delete ingredient"
                    onClick={onDelete}
                >
                    ✘
                </button>)
            }

        </div>
    )
}