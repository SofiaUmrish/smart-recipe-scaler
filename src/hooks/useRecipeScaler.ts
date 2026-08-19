import { useRecipeStore } from '../store/recipeStore';

export const useRecipeScaler = () => {
    const { 
        diameter, 
        targetDiameter, 
        servings, 
        targetServings, 
        scaleMode 
    } = useRecipeStore();

    const origDiam = Number(diameter);
    const targDiam = Number(targetDiameter);
    const origServ = Number(servings);
    const targServ = Number(targetServings);

    let scaleFactor = 1;

    if(scaleMode==="diameter"){
        if(origDiam>0&&targDiam>0){
            scaleFactor = (targDiam**2) / (origDiam**2);
        }

    }else if(scaleMode==="serving"){
        if(origServ>0&&targServ>0){
            scaleFactor = targServ/origServ;
        }
    }

    return scaleFactor

}