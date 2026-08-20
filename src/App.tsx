import RecipeBuilder from './pages/RecipeBuilder';
import Home from './pages/Home';
import Recipes from './pages/Recipes';

import { BrowserRouter, Routes, Route} from 'react-router-dom';

import Header from './components/Header';


function App() {
  return (
    <BrowserRouter>
        <div className="min-h-screen bg-stone-700 font-sans">
          <Header />

          <main className="py-8">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/recipe/new" element={<RecipeBuilder />} />
              <Route path="/recipes" element={<Recipes />} />

            </Routes>
          </main>
             
        </div>
    </BrowserRouter>
    
  );
}

export default App;