import React, { Component } from 'react';
import styled from 'styled-components';
import { ChromePicker } from 'react-color';

const Container = styled.div`
  	width: 75%;
    margin: auto;
    border: solid 2px black;
`

class ControlPanel extends Component {
    render() {
        const {h, s, l, a, handleColorChange} = this.props;

        return (
            <Container>
            </Container>
        )
    }
}

export default ControlPanel;
