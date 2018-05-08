import React, { Component } from 'react';
import styled from 'styled-components';

const ColorBlock = styled.div.attrs({
    background: props => props.background || 'green',
})`
    width: 10%;
    max-height: 100%;
    margin-left: 5%;
    padding: 5% 8%;
    background: ${props => props.background};
    display: inline;
    vertical-align: center;
`

const ColorValue = styled.input`
    width: 50%;
    height: 100%;
    padding: 3% 2%;
    margin-left: 3%;
    font-size: 1em;
    vertical-align: center;
`

const AmountValue = styled.input`
    width: 10%;
    height: 100%;
    padding: 3% 2%;
    margin-left: 3%;
    font-size: 1em;
`

const RemoveButton = styled.button`
    width: 10%;
    height: 100%;
    margin-left: 3%;
    background: #ffffff00;
    text-align: center;
    display: inline;
    border: none;
    color: "darkgray";

    ${RemoveButton}:hover{
        color: black;
    }
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
                <div style={{marginBottom: "2%", padding: "4% 1%", border: disabled ? "solid 2px gray": ""}}>
                <ColorBlock 
                    onClick={this.toggleColor} 
                    background={`hsla(${this.state.background.h}, ${this.state.background.s * 100}%, ${this.state.background.l * 100}%, ${this.state.background.a})`}
                    selected={disabled ? 'solid black 3px' : null}
                >
                </ColorBlock>
                <ColorValue value={`hsla(${this.state.background.h}, ${this.state.background.s * 100}%, ${this.state.background.l * 100}%, ${this.state.background.a})`} />
                <RemoveButton onClick={this.removeColor}><a style={{fontSize: "3em", verticalAlign: "-31%"}} class="fas fa-times" /></RemoveButton>

                </div>
        );
    }
}

export default ColorPicker;