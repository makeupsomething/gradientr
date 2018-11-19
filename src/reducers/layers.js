import {
    SET_LAYERS,
    SET_SELECTED_COLOR,
    SET_CURRENT_LAYER,
    SET_EDITING,
    SET_HIDDEN,
} from '../actions/layers';

import { 
    generateString, 
    getSelectedColor 
} from '../utils/utils'


export default function layers(state = {}, action) {
    switch(action.type) {
        case SET_LAYERS:
            let str = generateString(action.layers)

            return {
                ...state,
                layerData: action.layers,
                gradientString: str,
            };
        case SET_SELECTED_COLOR:
            let selectedColor = getSelectedColor(state.layerData, action.colorId)
            
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