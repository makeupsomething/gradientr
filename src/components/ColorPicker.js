import React, { Component } from 'react';
import styled from 'styled-components';

const ColorBlock = styled.div.attrs({
    background: props => props.background || 'green',
})`
    width: 100%;
    height: 50%;
    background: ${props => props.background};
    display: inline-block;
`

const RemoveButton = styled.button`
    height: 80%;
    width: 14%;
    float: right;
    margin-right: 5%;
    background: #ffffff00;
    font-size: 2em;
    color: white;
    border: none;
`

class ColorPicker extends Component {
    state = {
        picker: false,
        background: {h: 1, s: 50, l: 50, a: 1},
    };

    componentDidMount = () => {
        const { h, s, l, a } = this.props;
        let tmp = this.state.background;
        tmp = {h: parseInt(h, 10), s: parseInt(s, 10) / 100, l: parseInt(l, 10) / 100, a: parseFloat(a, 10)};
        this.setState({background: tmp});
    }

    componentDidUpdate = (prevProps, prevState, snapshot) => {
        const { h, s, l, a, name } = this.props;
        
        if(name !== prevProps.name) {
            let tmp = this.state.background;
            tmp = {h: parseInt(h, 10), s: parseInt(s, 10) / 100, l: parseInt(l, 10) / 100, a: parseFloat(a, 10)};
            this.setState({background: tmp});
        } else {
            if (parseInt(h, 10) !== this.state.background.h || parseInt(s, 10) / 100 !== this.state.background.s || parseInt(l, 10) / 100 !== this.state.background.l || parseFloat(a, 10) !== this.state.background.a ) {
                let tmp = this.state.background;
                tmp = {h: parseInt(h, 10), s: parseInt(s, 10) / 100, l: parseInt(l, 10) / 100, a: parseFloat(a, 10)};
                this.setState({background: tmp});
            }
        }
    }

    toggleColor = (event) => {
        const { setColor, name } = this.props;
        setColor(name)
    }

    removeColor = (event) => {
        event.stopPropagation();
        const { removeColor, name, layer } = this.props;
        removeColor(name, layer)
    }

    render() {
        const { disabled } = this.props;
        return (
            <span>
                <ColorBlock 
                    onClick={this.toggleColor} 
                    background={`hsla(${this.state.background.h}, ${this.state.background.s * 100}%, ${this.state.background.l * 100}%, ${this.state.background.a})`}
                    selected={disabled ? 'solid black 3px' : null}
                >
                <RemoveButton onClick={this.removeColor}><i class="fas fa-times" /></RemoveButton>
                </ColorBlock>
            </span>
        );
    }
}

export default ColorPicker;