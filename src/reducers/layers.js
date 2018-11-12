import {
    SET_LAYERS,
    SET_SELECTED_COLOR,
    SET_CURRENT_LAYER,
    SET_EDITING,
    SET_HIDDEN,
} from '../actions/layers';


export default function layers(state = {}, action) {
    switch(action.type) {
        case SET_LAYERS:
            let str = '';
            console.log(action.layers)
	        let strColors = action.layers.filter(({hidden}) => !hidden)

            strColors.forEach((layer, index) => {
                str+= `\nlinear-gradient(${layer.degree}deg, `;
                layer.colors.forEach((color, index) => {
                    str+= `\nhsla(${color.h}, ${color.s}%, ${color.l}%,  ${color.a}) ${color.amount}%`
                    str+= index === layer.colors.length-1 ? `)` : ',';
                });
	
                str+= index === strColors.length-1 ? '' : ',';
            });
    
            return {
                ...state,
                layerData: action.layers,
                gradientString: str,
            };
        case SET_SELECTED_COLOR:
            let selectedColor = null;
            state.layerData.forEach(layer => {
                layer.colors.forEach(color => {
                    if(color.id === action.colorId) {
                        selectedColor = color;
                    }
                });
            });
            return {
                ...state,
                selectedColorId: action.colorId,
                selectedColor: selectedColor,
            };
        case SET_CURRENT_LAYER:
            return {
                ...state,
                ...action.layerIndex,
            };
        case SET_EDITING:
            return {
                ...state,
                editing: action.editingStatus,
            }
        case SET_HIDDEN:
            return {
                ...state,
                hidden: action.hiddenStatus,
            }
        default:
            return state;
    }
}