import RecipeBuilder from './pages/RecipeBuilder';

function App() {
  return (
    <div className="min-h-screen bg-stone-700 py-8 px-4 font-sans">
      <header className="text-center">
        <h1 className="text-4xl font-black text-amber-200">Smart Recipe Scaler 🍰</h1>
        <p className="text-amber-100 mt-2 font-medium">Scale your recipes effortlessly.</p>
      </header>
      
      <RecipeBuilder />
    </div>
  );
}

export default App;