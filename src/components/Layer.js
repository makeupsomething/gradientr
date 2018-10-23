import React, { Component } from 'react';
import styled from 'styled-components';
import ColorPicker from './ColorPicker';

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
    render() {
        const {layer, index, addColor, removeColor, checked, setColor, selectedColor} = this.props;

        return (
            <Context.Consumer>
                {(state) => (          
                    <div style={{bottom: "0"}}>
                        {layer.colors.map(color => {
                            return <LayerItem>
                                        <ColorPicker
                                            h={color.h}
                                            s={color.s}
                                            l={color.l}
                                            a={color.a}
                                            amount={color.amount}
                                            name={color.id}
                                            layer={state.index}
                                            setColor={setColor}
                                            removeColor={removeColor}
                                            disabled={color.id === selectedColor} >
                                        </ColorPicker>
                                    </LayerItem>
                                    })}
                        <LayerItem>{layer.colors.length < 3 && index !== undefined ? (<AddButton onClick={() => addColor(index)}><i class="fas fa-plus" /></AddButton>) : null}</LayerItem>
                    </div>
                )}
            </Context.Consumer>
        );
    }
}

export default Layer;