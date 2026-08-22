import { NavLink } from 'react-router-dom';
import { useRecipeStore } from '../store/recipeStore';

export default function Header() {
    const baseLinkClasses = "rounded-xl py-2 px-4 transition-colors";
    const resetForm = useRecipeStore((state) => state.resetForm);

    return (
        <header className="bg-stone-600">
            
            <div className="max-w-5xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-4 p-5 lg:px-8">
                
                <div className="flex flex-col items-center lg:items-start gap-2 text-center">
                    <h1 className="text-3xl font-black text-amber-200">Smart Recipe Scaler <span aria-hidden="true">🍰</span></h1>
                    <p className="text-amber-100 text-sm">Scale your recipes effortlessly.</p>
                </div>

                <nav aria-label="Main navigation" className="flex flex-wrap justify-center items-center gap-3 md:gap-8 font-bold text-amber-200">
                    <NavLink 
                        to="/" 
                        className={({ isActive }) => 
                            `${baseLinkClasses} ${isActive 
                                ? "bg-amber-200 text-stone-700 " 
                                : "bg-stone-500/40 hover:bg-amber-200/20 hover:text-amber-200"}`
                        }
                    >
                        Home
                    </NavLink>

                    <NavLink 
                        to="/recipe/new" 
                        className={({ isActive }) => 
                            `${baseLinkClasses} ${isActive 
                                ? "bg-amber-200 text-stone-700 " 
                                : "bg-stone-500/40 hover:bg-amber-200/20 hover:text-amber-200"}`
                        }
                    >
                        Add recipe
                    </NavLink>

                    <NavLink 
                        to="/recipes" 
                        onClick={resetForm}
                        className={({ isActive }) => 
                            `${baseLinkClasses} ${isActive 
                                ? "bg-amber-200 text-stone-700 " 
                                : "bg-stone-500/40 hover:bg-amber-200/20 hover:text-amber-200"}`
                        }
                    >
                        My Recipes
                    </NavLink>
                </nav>
            </div>
                
        </header>
    )
}