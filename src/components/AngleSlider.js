import React, { Component } from 'react';
import { connect } from 'react-redux';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';

import { 
	setLayers, 
	setSelectedColor, 
	setCurrentLayer,
	setEdting,
} from '../actions/layers';

const marks = {
	0: {label: '0°', style: {top: '14px'}},
	20: {label: '20°', style: {top: '14px'}},
	40: {label: '40°', style: {top: '14px'}},
	60: {label: '60°', style: {top: '14px'}},
	80: {label: '80°', style: {top: '14px'}},
	100: {label: '100°', style: {top: '14px'}},
	120: {label: '120°', style: {top: '14px'}},
	140: {label: '140°', style: {top: '14px'}},
	160: {label: '160°', style: {top: '14px'}},
	180: {label: '180°', style: {top: '14px'}},
	200: {label: '200°', style: {top: '14px'}},
	220: {label: '220°', style: {top: '14px'}},
	240: {label: '240°', style: {top: '14px'}},
	260: {label: '260°', style: {top: '14px'}},
	280: {label: '280°', style: {top: '14px'}},
	300: {label: '300°', style: {top: '14px'}},
	320: {label: '320°', style: {top: '14px'}},
	340: {label: '340°', style: {top: '14px'}},
	360: {label: '360°', style: {top: '14px'}},
	360: {label: '360°', style: {top: '14px'}},
};

class AngleSlider extends Component {

	handleChange = (value) => {
        const { layerData, selectedColor, layerIndex, editing, selectedColorId } =  this.props.layers;
        layerData[layerIndex].degree = value
        this.props.dispatch(setLayers(layerData));
	}

	finishEditing = () => {
        this.props.dispatch(setEdting(false))
    }
	
    render() {

        const { layerData, layerIndex } = this.props.layers;

        return (
            <Slider 
                min={0} 
                max={360} 
                marks={marks} 
                style={{height: "20px", width: "90%", margin: "30px auto"}}
                railStyle={{height: "20px"}} 
                handleStyle={{height: "30px", borderRadius: "20%"}} 
                trackStyle={{backgroundColor: `#abe2fb00`}}
                dotStyle={{top: "16px"}}
                onChange={this.handleChange}
                onAfterChange={this.finishEditing}
                value={layerData[layerIndex].degree}
            />
        );
    }
}

function mapStateToProps({ layers }) {
	return {
		layers,
	}
}

export default connect(mapStateToProps)(AngleSlider);