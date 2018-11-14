import { getInitialData } from '../utils/data';
import { setLayers, setSelectedColor } from '../actions/layers';

export function handleInitialData() {
    return (dispatch) => {
        return getInitialData()
        .then(({ layers, colorId }) => {
            dispatch(setLayers(layers));
            dispatch(setSelectedColor(colorId))
        });
    }
}