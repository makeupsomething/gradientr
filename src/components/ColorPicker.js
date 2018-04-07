import React, { Component } from 'react';
import styled from 'styled-components';


const PickerObj = styled.div.attrs({
    top: props => props.top,
    left: props => props.left,
})`
    width: 100%;
    height: 200px;
    margin: auto;
`

const ColorBlock = styled.div.attrs({
    background: props => props.background || 'green',
    top: props => props.top,
})`
    width: 80%;
    height: 100px;
    margin: auto;
    background: ${props => props.background};
`

const Slider = styled.input`
    margin: auto;
    width: 100%;
    left: 5px;
`

class ColorPicker extends Component {
    render() {
        const { h, s, l, a, amount, handleChange, name, top, left } = this.props;

        return (
            <PickerObj top={top} left={left}>
                <ColorBlock top="0px" background={`hsla(${h}, ${s}%, ${l}%, ${a})`}/>
                <Slider type="range" min="0" max="359" name={`${name}h`} value={h} onChange={handleChange} />
                <Slider type="range" min="0" max="100" name={`${name}s`} value={s} onChange={handleChange} />
                <Slider type="range" min="0" max="100" name={`${name}l`} value={l} onChange={handleChange} />
                <Slider type="range" min="0" max="1" step="0.1" name={`${name}a`} value={a} onChange={handleChange} /> 
                <Slider type="range" min="0" max="100" name={`${name}amount`} value={amount} onChange={handleChange} />  
            </PickerObj>
        );
    }
}

export default ColorPicker;