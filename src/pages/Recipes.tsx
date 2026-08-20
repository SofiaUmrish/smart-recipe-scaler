import { useRecipeStore } from '../store/recipeStore';
import { Link } from 'react-router-dom';

export default function Recipes(){

    const savedRecipes = useRecipeStore((state)=>state.savedRecipes);

    return(
        <div className="max-w-5xl mx-auto px-4 md:px-8 mt-10">
            <div className="mb-8 text-center">
                <h2 className="text-3xl font-black text-amber-200">My Saved Recipes</h2>
                <p className="text-amber-100/70 mt-1">Manage and scale your favorite cakes.</p>
            </div>

           {savedRecipes.length===0 ? (

            <div className="border-2 border-dashed border-stone-500 rounded-3xl bg-stone-600/30 px-6 py-16 text-center mt-8">
                <h3 className="text-xl font-bold text-amber-200 mb-2">No recipes found</h3>
                <p className="text-stone-400 mb-8 max-w-md mx-auto">
                    You haven't saved any recipes yet. Create your first cake to see it here!
                </p>
                <Link 
                    to="/recipe/new"
                    className="inline-block bg-amber-200 hover:bg-amber-300 text-stone-800 font-bold py-3 px-8 rounded-xl transition-all active:scale-95 shadow-lg"
                >
                    + Create Recipe
                </Link>
            </div>

            ) : (

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {
                        savedRecipes.map((recipe)=>{
                            return(
                                <div key={recipe.id} className="bg-stone-600 rounded-2xl p-6 border border-stone-500 hover:border-amber-200/50 hover:shadow-lg transition-all group cursor-pointer flex flex-col h-full">
                                    
                                    <h3 className="text-xl font-bold text-amber-200 mb-4 group-hover:text-amber-100 transition-colors line-clamp-2">
                                        Name: {recipe.name}
                                    </h3>
                                    <div className="flex flex-wrap gap-3 text-sm font-semibold text-amber-100/80 mb-6">
                                        
                                        {recipe.originalDiameter&&
                                            <span className="bg-stone-700 px-3 py-1.5 rounded-lg flex items-center gap-1.5"> 
                                                Diameter: {recipe.originalDiameter} cm
                                            </span>}

                                        {recipe.originalServings&&
                                            <span className="bg-stone-700 px-3 py-1.5 rounded-lg flex items-center gap-1.5"> 
                                                Servings: {recipe.originalServings}
                                            </span>}
                                    </div>
                                    <div className="mt-auto pt-4 border-t border-stone-500 flex justify-between items-center text-xs text-stone-400">
                                        <p>{recipe.layers.length + " layers"}</p>
                                        <p>{"Creation date: " + new Date(recipe.createdAt).toLocaleDateString()}</p>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
            )
           }
        </div>
    )
}