import { useState } from 'react';
import { useRecipeStore } from '../store/recipeStore';
import { Link, useNavigate } from 'react-router-dom';
import type { Recipe } from '../types/recipe';

export default function Recipes() {
    const savedRecipes = useRecipeStore((state) => state.savedRecipes);
    const loadRecipe = useRecipeStore((state) => state.loadRecipe);
    const deleteRecipe = useRecipeStore((state) => state.deleteRecipe);
    const navigate = useNavigate();

    const [recipeToDelete, setRecipeToDelete] = useState<Recipe | null>(null);

    const handleOpenRecipe = (recipe: Recipe) => {
        loadRecipe(recipe);
        navigate('/recipe/new');
    };

    const handleDeleteClick = (e: React.MouseEvent, recipe: Recipe) => {
        e.stopPropagation();
        setRecipeToDelete(recipe);
    };

    const confirmDelete = () => {
        if (recipeToDelete) {
            deleteRecipe(recipeToDelete.id);
            setRecipeToDelete(null);
        }
    };

    return (
        <div className="max-w-5xl mx-auto px-4 md:px-8 mt-10 pb-20">
            <div className="mb-8 text-center">
                <h2 className="text-3xl font-black text-amber-200">My Saved Recipes</h2>
                <p className="text-amber-100/70 mt-1">Manage and scale your favorite cakes.</p>
            </div>

            {savedRecipes.length === 0 ? (
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
                    {savedRecipes.map((recipe) => {
                        return (
                            <div 
                                key={recipe.id}
                                className="bg-stone-600 rounded-2xl p-6 border border-stone-500 hover:border-amber-200/50 hover:shadow-lg transition-all group cursor-pointer flex flex-col h-full"
                                onClick={() => handleOpenRecipe(recipe)}
                            >
                                <h3 className="text-xl font-bold text-amber-200 mb-4 group-hover:text-amber-100 transition-colors line-clamp-2">
                                    Name: {recipe.name}
                                </h3>
                                
                                <div className="flex flex-wrap gap-3 text-sm font-semibold text-amber-100/80 mb-6">
                                    {recipe.originalDiameter!==0 && (
                                        <span className="bg-stone-700 px-3 py-1.5 rounded-lg flex items-center gap-1.5"> 
                                            Diameter: {recipe.originalDiameter} cm
                                        </span>
                                    )}
                                    {recipe.originalServings!==0 && (
                                        <span className="bg-stone-700 px-3 py-1.5 rounded-lg flex items-center gap-1.5"> 
                                            Servings: {recipe.originalServings}
                                        </span>
                                    )}
                                </div>
                                
                                <div className="mt-auto pt-4 border-t border-stone-500 flex justify-between items-center text-xs text-stone-400">
                                    <div className="flex gap-4">
                                        <p>{recipe.layers.length + " layers"}</p>
                                        <p>{new Date(recipe.createdAt).toLocaleDateString()}</p>
                                    </div>
                                    <button 
                                        onClick={(e) => handleDeleteClick(e, recipe)}
                                        className="px-3 py-1.5 rounded-lg font-bold text-stone-400 hover:text-red-300 hover:bg-red-500/20 transition-colors"
                                    >
                                        Delete
                                    </button>
                                </div>
                            </div>
                        )
                    })}
                </div>
            )}

            {/* modal window for deletion */}
            {recipeToDelete && (
                <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
                    <div className="bg-stone-700 border border-stone-500 rounded-3xl p-6 sm:p-8 max-w-sm w-full shadow-2xl">
                        <h3 className="text-2xl font-black text-amber-200 mb-2">Delete Recipe?</h3>
                        <p className="text-stone-300 mb-8">
                            Are you sure you want to delete <span className="font-bold text-amber-100">"{recipeToDelete.name}"</span>? This action cannot be undone.
                        </p>
                        
                        <div className="flex justify-end gap-3">
                            <button
                                onClick={() => setRecipeToDelete(null)}
                                className="px-5 py-2.5 rounded-xl font-bold text-stone-300 hover:bg-stone-600 transition-colors"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={confirmDelete}
                                className="px-5 py-2.5 rounded-xl font-bold bg-red-500 hover:bg-red-600 text-white shadow-lg transition-colors active:scale-95"
                            >
                                Yes, delete
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}