import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled, { keyframes } from 'styled-components';

import { 
    setSelectedColor,
    setLayers, 
} from '../actions/layers';

const fadeIn = keyframes`
from {
    opacity: 0;
}

to {
	opacity: 1;
}
`;

const ColorBlock = styled.div.attrs({
    background: props => props.background || 'green',
    height: props => props.selected ? '100px' : '50px',
    width: props => props.selected ? '100px' : '50px',
})`
    height: ${props => props.height};
    width: ${props => props.width};
    margin: 5px;
    background-color: ${props => props.background};
    border-radius: 50%;
    float: left;
    cursor: pointer;
    box-shadow: rgba(0, 0, 0, 0.3) 0px 0px 2px;
    transition: all .5s;
    display: flex;
    justify-content: center;
    align-items: center;
    animation: ${fadeIn} .3s linear;

    ${ColorBlock}:hover {
        box-shadow: rgba(0, 0, 0, 0.3) 0px 0px 10px;
    }

    ${ColorBlock}:active {
        box-shadow: rgba(0, 0, 0, 0.3) 0px 0px 2px;
    }
`

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