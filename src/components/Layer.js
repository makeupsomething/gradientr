import React, { Component } from 'react';
import styled from 'styled-components';
import ColorPicker from './ColorPicker';

const LayerLabel = styled.p`
  	width: 100%;
  	margin: auto;
	padding-left: 10px;
`

const AngleSlider = styled.div`
	margin: 10px 0;
	padding-left: 10px;
`

const AddButton = styled.button`
  	z-index: 2;
  	background-color: #ffffff42;
  	border: 2px solid gray;
  	border-radius: 3px;
	text-align: center;
	color: gray;
	width:  20%;
    height:  20%;
	margin-right: 5px;
`

const LayerItem = styled.li`
    display: inline;
`

class Layer extends Component {


    render() {
        const {layer, index, handleChange, handleColorChange, addColor, handleColorAmountChange, removeColor, checked} = this.props;
        return (
            <span>
                <LayerLabel>{`Layer ${index}`}</LayerLabel>
                <label>
                    Hide Layer
                    <input
                        name="hidden"
                        id={index}
                        type="checkbox"
                        checked={checked}
                        onChange={handleChange} />
                </label>
                <AngleSlider>
                    <label>Angle</label>
                    <input type="range" min="0" max="359" name="degree" id={index} value={layer.degree} onChange={handleChange} />
                </AngleSlider>
                <ul style={{"list-style-type": "none", margin: "0", padding: "0", paddingLeft: "10px"}}>
                    {layer.colors.map(color => {
                        return <span>
                                    <LayerItem>
                                        <ColorPicker
                                            h={color.h}
                                            s={color.s}
                                            l={color.l}
                                            a={color.a}
                                            amount={color.amount}
                                            name={color.id}
                                            handleChange={handleColorChange}>
                                        </ColorPicker>
                                    </LayerItem>
                                    <LayerItem>
                                        <input
                                            type="range"
                                            min="0"
                                            max="100"
                                            value={color.amount}
                                            name={color.id}
                                            onChange={handleColorAmountChange} />
                                    </LayerItem>
                                    <LayerItem>
                                        <AddButton onClick={removeColor} name={color.id} id={index}> 
                                            <i class="fas fa-trash" />
                                        </AddButton>
                                    </LayerItem>
                                </span>
                                })}
                    <li>{layer.colors.length < 3 && index != undefined ? (<AddButton name={index} onClick={addColor}><i class="fas fa-plus" />Color</AddButton>) : null}</li>
                </ul>
            </span>
        );
    }
}

export default Layer;