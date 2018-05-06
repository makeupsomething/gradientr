import React, { Component } from 'react';
import styled from 'styled-components';
import ColorPicker from './ColorPicker';

const AddButton = styled.button`
  	z-index: 2;
  	background-color: #ffffff42;
  	border: 3px solid black;
  	border-radius: 3px;
	text-align: center;
    color: white;
    font-size: 1.5em;
	width:  20%;
    height:  50px;
	margin-right: 5px;
`

const LayerItem = styled.li.attrs({
    border: props => props.selected || '',
})`
    display: block;
    margin: auto;
    margin-right: 100px;
    margin-bottom: 10px;
    border: ${props => props.selected};
`

class Layer extends Component {
    render() {
        const {layer, index, addColor, removeColor, checked, setColor, selectedColor} = this.props;

        return (
            <div>
                {layer.colors.map(color => {
                    return <LayerItem>
                                <ColorPicker
                                    h={color.h}
                                    s={color.s}
                                    l={color.l}
                                    a={color.a}
                                    amount={color.amount}
                                    name={color.id}
                                    layer={index}
                                    setColor={setColor}
                                    removeColor={removeColor}
                                    disabled={color.id === selectedColor} >
                                </ColorPicker>
                            </LayerItem>
                            })}
                <li>{layer.colors.length < 3 && index !== undefined ? (<AddButton onClick={() => addColor(index)}><i class="fas fa-plus" /></AddButton>) : null}</li>
            </div>
        );
    }
}

export default Layer;