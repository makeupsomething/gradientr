import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';

import { 
	setSelectedColor, 
	setCurrentLayer,
} from '../actions/layers';

const Tablink = styled.button.attrs({
	backgroundColor: props => props.editing ?  '#7b7b7b1f' : '#272727',
    transition: props => props.editing ? 'background-color .1s linear' : 'background-color 5s linear',
    borderBottom: props => props.selected ? 'lightblue' : 'gray',
})`
    background-color: ${props => props.backgroundColor};
	color: white;
    border: none;
    outline: none;
    cursor: pointer;
    padding: 14px 16px;
    font-size: 17px;
	width: 50%;
    border-bottom: solid 3px ${props => props.borderBottom};
    transition: ${props => props.transition};
	
	${Tablink}:hover {
    	border-bottom: solid 3px hotpink;
	}
`

function Tab(props) {
    const { index } = props
    const { layerIndex, editing } =  props.layers;

    return (
        <Tablink editing={editing} selected={layerIndex === index} onClick={() => toggleTab(index, props)}>
            {index < 2 ? (`Layer ${index+1}`) : (`</>`)}
        </Tablink>
    )
}

function toggleTab(layer, props) {
    const { layerData } =  props.layers;
	props.dispatch(setCurrentLayer({ layerIndex: layer }))
	if(layer !== 2) {
		props.dispatch(setSelectedColor(layerData[layer].colors[0].id))
	}
}

function mapStateToProps({ layers }) {
	return {
		layers,
	}
}

export default connect(mapStateToProps)(Tab);