import React, { Component } from 'react';
import { connect } from 'react-redux';

import { 
	setLayers, 
} from '../actions/layers';

class LayerToggle extends Component {

    toggleLayers = (layer) => {
        const { layerData } =  this.props.layers;
    
        if(layer === 0) {
            layerData[0].hidden = false;
            layerData[1].hidden = true;
        } else if (layer === 1) {
            layerData[0].hidden = true;
            layerData[1].hidden = false;
        } else {
            layerData[0].hidden = false;
            layerData[1].hidden = false;
        }

        this.props.dispatch(setLayers(layerData))
    }


    render() {
        const { layerData } =  this.props.layers;

        return (
            <div style={{height: "20px", width: "90%", margin: "30px auto"}}>
                <label>
                    <span>Show Layer:</span>
                </label>
                <label style={{marginLeft: "10%"}}>
                    <span>both layers</span>
                <input onClick={() => this.toggleLayers(2)} type="radio" name="hidden" value="both" checked={!layerData[0].hidden && !layerData[1].hidden } />
                </label>
                <label style={{marginLeft: "10%"}}>
                    <span>layer 1</span>
                <input onClick={() => this.toggleLayers(0)} type="radio" name="hidden" value="1" />
                </label>
                <label style={{marginLeft: "10%"}}>
                    <span>layer 2</span>
                <input onClick={() => this.toggleLayers(1)} type="radio" name="hidden" value="2" />
                </label>
            </div>
        )
    }
}

function mapStateToProps({ layers }) {
	return {
		layers,
	}
}

export default connect(mapStateToProps)(LayerToggle);