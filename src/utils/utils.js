export function generateString(layerData) {
    let strColors = layerData.filter(({hidden}) => !hidden)
            
    return strColors.reduce((gradientString, layer, index) => {
        gradientString += `\nlinear-gradient(${layer.degree}deg, `
        gradientString += layer.colors.reduce((colorString, color, index) => {
            colorString += `\nhsla(${color.h}, ${color.s}%, ${color.l}%,  ${color.a}) ${color.amount}%`
            colorString += index === layer.colors.length-1 ? `)` : ',';
            return colorString
        }, '')
        gradientString += index === strColors.length-1 ? '' : ',';
        return gradientString 
    }, '')
}

export function getSelectedColor(layerData, colorId) {
    return layerData.reduce((col, layer) => {
        return layer.colors.find(color => {
            if(color.id === colorId) {
                return color;
            }
        }, null);
    });
}