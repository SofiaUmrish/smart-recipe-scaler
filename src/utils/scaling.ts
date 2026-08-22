export const calculateScaleFactor = (
    scaleMode: "diameter" | "serving",
    origDiam: number, targDiam: number,
    origServ: number, targServ: number
): number => {
    let scaleFactor = 1;

    if (scaleMode === "diameter") {
        if (origDiam > 0 && targDiam > 0) {
            scaleFactor = (targDiam ** 2) / (origDiam ** 2);
        }
    } else if (scaleMode === "serving") {
        if (origServ > 0 && targServ > 0) {
            scaleFactor = targServ / origServ;
        }
    }

    return scaleFactor;
};