import { useRecipeStore } from '../store/recipeStore';
import { calculateScaleFactor } from '../utils/scaling';

export const useRecipeScaler = () => {
    const { 
        diameter, 
        targetDiameter, 
        servings, 
        targetServings, 
        scaleMode 
    } = useRecipeStore();


    return calculateScaleFactor(
        scaleMode,
        Number(diameter), Number(targetDiameter),
        Number(servings), Number(targetServings)
    );

}