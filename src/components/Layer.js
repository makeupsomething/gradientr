import React, { Component } from 'react';
import styled from 'styled-components';
import ColorPicker from './ColorPicker';

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

const LayerItem = styled.li.attrs({
    border: props => props.selected || '',
})`
    display: inline;
    border: ${props => props.selected};
`

const ColorEditor = styled.div.attrs({
    border: props => props.selected || '',
})`
    border: ${props => props.selected};
`

class Layer extends Component {
    render() {
        const {layer, index, handleChange, addColor, handleColorAmountChange, removeColor, checked, setColor, selectedColor} = this.props;

        return (
            <span>
                <label>
                    Hide Layer
                    <input
                        type="checkbox"
                        checked={checked}
                        onChange={() => handleChange(index, "hidden", !checked)} />
                </label>
                <AngleSlider>
                    <label>Angle</label>
                    <input type="range" min="0" max="359" value={layer.degree} onChange={(event) => handleChange(index, "degree", event.target.value)} />
                </AngleSlider>
                <ul style={{"list-style-type": "none", margin: "0", padding: "0", paddingLeft: "10px"}}>
                    {layer.colors.map(color => {
                        return <ColorEditor selected={color.id === selectedColor ? "solid 2px black" : null}>
                                    <LayerItem>
                                        <ColorPicker
                                            h={color.h}
                                            s={color.s}
                                            l={color.l}
                                            a={color.a}
                                            amount={color.amount}
                                            name={color.id}
                                            layer={index}
                                            setColor={setColor}>
                                        </ColorPicker>
                                    </LayerItem>
                                    <LayerItem>
                                        <AddButton disabled={color.id === selectedColor} onClick={() => removeColor(color.id, index)}> 
                                            <i class="fas fa-trash" />
                                        </AddButton>
                                    </LayerItem>
                                </ColorEditor>
                                })}
                    <li>{layer.colors.length < 3 && index !== undefined ? (<AddButton onClick={() => addColor(index)}><i class="fas fa-plus" />Color</AddButton>) : null}</li>
                </ul>
            </span>
        );
    }
}

export default Layer;