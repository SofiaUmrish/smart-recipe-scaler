import IngredientRow from '../components/IngredientRow';
import { useRecipeStore } from '../store/recipeStore';

export default function RecipeBuilder(){

    const { 
        recipeName, setRecipeName, 
        diameter, setDiameter, 
        servings, setServings,
        layers, 
        targetDiameter, setTargetDiameter,
        targetServings,setTargetServings,
        scaleMode, setScaleMode, 
        viewMode, setViewMode,
        handleAddLayer, handleDeleteLayer, 
        handleUpdateLayerName, handleAddIngredient, 
        handleUpdateIngredient, handleDeleteIngredient 
    } = useRecipeStore();
   

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
                                Original diameter (cm)
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
                                Original servings
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

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 border-t border-stone-500 py-8">
                    <div>
                        <h3 className="text-xl font-bold text-stone-800 mb-2">
                            Scale recipe
                        </h3>

                        <p className="text-sm text-stone-500 mb-5">
                            Choose how you want to scale your recipe.
                        </p>

                        <div className="flex gap-2 mb-5">
                            <button
                                onClick={() => setScaleMode("diameter")}
                                className={`
                                    px-4 py-2 rounded-lg text-sm font-bold transition-colors
                                    ${
                                        scaleMode === "diameter"
                                            ? "bg-stone-700 text-amber-200"
                                            : "bg-amber-100 text-stone-600 hover:bg-amber-50"
                                    }
                                `}
                            >
                                Diameter
                            </button>

                            <button
                                onClick={() => setScaleMode("serving")}
                                className={`
                                    px-4 py-2 rounded-lg text-sm font-bold transition-colors
                                    ${
                                        scaleMode === "serving"
                                            ? "bg-stone-700 text-amber-200"
                                            : "bg-amber-100 text-stone-600 hover:bg-amber-50"
                                    }
                                `}
                            >
                                Servings
                            </button>
                        </div>

                        {scaleMode === "diameter" ? (
                            <div>
                                <label className="block text-xs font-bold uppercase tracking-wider text-stone-500 mb-2">
                                    Target diameter (cm)
                                </label>

                                <input
                                    type="number"
                                    value={targetDiameter}
                                    onChange={(e) => setTargetDiameter(e.target.value)}
                                    placeholder="24"
                                    min="0"
                                    className="w-full bg-stone-500 border-2 border-stone-600 rounded-xl px-4 py-3 text-amber-200 placeholder-amber-50/50 focus:ring-2 focus:ring-stone-400 focus:border-amber-200 focus:outline-none transition-colors"
                               />
                            </div>
                        ) : (
                            <div>
                                <label className="block text-xs font-bold uppercase tracking-wider text-stone-500 mb-2">
                                    Target servings
                                </label>

                                <input
                                    type="number"
                                    value={targetServings}
                                    onChange={(e) => setTargetServings(e.target.value)}
                                    placeholder="12"
                                    min="0"
                                    className="w-full bg-stone-500 border-2 border-stone-600 rounded-xl px-4 py-3 text-amber-200 placeholder-amber-50/50 focus:ring-2 focus:ring-stone-400 focus:border-amber-200 focus:outline-none transition-colors"
                               />
                            </div>
                        )}
                    </div>
                </div>

                <div className="border-t border-stone-500 pt-6 mb-8">
                    <p className="text-xs font-bold uppercase tracking-wider text-stone-500 mb-3">
                        Recipe view
                    </p>

                    <div className="flex bg-amber-100 rounded-xl p-1 w-fit">
                        <button
                            onClick={() => setViewMode("original")}
                            className={`
                                px-4 py-2 rounded-lg text-sm font-bold transition-all
                                ${
                                    viewMode === "original"
                                        ? "bg-stone-700 text-amber-200 shadow-sm"
                                        : "text-stone-500 hover:text-stone-700"
                                }
                            `}
                        >
                            Edit original
                        </button>

                        <button
                            onClick={() => setViewMode("scaled")}
                            className={`
                                px-4 py-2 rounded-lg text-sm font-bold transition-all
                                ${
                                    viewMode === "scaled"
                                        ? "bg-stone-700 text-amber-200 shadow-sm"
                                        : "text-stone-500 hover:text-stone-700"
                                }
                            `}
                        >
                            Preview scaled
                        </button>
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
                                        disabled={viewMode === "scaled"}
                                        value={layer.name}
                                        onChange={(e) => handleUpdateLayerName(layer.id, e.target.value)}
                                        className="w-full px-3 py-2 text-lg font-bold text-amber-50 placeholder:text-stone-400  bg-black/10 border border-dashed border-stone-400/40 rounded-xl hover:bg-black/20 hover:border-stone-400/70 focus:bg-black/30 focus:border-solid focus:border-amber-100 focus:ring-1 focus:ring-amber-400 focus:outline-none transition-all cursor-text"
                                    />
                                    {viewMode === "original" &&  
                                        (<button
                                            className=" ml-3 shrink-0 px-4 py-2 rounded-lg  bg-amber-100 text-red-600 text-s font-semibold hover:ring-1 hover:ring-red-600 transition-all"
                                            onClick={() => handleDeleteLayer(layer.id)}
                                        >
                                            Delete
                                        </button>)
                                    }
                                </div>
                                <div className="text-sm text-amber-100 ml-1">
                                    {layer.ingredients.map((ingredient)=>
                                        <IngredientRow 
                                        key={ingredient.id} 
                                        ingredient={ingredient} 
                                        onUpdate={(field, value) => handleUpdateIngredient(layer.id, ingredient.id, field, value)} 
                                        onDelete={()=>{handleDeleteIngredient(layer.id,ingredient.id)}}
                                        viewMode={viewMode}
                                        />
                                    )}
                                     {viewMode === "original" &&
                                       ( <button 
                                            className="text-sm font-bold text-amber-200 hover:text-amber-100 transition-colors mt-2 flex items-center gap-1"
                                            onClick={()=>handleAddIngredient(layer.id)}
                                        >
                                             + Add ingredient
                                        </button>)
                                    }

                                </div>
                            </div>)}
                        </div>)
                    }
                    {viewMode === "original" && 
                       ( <button 
                            className="w-full bg-stone-600 text-amber-200 hover:bg-stone-700 font-bold py-3 px-6 rounded-xl transition-transform active:scale-[0.99]"
                            onClick={handleAddLayer}
                        >
                        + Add layer
                        </button>)
                    }
                    
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