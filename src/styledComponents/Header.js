import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';

import { 
    hideContainer
} from '../actions/layers';

export const Header = styled.header`
    width: 100vw;
    background-color: #4c4c4c;
    font-size: 2em;
    color: white;
    margin-bottom: 20px;
    padding: 5px;
    display: flex;
    justify-content: space-between;
    align-items: center;
`

export const Title = styled.span`
    align-self: flex-start;
`

export const Button = styled.button`
    margin: 5px;
    margin-right: 15px;
    border: none;
    outline: none;
    cursor: pointer;
    font-size: 17px;
    background-color: inherit;
    color: white;
    border-bottom: solid 3px lightblue;
`

function HideContainerButton(props) {
    const { hidden } =  props.layers;

    return (
        <Button onClick={() => toggleContainer(props)}>
            {hidden ? ("Show Container") : ("Hide Container")}
        </Button>
    )
}

function toggleContainer(props) {
	const { hidden } = props.layers;
	props.dispatch(hideContainer(!hidden))
}

function mapStateToProps({ layers }) {
	return {
		layers,
	}
}

export default connect(mapStateToProps)(HideContainerButton);