import React, { Component } from 'react';

class LayerToggle extends Component {
    render() {

        const { layers, toggleLayers } = this.props;

        return (
            <div style={{height: "20px", width: "90%", margin: "30px auto"}}>
                <label>
                    <span>Show Layer:</span>
                </label>
                <label style={{marginLeft: "10%"}}>
                    <span>both layers</span>
                <input onClick={() => toggleLayers(2)} type="radio" name="hidden" value="both" checked={!layers[0].hidden && !layers[1].hidden } />
                </label>
                <label style={{marginLeft: "10%"}}>
                    <span>layer 1</span>
                <input onClick={() => toggleLayers(0)} type="radio" name="hidden" value="1" />
                </label>
                <label style={{marginLeft: "10%"}}>
                    <span>layer 2</span>
                <input onClick={() => toggleLayers(1)} type="radio" name="hidden" value="2" />
                </label>
            </div>
        )
    }
}

export default LayerToggle;