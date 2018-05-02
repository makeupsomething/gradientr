import React, { Component } from 'react';
import styled from 'styled-components';

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

    render() {
        return (
            <span>
                <ColorBlock 
                    onClick={this.toggleColor} 
                    background={`hsla(${this.state.background.h}, ${this.state.background.s * 100}%, ${this.state.background.l * 100}%, ${this.state.background.a})`}
                >
                <p>edit</p>
                </ColorBlock>
            </span>
        );
    }
}

export default ColorPicker;