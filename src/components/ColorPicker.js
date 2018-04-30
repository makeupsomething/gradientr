import React, { Component } from 'react';
import styled from 'styled-components';

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
        
        if(name !== prevProps.name) {
            let tmp = this.state.background;
            tmp = {h: parseInt(h), s: parseInt(s) / 100, l: parseInt(l) / 100, a: parseFloat(a)};
            this.setState({background: tmp});
        } else {
            if (parseInt(h) !== this.state.background.h || parseInt(s) / 100 !== this.state.background.s || parseInt(l) / 100 !== this.state.background.l || parseFloat(a) !== this.state.background.a ) {
                let tmp = this.state.background;
                tmp = {h: parseInt(h), s: parseInt(s) / 100, l: parseInt(l) / 100, a: parseFloat(a)};
                this.setState({background: tmp});
            }
        }
    }

    toggleColor = (event) => {
        const { setColor, name } = this.props;
        setColor(name)
    }

    // Move picker up tp App.js, it will be the top element in the sidebar and always showing
    // Clicking on a color block will focus the picker for that color
    // The color + options will also be highlighted
    // Probably move the block up to layer component and get rid of this file later
    render() {
        return (
            <span>
                <ColorBlock 
                    onClick={this.toggleColor} 
                    background={`hsla(${this.state.background.h}, ${this.state.background.s * 100}%, ${this.state.background.l * 100}%, ${this.state.background.a})`}
                />
            </span>
        );
    }
}

export default ColorPicker;