import React, { Component } from 'react';
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
	text-align: center;
    font-size: 1.5em;
	width:  20%;
    height:  20%;
    margin-left: 10%;
    background: #1010100a;
    border: solid 2px gray;
    padding: 5%;
    cursor: pointer;

    ${AddButton}:hover{
        box-shadow: 1px 1px 10px 0px black;
    }
`

const LayerItem = styled.li.attrs({
    border: props => props.selected || '',
})`
    display: block;
    margin: auto;
    border: ${props => props.selected};
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
        layerData[layer].colors.push({h: '0', s: '50', l: '50', a: '0.5', amount: 50, id: uuid})
        this.props.dispatch(setLayers(layerData));
    }

    render() {
        const { layerData, selectedColor, layerIndex, editing, selectedColorId } =  this.props.layers;

        return (
            <div style={{bottom: "0"}}>
                {layerData[layerIndex].colors.map(color => {
                    return <LayerItem>
                                <ColorPicker
                                    h={color.h}
                                    s={color.s}
                                    l={color.l}
                                    a={color.a}
                                    name={color.id}
                                    disabled={color.id === selectedColorId} >
                                </ColorPicker>
                            </LayerItem>
                            })}
                <LayerItem>
                    {layerData[layerIndex].colors.length < 3 && layerIndex !== undefined 
                        ? (
                        <AddButton onClick={() => this.addColor(layerIndex)}>
                            <i class="fas fa-plus" />
                        </AddButton>) 
                        : null
                    }
                </LayerItem>
            </div>
        );
    }
}

function mapStateToProps({ layers }) {
	return {
		layers,
	}
}

export default connect(mapStateToProps)(Layer);