import {
    SET_LAYERS,
    SET_SELECTED_COLOR,
    SET_CURRENT_LAYER,
    SET_EDITING,
} from '../actions/layers';


export default function layers(state = {}, action) {
    switch(action.type) {
        case SET_LAYERS:
            return {
                ...state,
                layerData: action.layers,
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
        default:
            return state;
    }
}