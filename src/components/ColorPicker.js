import React, { Component } from 'react';
import styled from 'styled-components';
import { ChromePicker } from 'react-color';

const PickerObj = styled.span`
    display: inline;
    width: 100px;
    height: 100px;
`

const ColorBlock = styled.div.attrs({
    background: props => props.background || 'green',
})`
    display: inline-block;
    width: 40px;
    height: 40px;
    margin-right: 10px;
    background: ${props => props.background};
`

var inputStyles = {
    input: {
      border: "none",
      margin: "auto"
    },
  };

class ColorPicker extends Component {
    state = {
        picker: false,
        background: {h: 1, s: 50, l: 50, a: 1},
    };

    componentDidMount = () => {
        const { h, s, l, a } = this.props;
        let tmp = this.state.background;
        tmp = {h: parseInt(h), s: parseInt(s) / 100, l: parseInt(l) / 100, a: parseFloat(a)};
        this.setState({background: tmp});
    }

    componentDidUpdate = (prevProps, prevState, snapshot) => {
        const { h, s, l, a, name } = this.props;
        if(name != prevProps.name) {
            let tmp = this.state.background;
            tmp = {h: parseInt(h), s: parseInt(s) / 100, l: parseInt(l) / 100, a: parseFloat(a)};
            this.setState({background: tmp});
        }
    }

    togglePicker = (event) => {
        this.setState({picker: !this.state.picker})
    }

    handleChangeComplete = (color) => {
        const {amount, handleChange, name, top, left, layer } = this.props;
        this.setState({ background: color.hsl });
        handleChange(color.hsl, name, layer)
    };

    render() {
        const {amount, handleChange, top, left } = this.props;
        return (
            <span>
                <ColorBlock 
                    onClick={this.togglePicker} 
                    background={`hsla(${this.state.background.h}, ${this.state.background.s * 100}%, ${this.state.background.l * 100}%, ${this.state.background.a})`}
                />
                {this.state.picker ? <ChromePicker style={inputStyles} onChange={ this.handleChangeComplete } color={ this.state.background } /> : null}
            </span>
        );
    }
}

export default ColorPicker;