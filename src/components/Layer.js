import React, { Component } from 'react';
import styled from 'styled-components';
import ColorPicker from './ColorPicker';

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
    display: block;
    border: ${props => props.selected};
`

const ColorEditor = styled.div.attrs({
    border: props => props.selected || '',
})`
    border: ${props => props.selected};
`

class Layer extends Component {
    render() {
        const {layer, index, addColor, removeColor, checked, setColor, selectedColor} = this.props;

        return (
            <div>
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
                                        setColor={setColor}
                                        removeColor={removeColor}
                                        disabled={color.id === selectedColor} >
                                    </ColorPicker>
                                </LayerItem>
                            </ColorEditor>
                            })}
                <li>{layer.colors.length < 3 && index !== undefined ? (<AddButton onClick={() => addColor(index)}><i class="fas fa-plus" />Color</AddButton>) : null}</li>
            </div>
        );
    }
}

export default Layer;