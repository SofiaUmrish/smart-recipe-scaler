import { useState } from "react"
import type { RecipeLayer } from '../types/recipe';
import IngredientRow from '../components/IngredientRow';

export default function RecipeBuilder(){
    const [recipeName, setRecipeName] = useState("");
    const [diameter, setDiameter] = useState("");
    const [servings, setServings] = useState("");
    const [layers, setLayers] = useState<RecipeLayer[]>([]);

    const handleAddLayer = ()=>{
        setLayers([
            ...layers, 
            {
                id: crypto.randomUUID(),
                name: "New Layer",
                ingredients: []
            }]
        )
    }
    
    const handleDeleteLayer = (id: string) => {
        setLayers(layers.filter((layer)=>layer.id!==id))
    }
    
    const handleUpdateLayerName = (id: string, newName: string) => {
        setLayers(layers.map((layer) => 
            layer.id === id ? { ...layer, name: newName } : layer
        ));
    };

    const handleAddIngredient = (layerId: string)=>{
        setLayers(layers.map((layer) => 

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
        ));
    }
    const handleUpdateIngredient = (layerId: string, ingredientId: string, field: string, value: string | number)=>{
        setLayers(layers.map((layer) => 

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
        ));
    }

    const handleDeleteIngredient = ( layerId: string, ingredientId: string) => {
        
        setLayers(layers.map((layer) => 

            layer.id === layerId ? 
                { ...layer, 
                    ingredients: layer.ingredients.filter((ingredient)=>
                            ingredient.id!==ingredientId
                        )
                } 
                : 
                layer
        ));
    }

    return(
        <div className=" max-w-3xl mx-auto bg-amber-200 rounded-3xl shadow-lg border border-stone-200 mt-8 overflow-hidden">
            
            <div className="p-6 sm:p-8">
                <div className="grid gap-6 mb-8">
                    <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-stone-500 mb-2">
                            Recipe name
                        </label>
                        <input
                            type="text"
                            value={recipeName}
                            onChange={(e)=>setRecipeName(e.target.value)}
                            placeholder="Chocolate Cake..."
                            className="w-full bg-stone-500 border-2 border-stone-600 rounded-xl px-4 py-3 text-amber-200 placeholder-amber-50/50 focus:ring-2 focus:ring-stone-400 focus:border-amber-200 focus:outline-none transition-colors"
                        />
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-xs font-bold uppercase tracking-wider text-stone-500 mb-2">
                                Original diameter
                            </label>
                            <input
                                type="number"
                                value={diameter}
                                onChange={(e)=>setDiameter(e.target.value)}
                                placeholder="18"
                                min="0"
                                className=" w-full bg-stone-500 border-2 border-stone-600 rounded-xl px-4 py-3 text-amber-200 placeholder-amber-50/50 focus:ring-2 focus:ring-stone-400 focus:border-amber-200 focus:outline-none transition-colors"
                                />
                        </div>
                        <div>
                            <label className="block text-xs font-bold uppercase tracking-wider text-stone-500 mb-2">
                                Servings
                            </label>
                            <input
                                type="number"
                                value={servings}
                                onChange={(e)=>setServings(e.target.value)}
                                placeholder="8"
                                min="0"
                                className="w-full bg-stone-500 border-2 border-stone-600 rounded-xl px-4 py-3 text-amber-200 placeholder-amber-50/50 focus:ring-2 focus:ring-stone-400 focus:border-amber-200 focus:outline-none transition-colors"
                                />
                        </div>
                    </div>
                </div>

                <div className="border-t border-stone-500 pt-8">
                    <div className="flex justify-between items-center mb-6">
                        <h3 className="text-xl font-bold text-stone-800">Layers</h3>
                        
                        {layers.length > 0 && (
                            <span className="bg-stone-600 text-amber-100 text-xs font-bold px-3 py-1 rounded-full">
                                {layers.length} {layers.length === 1 ? 'layer' : 'layers'}
                            </span>
                        )}
                    </div>
                    
                    {layers.length===0 ? 
                        (<div className="border-2 border-dashed border-stone-400 rounded-2xl bg-amber-100 px-6 py-10 text-center mb-6">
                            <p className="text-sm font-semibold text-stone-800">No layers yet</p>
                            <p className="text-xs text-stone-600 mt-1">Start building your recipe below.</p>
                        </div>)
                    :
                        (<div className="space-y-4 mb-6">
                            {layers.map((layer)=>
                            <div key={layer.id} 
                            className="group border-2 border-stone-600 rounded-2xl p-5 bg-stone-600 hover:bg-stone-600/90 hover:shadow-sm transition-all">
                                <div className="flex justify-between items-center mb-4">
                                    <input
                                        type="text"
                                        placeholder="E.g. Vanilla Sponge"
                                        value={layer.name}
                                        onChange={(e) => handleUpdateLayerName(layer.id, e.target.value)}
                                        className="w-full px-3 py-2 text-lg font-bold text-amber-50 placeholder:text-stone-400  bg-black/10 border border-dashed border-stone-400/40 rounded-xl hover:bg-black/20 hover:border-stone-400/70 focus:bg-black/30 focus:border-solid focus:border-amber-100 focus:ring-1 focus:ring-amber-400 focus:outline-none transition-all cursor-text"
                                    />
                                    <button
                                        className=" ml-3 shrink-0 px-4 py-2 rounded-lg  bg-amber-100 text-red-600 text-s font-semibold hover:ring-1 hover:ring-red-600 transition-all"
                                        onClick={() => handleDeleteLayer(layer.id)}
                                    >
                                        Delete
                                    </button>
                                </div>
                                <div className="text-sm text-amber-100 ml-1">
                                    {layer.ingredients.map((ingredient)=>
                                        <IngredientRow 
                                        key={ingredient.id} 
                                        ingredient={ingredient} 
                                        onUpdate={(field, value) => handleUpdateIngredient(layer.id, ingredient.id, field, value)} 
                                        onDelete={()=>{handleDeleteIngredient(layer.id,ingredient.id)}}
                                        />
                                    )}

                                    <button 
                                        className="text-sm font-bold text-amber-200 hover:text-amber-100 transition-colors mt-2 flex items-center gap-1"
                                        onClick={()=>handleAddIngredient(layer.id)}
                                    >
                                    + Add ingredient
                                    </button>

                                </div>
                            </div>)}
                        </div>)
                    }
                    <button 
                        className="w-full bg-stone-600 text-amber-200 hover:bg-stone-700 font-bold py-3 px-6 rounded-xl transition-transform active:scale-[0.99]"
                        onClick={handleAddLayer}
                    >
                    + Add layer
                    </button>
                </div>
            </div>

            <div className="flex justify-center mb-6 border-t border-stone-500 pt-6">
                <button 
                    className="
                        bg-stone-700 hover:bg-stone-800  text-amber-200 font-bold tracking-wide py-3 px-10 rounded-xl shadow-lg shadow-stone-900/20 transition-all active:scale-[0.98]"
                >
                    Save recipe
                </button>
            </div>
        </div>
    )
}