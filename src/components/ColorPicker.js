import React, { Component } from 'react';
import { connect } from 'react-redux';

import {  
    ColorBlock,
} from '../styledComponents/ControlPanel';

import { 
    setSelectedColor,
    setLayers, 
} from '../actions/layers';

class ColorPicker extends Component {
    state = {
        hover: false
    };

    toggleColor = () => {
        const { color } = this.props;
        this.props.dispatch(setSelectedColor(color.id))
    }

    mouseEnter = () => {
        this.setState({ hover: true });
    }

    mouseExit = () => {
        this.setState({ hover: false });
    }

    removeColor = () => {
        const { layerData, layerIndex, selectedColor } =  this.props.layers;
        layerData[layerIndex].colors = layerData[layerIndex].colors.filter(color => color.id !== selectedColor.id)
        this.props.dispatch(setLayers(layerData));
        this.props.dispatch(setSelectedColor(layerData[layerIndex].colors[0].id))
    }

    render() {
        const { selected, color } = this.props;

        return (
            <ColorBlock  
                onMouseEnter={this.mouseEnter}
                onMouseLeave={this.mouseExit}
                onClick={selected ? this.removeColor : this.toggleColor}
                background={`hsla(${color.h}, ${color.s}%, ${color.l}%, ${color.a})`}
                selected={selected}
            >
            {this.state.hover && selected ? <div><i class="fas fa-trash"/></div>: <div>{color.amount}%</div>}
            </ColorBlock>
        );
    }
}

function mapStateToProps({ layers }) {
	return {
		layers,
	}
}

export default connect(mapStateToProps)(ColorPicker);