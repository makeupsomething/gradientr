import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';

import { 
	setSelectedColor, 
} from '../actions/layers';

const ColorBlock = styled.div.attrs({
    background: props => props.background || 'green',
    height: props => props.selected ? '100px' : '50px',
    width: props => props.selected ? '100px' : '50px',
})`
    height: ${props => props.height};
    width: ${props => props.width};
    margin: 5px;
    background: ${props => props.background};
    border-radius: 50%;
    float: left;
    cursor: pointer;
    box-shadow: rgba(0, 0, 0, 0.3) 0px 0px 2px;
    transition: all .5s;

    ${ColorBlock}:hover {
        box-shadow: rgba(0, 0, 0, 0.3) 0px 0px 10px;
    }

    ${ColorBlock}:active {
        box-shadow: rgba(0, 0, 0, 0.3) 0px 0px 2px;
    }
`

class ColorPicker extends Component {

    toggleColor = (event) => {
        const { color } = this.props;
        this.props.dispatch(setSelectedColor(color.id))
    }

    render() {
        const { disabled, color } = this.props;

        return (
            <ColorBlock  
                onClick={this.toggleColor}
                background={`hsla(${color.h}, ${color.s}%, ${color.l}%, ${color.a})`}
                selected={disabled}
            >
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