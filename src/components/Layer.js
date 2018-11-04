import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import ColorPicker from './ColorPicker';

import { 
	setLayers, 
	setSelectedColor, 
	setCurrentLayer,
	setEdting,
} from '../actions/layers';

const AddButton = styled.button`
	width:  100px;
    height:  100px;
    margin: 5px;
    background: #1010100a;
    border-radius: 50%;
    cursor: pointer;
    box-shadow: rgba(0, 0, 0, 0.3) 0px 0px 2px;

    ${AddButton}:hover {
        box-shadow: rgba(0, 0, 0, 0.3) 0px 0px 10px;
    }

    ${AddButton}:active {
        box-shadow: rgba(0, 0, 0, 0.3) 0px 0px 2px;
    }
`

const RemoveButton = styled.button`
	width:  100px;
    height:  100px;
    margin: 5px;
    background: #1010100a;
    border-radius: 50%;
    cursor: pointer;
    box-shadow: rgba(0, 0, 0, 0.3) 0px 0px 2px;

    ${AddButton}:hover {
        box-shadow: rgba(0, 0, 0, 0.3) 0px 0px 10px;
    }

    ${AddButton}:active {
        box-shadow: rgba(0, 0, 0, 0.3) 0px 0px 2px;
    }
`


class Layer extends Component {

    uuidv4 = () => {
        return ([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g, c =>
          (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
        )
    }

    addColor = (layer) => {
        const { layerData, selectedColor, layerIndex, editing, selectedColorId } =  this.props.layers;
        if(layer === undefined) {
            return
        }
        let uuid = this.uuidv4()
        layerData[layer].colors.push({h: '185', s: '100', l: '50', a: '0.75', amount: 50, id: uuid})
        this.props.dispatch(setLayers(layerData));
    }

    removeColor = (layer) => {
        if(layer === undefined) {
            return
        }
        const { layerData, layerIndex, selectedColor } =  this.props.layers;
        layerData[layerIndex].colors = layerData[layerIndex].colors.filter(color => color.id !== selectedColor.id)
        this.props.dispatch(setLayers(layerData));
        this.props.dispatch(setSelectedColor(layerData[layerIndex].colors[0].id))
    }

    render() {
        const { layerData, selectedColor, layerIndex, editing, selectedColorId } =  this.props.layers;

        return (
            <Fragment>
                {layerData[layerIndex].colors.map(color => {
                    return <ColorPicker
                            color={color}
                            name={color.id}
                            disabled={color.id === selectedColorId} >
                        </ColorPicker>
                            })}
                    {layerData[layerIndex].colors.length < 3 && layerIndex !== undefined 
                        ? (
                        <AddButton onClick={() => this.addColor(layerIndex)}>
                            <i class="fas fa-plus" />
                        </AddButton>) 
                        : (<RemoveButton onClick={() => this.removeColor(layerIndex)}>
                        <i class="fas fa-minus" />
                        </RemoveButton>)
                    }
            </Fragment>
        );
    }
}

function mapStateToProps({ layers }) {
	return {
		layers,
	}
}

export default connect(mapStateToProps)(Layer);