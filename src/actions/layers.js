export const SET_LAYERS = 'SET_LAYERS';
export const SET_SELECTED_COLOR = 'SET_SELECTED_COLOR';
export const SET_CURRENT_LAYER = 'SET_CURRENT_LAYER';
export const SET_EDITING = 'SET_EDITING';
export const SET_HIDDEN = 'SET_HIDDEN';

export function setLayers (layers) {
    return {
        type: SET_LAYERS,
        layers,
    }
}

export function setSelectedColor (colorId) {
    return {
        type: SET_SELECTED_COLOR,
        colorId,
    }
}

export function setCurrentLayer (layerIndex) {
    return {
        type: SET_CURRENT_LAYER,
        layerIndex,
    }
}

export function setEdting (editingStatus) { 
    return {
        type: SET_EDITING,
        editingStatus,
    }
}

export function hideContainer (hiddenStatus) { 
    return {
        type: SET_HIDDEN,
        hiddenStatus,
    }
}