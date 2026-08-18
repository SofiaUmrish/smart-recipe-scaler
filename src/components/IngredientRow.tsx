import type { Ingredient } from '../types/recipe';

interface IngredientRowProps{
    ingredient: Ingredient;
    onUpdate: (
        field: "name" | "quantity" | "unit",
        value: string | number
    ) => void;

    onDelete: () => void;
}

export default function IngredientRow({ ingredient, onUpdate, onDelete }: IngredientRowProps){

    return(
        <div className="flex flex-wrap sm:flex-nowrap gap-2 sm:gap-3 items-center mb-3">

            <input type="text" 
                value={ingredient.name}
                placeholder="E.g. Sugar"
                className="w-full sm:w-auto flex-1 bg-stone-500 border border-stone-500 rounded-xl px-3 py-2 text-amber-100 placeholder-stone-400 focus:outline-none focus:ring-1 focus:ring-amber-300 transition-colors"
                onChange={(e) =>
                    onUpdate("name", e.target.value)
                }
            />

            <input type="number" 
                value={ingredient.quantity || ""}
                placeholder="100"
                min="0"
                className="w-20 bg-stone-500 border border-stone-500 rounded-xl px-3 py-2 text-amber-100 placeholder-stone-400 focus:outline-none focus:ring-1 focus:ring-amber-300 transition-colors"
                onChange={(e) =>
                    onUpdate("quantity", e.target.value)
                }
           />

            <select 
                value={ingredient.unit}
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
            <button 
                className="text-amber-100 rounded-md hover:bg-amber-100 hover:text-red-500 transition-colors font-bold text-xl px-2 py-1"
                title="Delete ingredient"
                onClick={onDelete}
            >
                ✘
            </button>

        </div>
    )
}