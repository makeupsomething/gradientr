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
	width: 40px;
	margin-right: 5px;
`

class Layer extends Component {


    render() {
        const {layer, index, handleChange, handleColorChange, addColor, handleColorAmountChange, removeColor, checked} = this.props;
        return (
            <span style={{display: "inline", width: "20%"}}>
            <LayerLabel>{`Layer ${index}`}</LayerLabel>
            <label style={{display: "inline"}}>Hide Layer<input
							name="hidden"
							id={index}
							type="checkbox"
							checked={checked}
							onChange={handleChange} /></label>
            <AngleSlider>
                <label>Angle</label>
                <input type="range" min="0" max="359" name="degree" id={index} value={layer.degree} onChange={handleChange} />
            </AngleSlider>
            <ul style={{"list-style-type": "none", margin: "0", padding: "0", paddingLeft: "10px"}}>
            {layer.colors.map(color => {
                return <div>
                        <li>
                            <ColorPicker 
                                h={color.h}
                                s={color.s}
                                l={color.l}
                                a={color.a}
                                amount={color.amount}
                                name={color.id}
                                handleChange={handleColorChange}>
                            </ColorPicker>
                        </li>
                        <li>
                        <input
							style={{width: "35px", "margin-right": "10px"}}
							type="range"
							min="0"
							max="100"
							value={color.amount}
							name={color.id}
							onChange={handleColorAmountChange} />
						</li>
                        <li>
							<AddButton onClick={removeColor} name={color.id} id={index}> 
							    remove color
							</AddButton>
                        </li>
                        </div>
                        })}
            <li>{layer.colors.length < 3 && index != undefined ? (<AddButton name={index} onClick={addColor}><i class="fas fa-plus" />Color</AddButton>) : null}</li>
            </ul>
            </span>
        );
    }
}

export default Layer;