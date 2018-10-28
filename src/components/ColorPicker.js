import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';

import { 
	setLayers, 
	setSelectedColor, 
	setCurrentLayer,
	setEdting,
} from '../actions/layers';

const Section = styled.div`

    margin-right: 10%;
    margin-left: 10%;
    cursor: pointer;

    ${Section}:hover{
        box-shadow: 1px 1px 10px 0px black;
    }
`

const ColorBlock = styled.div.attrs({
    background: props => props.background || 'green',
})`
    max-height: 100%;
    margin-left: 5%;
    padding: 5% 8%;
    background: ${props => props.background};
    display: inline;
    vertical-align: center;
`

const ColorValue = styled.input`
    width: 55%;
    height: 100%;
    padding: 3% 2%;
    margin-left: 3%;
    font-size: 1em;
    border: none;
    border-radius: 10px;
`

const AmountValue = styled.input`
    width: 10%;
    height: 100%;
    padding: 3% 2%;
    margin-left: 3%;
    font-size: 1em;
`

const RemoveButton = styled.button`
    width: 40px;
    height: 100%;
    margin-left: 3%;
    background: #ffffff00;
    text-align: center;
    display: inline;
    border: none;
    color: "darkgray";

    ${RemoveButton}:hover{
        box-shadow: 1px 1px 10px 0px black;
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
        const { name } = this.props;
        this.props.dispatch(setSelectedColor(name))
    }

    removeColor = (event) => {
        event.stopPropagation();
        const { name } = this.props;
        const { layerData, layerIndex } =  this.props.layers;
        layerData[layerIndex].colors = layerData[layerIndex].colors.filter(color => color.id !== name)
        this.props.dispatch(setLayers(layerData));
    }

    render() {
        const { disabled } = this.props;
        return (
            <Section onClick={this.toggleColor} style={{background: disabled ? "#1010100a" : "", marginBottom: "2%", padding: "4% 1%", border: disabled ? "solid 2px gray": ""}}>
                <ColorBlock  
                    background={`hsla(${this.state.background.h}, ${this.state.background.s * 100}%, ${this.state.background.l * 100}%, ${this.state.background.a})`}
                    selected={disabled ? 'solid black 3px' : null}
                >
                </ColorBlock>
                <ColorValue value={`hsla(${this.state.background.h}, ${this.state.background.s * 100}%, ${this.state.background.l * 100}%, ${this.state.background.a})`} />
                {!disabled ? <RemoveButton onClick={this.removeColor}>
                    <a style={{fontSize: "3em", verticalAlign: "-31%"}} class="fas fa-times" />
                </RemoveButton> : null}
            </Section>
        );
    }
}

function mapStateToProps({ layers }) {
	return {
		layers,
	}
}

export default connect(mapStateToProps)(ColorPicker);