import React, { Component } from 'react';
import { connect } from 'react-redux';
import ColorPicker from './ColorPicker';
import AngleSlider from './AngleSlider';
import ColorDistSlider from './ColorDistSlider';
import { CodeEditor, CodeContainer } from '../styledComponents/CodeEditor';
import Highlight from 'react-highlight';

import {  
    AddButton, 
    ItemContainer, 
    ColorContainer, 
    CopyButton
} from '../styledComponents/ControlPanel';

import { 
	setLayers, 
} from '../actions/layers';

class Layer extends Component {

    uuidv4 = () => {
        return ([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g, c =>
          (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
        )
    }

    addColor = () => {
        const { layerData, layerIndex } =  this.props.layers;
        let uuid = this.uuidv4()
        layerData[layerIndex].colors.push({h: '185', s: '100', l: '50', a: '0.75', amount: 50, id: uuid})
        this.props.dispatch(setLayers(layerData));
    }

    copyToClipboard = (str) => {
        const el = document.createElement('textarea');
        el.value = str;
        el.setAttribute('readonly', '');
        el.style.position = 'absolute';
        el.style.left = '-9999px';
        document.body.appendChild(el);
        el.select();
        document.execCommand('copy');
        document.body.removeChild(el);
    };

    render() {
        const { layerData, layerIndex, selectedColorId, gradientString } =  this.props.layers;

        return (
            <ItemContainer>
                <ColorContainer>
                {layerData[layerIndex].colors.map(color => {
                    return (
                    <ColorPicker
                        color={color}
                        name={color.id}
                        selected={color.id === selectedColorId} >
                    </ColorPicker>)
                    })}
                    {layerData[layerIndex].colors.length < 5 ? (
                    <AddButton onClick={() => this.addColor()}>
                        <i class="fas fa-plus" />
                    </AddButton>) : null}
                </ColorContainer>
                <ColorDistSlider />
                <AngleSlider />
                <CodeContainer>
                    <CodeEditor>
                        <Highlight language="css">
                                {`background: ${gradientString}`}
                        </Highlight>
                    </CodeEditor>
                    <CopyButton onClick={() => this.copyToClipboard(gradientString)}>
                        <i class="fas fa-copy" />
                    </CopyButton>
                </CodeContainer>
            </ItemContainer>
        );
    }
}

function mapStateToProps({ layers }) {
	return {
		layers,
	}
}

export default connect(mapStateToProps)(Layer);