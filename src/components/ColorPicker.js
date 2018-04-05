import React, { Component } from 'react';
import styled from 'styled-components';


const PickerObj = styled.div.attrs({
    top: props => props.top,
    left: props => props.left,
})`
    width: 170px;
    height: 170px;
    background: grey;
`

const ColorBlock = styled.div.attrs({
    background: props => props.background || 'green',
    top: props => props.top,
})`
    width: 100px;
    height: 100px;
    margin: auto;
    background: ${props => props.background};
`

const Slider = styled.input`
    margin: auto;
    width: 150px;
    left: 5px;
`

class ColorPicker extends Component {
    render() {
        const { h, s, l, handleChange, name, top, left } = this.props;

        return (
            <PickerObj top={top} left={left}>
                <ColorBlock top="0px" background={`hsl(${h}, ${s}%, ${l}%)`}/>
                <Slider type="range" min="0" max="359" name={`${name}h`} value={h} onChange={handleChange} />
                <Slider type="range" min="0" max="100" name={`${name}s`} value={s} onChange={handleChange} />
                <Slider type="range" min="0" max="100" name={`${name}l`} value={l} onChange={handleChange} /> 
            </PickerObj>
        );
    }
}

export default ColorPicker;