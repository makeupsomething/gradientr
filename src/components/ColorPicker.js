import React, { Component } from 'react';
import styled from 'styled-components';
import { ChromePicker } from 'react-color';

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
    height: 40px;
    margin: auto;
    background: ${props => props.background};
`

const Slider = styled.input`
    margin: auto;
    width: 100%;
    left: 5px;
`

class ColorPicker extends Component {
    state = {
        picker: false,
        background: '#fff',
    };

    componentDidMount = () => {
        const { h, s, l, a, amount, handleChange, name, top, left } = this.props;
        this.setState({background: {h, s, l, a}})
    }

    togglePicker = (event) => {
        this.setState({picker: !this.state.picker})
    }

    handleChangeComplete = (color) => {
        const {amount, handleChange, name, top, left } = this.props;
        this.setState({ background: color.hsl });
        handleChange(color.hsl, name)
    };

    render() {
        const {amount, handleChange, name, top, left } = this.props;
        return (
            <PickerObj top={top} left={left}>
                <ColorBlock onClick={this.togglePicker} top="0px" background={`hsla(${this.state.background.h}, ${this.state.background.s * 100}%, ${this.state.background.l * 100}%, ${this.state.background.a})`}/>
                {this.state.picker ? <ChromePicker onChange={ this.handleChangeComplete } color={ this.state.background } /> : null}
            </PickerObj>
        );
    }
}

export default ColorPicker;