import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import ColorPicker from './ColorPicker';

import { 
	setLayers, 
} from '../actions/layers';

const AddButton = styled.button`
	width:  100px;
    height:  100px;
    margin: 5px;
    background: #1010100a;
    border-radius: 50%;
    cursor: pointer;
    box-shadow: rgba(0, 0, 0, 0.3) 0px 0px 2px;
    transition: all .3s;

    ${AddButton}:hover {
        box-shadow: rgba(0, 0, 0, 0.3) 0px 0px 10px;
    }

    ${AddButton}:active {
        box-shadow: rgba(0, 0, 0, 0.3) 0px 0px 2px;
    }
`

const ItemContainer = styled.span`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 50%;
    transition: all .3s;
`

class Layer extends Component {

    uuidv4 = () => {
        return ([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g, c =>
          (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
        )
    }

    addColor = () => {
        const { layerData, layerIndex } =  this.props.layers;
        let uuid = this.uuidv4()
        layerData[layerIndex].colors.push({h: '185', s: '100', l: '50', a: '0.75', amount: 50, id: uuid})
        this.props.dispatch(setLayers(layerData));
    }

    render() {
        const { layerData, layerIndex, selectedColorId } =  this.props.layers;

        return (
            <ItemContainer>
                {layerData[layerIndex].colors.map(color => {
                    return (
                    <ColorPicker
                        color={color}
                        name={color.id}
                        selected={color.id === selectedColorId} >
                    </ColorPicker>)
                    })}
                    {layerData[layerIndex].colors.length < 5 ? (
                    <AddButton onClick={() => this.addColor()}>
                        <i class="fas fa-plus" />
                    </AddButton>) : null}
            </ItemContainer>
        );
    }
}

function mapStateToProps({ layers }) {
	return {
		layers,
	}
}

export default connect(mapStateToProps)(Layer);