import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Range } from 'rc-slider';
import 'rc-slider/assets/index.css';
import 'rc-tooltip/assets/bootstrap.css';

import { 
	setLayers, 
	setSelectedColor, 
	setCurrentLayer,
	setEdting,
} from '../actions/layers';

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
        const { layerData, selectedColor, layerIndex, editing, selectedColorId } =  this.props.layers;
        this.setState({colors: layerData[layerIndex].colors});
    }

    componentDidUpdate = (prevProps, prevState, snapshot) => {
        const { layerData, selectedColor, layerIndex, editing, selectedColorId } =  this.props.layers;
        if(layerData[layerIndex].colors.length !== this.state.colors.length) {
            this.setState({colors: layerData[layerIndex].colors});
        } else {
            if(!layerData[layerIndex].colors.every((v,i)=> v === this.state.colors[i])) {
                this.setState({colors: layerData[layerIndex].colors});
            }
        }
    }

    handleChange = (value) => {
        const { layerData, selectedColor, layerIndex, editing, selectedColorId } =  this.props.layers;
        layerData[layerIndex].colors.forEach((color, index) => color.amount = value[index])
        this.props.dispatch(setLayers(layerData));
    }

    getHandleColors = () => {
        const { layerData, selectedColor, layerIndex, editing, selectedColorId } =  this.props.layers;
        let handleVals = []
        layerData[layerIndex].colors.forEach((color, index) => {
            handleVals.push({backgroundColor: 
                `hsla(${layerData[layerIndex].colors[index].h}, ${layerData[layerIndex].colors[index].s}%, ${layerData[layerIndex].colors[index].l}%, ${layerData[layerIndex].colors[index].a})`
            , height: "30px", borderRadius: "20%"});
        });
        return handleVals;
    }

    getTrackStyle = () => {
        const { layerData, selectedColor, layerIndex, editing, selectedColorId } =  this.props.layers;
        let trackVals = []
        layerData[layerIndex].colors.forEach(color => {
            trackVals.push({backgroundColor: `#abe2fb00`})
        })
        return trackVals
    }

    getRailStyle = () => {
        const { layerData, selectedColor, layerIndex, editing, selectedColorId } =  this.props.layers;
        let str = '';
        str+= `linear-gradient(90deg, `;
        layerData[layerIndex].colors.forEach((color, index) => {
            str+= `hsla(${color.h}, ${color.s}%, ${color.l}%,  ${color.a}) ${color.amount}%`
        	str+= index === layerData[layerIndex].colors.length-1 ? `)` : ',';
        });
        return str
    }

    finishEditing = () => {
        this.props.dispatch(setEdting(false))
    }

    render() {
        const { layerData, selectedColor, layerIndex, editing, selectedColorId } =  this.props.layers;

        return (
            <div>
                {layerData[layerIndex].colors.length > 0 ? <Range 
                min={0} 
                max={100}  
                pushable={5} 
                marks={marks}
                dotStyle={{top: "16px"}}
                style={{height: "20px", width: "90%", margin: "30px auto"}}
                value={layerData[layerIndex].colors.map(color => color.amount)} 
                handleStyle={this.getHandleColors()} 
                trackStyle={this.getTrackStyle()}
                railStyle={{background: this.getRailStyle(), height: "20px"}} 
                onChange={this.handleChange} 
                onAfterChange={this.finishEditing}
                allowCross={false}/> : null}
            </div>
        );
    }
}

function mapStateToProps({ layers }) {
	return {
		layers,
	}
}

export default connect(mapStateToProps)(ColorDistSlider);