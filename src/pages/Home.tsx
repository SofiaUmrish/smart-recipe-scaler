import { Link } from 'react-router-dom';

export default function Home() {
    return (
        <div className="max-w-6xl mx-auto px-4 md:px-8 py-12 md:py-20">
            
            <div className="text-center max-w-3xl mx-auto mb-20">
                <h1 className="text-5xl md:text-6xl font-black text-amber-200 mb-6 leading-tight">
                    Scale Your Baking <br/>
                    <span className="text-amber-100/80">With Precision</span> 🍰
                </h1>
                
                <p className="text-lg text-stone-300 mb-10 leading-relaxed">
                    Stop guessing the math when adapting your favorite cake recipes. 
                    Easily recalculate ingredients by pan diameter or number of servings, 
                    save your best creations, and bake with confidence.
                </p>

                <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
                    <Link 
                        to="/recipe/new" 
                        className="w-full sm:w-auto bg-amber-200 hover:bg-amber-300 text-stone-800 font-black text-lg py-4 px-10 rounded-2xl shadow-lg shadow-amber-200/20 transition-all active:scale-95"
                    >
                        Start Scaling
                    </Link>
                    <Link 
                        to="/recipes" 
                        className="w-full sm:w-auto bg-stone-600 hover:bg-stone-500 text-amber-100 font-bold text-lg py-4 px-10 rounded-2xl transition-all active:scale-95"
                    >
                        View My Recipes
                    </Link>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                
                <div className="bg-stone-600/50 p-8 rounded-3xl border border-stone-500/50 text-center">
                    <div className="text-5xl mb-4">🍦</div>
                    <h3 className="text-xl font-bold text-amber-200 mb-2">Smart Resizing</h3>
                    <p className="text-stone-400 text-sm">
                        Instantly adjust ingredient weights based on a new pan size or desired portion count.
                    </p>
                </div>

                <div className="bg-stone-600/50 p-8 rounded-3xl border border-stone-500/50 text-center">
                    <div className="text-5xl mb-4">🍮</div>
                    <h3 className="text-xl font-bold text-amber-200 mb-2">Save for Later</h3>
                    <p className="text-stone-400 text-sm">
                        Keep all your adapted recipes in one place. No more lost notes or messy kitchen papers.
                    </p>
                </div>

                <div className="bg-stone-600/50 p-8 rounded-3xl border border-stone-500/50 text-center">
                    <div className="text-5xl mb-4">🍪</div>
                    <h3 className="text-xl font-bold text-amber-200 mb-2">Easy to Edit</h3>
                    <p className="text-stone-400 text-sm">
                        Need to tweak a layer? Open any saved recipe, modify it, and update instantly.
                    </p>
                </div>

                <div className="bg-stone-600/50 p-8 rounded-3xl border border-stone-500/50 text-center">
                    <div className="text-5xl mb-4">🥞</div>
                    <h3 className="text-xl font-bold text-amber-200 mb-2">Nutrition Info</h3>
                    <p className="text-stone-400 text-sm">
                        Automatically calculate calories and macronutrients for your entire cake or per slice.
                    </p>
                </div>

            </div>
            
        </div>
    );
}