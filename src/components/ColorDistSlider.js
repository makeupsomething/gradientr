import React, { Component } from 'react';
import Slider, { Range } from 'rc-slider';
import 'rc-slider/assets/index.css';

class ColorDistSlider extends Component {
    state = {
        colors: [],
        amounts: [],
    };

    componentDidMount = () => {
        const { colors } = this.props;
        let a = colors.map(color => (color.amount));
        console.log(a)
        this.setState({colors: colors});
    }

    componentDidUpdate = (prevProps, prevState, snapshot) => {
        const { colors } = this.props;
        let a = colors.map(color => color.amount);

        if(colors.length !== this.state.colors.length) {
            this.setState({colors: colors});
        }
    }

    handleChange = (value) => {
        const { layer, handleColorAmountChange } = this.props;
        let tmp = this.state.colors
        tmp.forEach((color, index) => color.amount = value[index])
        this.setState({ colors: tmp });
        handleColorAmountChange(layer, this.state.colors)  
    }

    render() {
        return (
            <div>
                {this.state.colors.length > 0 ? <Range min={0} max={100} value={this.state.colors.map(color => color.amount)} onChange={this.handleChange} allowCross={false}/> : null}
            </div>
        );
    }
}

export default ColorDistSlider;