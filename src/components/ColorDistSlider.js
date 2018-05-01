import React, { Component } from 'react';
import Slider, { Range } from 'rc-slider';
import 'rc-slider/assets/index.css';

class ColorDistSlider extends Component {
    state = {
        amounts: [],
    };

    componentDidMount = () => {
        const { colors } = this.props;
        let a = colors.map(color => color.amount);
        this.setState({amounts: a});
    }

    componentDidUpdate = (prevProps, prevState, snapshot) => {
        const { colors } = this.props;
        let a = colors.map(color => color.amount);

        if(a.length !== this.state.amounts.length) {
            console.log(a)
            this.setState({amounts: a});
        }
    }

    handleChange = (value) => {
        this.setState({ amounts: value });
      };

    render() {
        return (
            <div>
                {this.state.amounts.length > 0 ? <Range min={0} max={100} value={this.state.amounts} onChange={this.handleChange} /> : null}
            </div>
        );
    }
}

export default ColorDistSlider;