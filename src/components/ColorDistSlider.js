import React, { Component } from 'react';
import { Range } from 'rc-slider';
import Tooltip from 'rc-tooltip';
import 'rc-slider/assets/index.css';
import 'rc-tooltip/assets/bootstrap.css';

const marks = {
    0: {label: '0%', style: {top: '14px'}},
    25: {label: '25%', style: {top: '14px'}},
    50: {label: '50%', style: {top: '14px'}},
    75: {label: '75%', style: {top: '14px'}},
	100: {label: '100%', style: {top: '14px'}},
};

class ColorDistSlider extends Component {
    state = {
        colors: [],
        amounts: [],
    };

    componentDidMount = () => {
        const { colors } = this.props;
        this.setState({colors: colors});
    }

    componentDidUpdate = (prevProps, prevState, snapshot) => {
        const { colors } = this.props;
        if(colors.length !== this.state.colors.length) {
            this.setState({colors: colors});
        } else {
            if(!colors.every((v,i)=> v === this.state.colors[i])) {
                this.setState({colors: colors});
            }
        }
    }

    handleChange = (value) => {
        const { layer, handleColorAmountChange } = this.props;
        let tmp = this.state.colors
        tmp.forEach((color, index) => color.amount = value[index])
        this.setState({ colors: tmp });
        handleColorAmountChange(layer, this.state.colors)  
    }

    getHandleColors = () => {
        let handleVals = []
        this.state.colors.forEach((color, index) => {
            handleVals.push({backgroundColor: 
                `hsla(${this.state.colors[index].h}, ${this.state.colors[index].s}%, ${this.state.colors[index].l}%, ${this.state.colors[index].a})`
            , height: "30px", borderRadius: "20%"});
        });
        return handleVals;
    }

    getTrackStyle = () => {
        let trackVals = []
        this.state.colors.forEach(color => {
            trackVals.push({backgroundColor: `#abe2fb00`})
        })
        return trackVals
    }

    getRailStyle = () => {
        let str = '';
        str+= `linear-gradient(90deg, `;
        this.state.colors.forEach((color, index) => {
            str+= `hsla(${color.h}, ${color.s}%, ${color.l}%,  ${color.a}) ${color.amount}%`
        	str+= index === this.state.colors.length-1 ? `)` : ',';
        });
        return str
    }

    render() {
        return (
            <div>
                {this.state.colors.length > 0 ? <Range 
                min={0} 
                max={100}  
                pushable={5} 
                marks={marks}
                dotStyle={{top: "16px"}}
                style={{height: "20px", width: "90%", margin: "30px auto"}}
                value={this.state.colors.map(color => color.amount)} 
                handleStyle={this.getHandleColors()} 
                trackStyle={this.getTrackStyle()}
                railStyle={{background: this.getRailStyle(), height: "20px"}} 
                onChange={this.handleChange} 
                allowCross={false}/> : null}
            </div>
        );
    }
}

export default ColorDistSlider;