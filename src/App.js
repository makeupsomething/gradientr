import React, { Component } from 'react';
import styled from 'styled-components';
import './App.css';
import Layer from './components/Layer';
import ControlPanel from './components/ControlPanel';
import AngleSlider from './components/AngleSlider';
import ColorDistSlider from './components/ColorDistSlider';
import { ChromePicker } from 'react-color';
import Highlight from 'react-highlight';
import CustomPicker from './components/CustomPicker';
import LayerToggle from './components/LayerToggle';

import Wrapper from './styledComponents/Wrapper';
import Background from './styledComponents/Background';
import CodeEditor from './styledComponents/CodeEditor';
import Container from './styledComponents/Container';
import Tablink from './styledComponents/Tablink';
import ToggleButton from './styledComponents/ToggleButton';
import TabContent from './styledComponents/TabContent';
import LayerItem from './styledComponents/LayerItem';


class App extends Component {
	state = {
		layers: [
			{degree: 93, hidden: false, colors:[{h: '359', s: '88', l: '68', a: '0.7', amount: 25, name: "color01", id: "color01"}, 
			{h: '199', s: '100', l: '60', a: '0.6', amount: 75, name: "color02", id: "color02"}]},
			{degree: 181, hidden: false, colors:[{h: '98', s: '93', l: '50', a: '0.5', amount: 30, name: "color11", id: "color11"}, 
			{h: '191', s: '92', l: '50', a: '0.5', amount: 70, name: "color12", id: "color12"}]}
		],
		containerHidden: false,
		background: '100%',
		selectedColorId: 'color01',
		currentLayer: 0,
		editing: false,
	};

handleColorChange = (color) => {
	let tmp = this.state.layers;
	
    tmp.forEach(layer => {
		layer.colors.forEach(c => {
			if(this.state.selectedColorId === c.id) {
				c.h = color.hsl.h;
				c.s = color.hsl.s * 100;
				c.l = color.hsl.l * 100;
				c.a = color.hsl.a;
			}
		});
    });

    this.setState({
		colors: tmp
	});
}

handleChange = (value) => {
	if(!this.state.editing) {
		this.setState({editing: true})
	}
	let tmp = this.state.layers

	if(value.length) {
		tmp[this.state.currentLayer].colors = value
	} else {
		tmp[this.state.currentLayer].degree= value
	}

    this.setState({
		layers: tmp
    });
}

finishEditing = () => {
	this.setState({editing: false})
}

uuidv4 = () => {
	return ([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g, c =>
	  (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
	)
}

addColor = (layer) => {
	if(layer === undefined) {
		return
	}
	let tmpColors = this.state.layers
	let uuid = this.uuidv4()
	tmpColors[layer].colors.push({h: '0', s: '50', l: '50', a: '0.5', amount: 50, id: uuid})
    this.setState({ layers: tmpColors });
}

togglePanel = (event) => {
	event.stopPropagation()
	this.setState({containerHidden: !this.state.containerHidden})
}

removeColor = (id, layer) => {
	let tmpColors = this.state.layers;
	tmpColors[layer].colors = this.state.layers[layer].colors.filter(color => color.id !== id)
	this.setState({ layers: tmpColors });	
}

getString = () => {
	let str = '';
	let strColors = this.state.layers.filter(({hidden}) => !hidden)

	strColors.forEach((layer, index) => {
		str+= `\nlinear-gradient(${layer.degree}deg, `;
        layer.colors.forEach((color, index) => {
        	str+= `\nhsla(${color.h}, ${color.s}%, ${color.l}%,  ${color.a}) ${color.amount}%`
        	str+= index === layer.colors.length-1 ? `)` : ',';
		});
	
	str+= index === strColors.length-1 ? '' : ',';
	});

	return str;
}

getSelectedColor = () => {
	let selectedColor = null;
	this.state.layers.forEach(layer => {
		layer.colors.forEach(color => {
			if(color.id === this.state.selectedColorId) {
				selectedColor = color;
			}
		});
	});

	return selectedColor
}

toggleTab = (layer) => {
	this.setState({currentLayer: layer});
	layer !== 3 ? this.setState({selectedColorId: this.state.layers[layer].colors[0].id}) : null;
}

setSelectedColor = (colorId) => {
	this.setState({selectedColorId: colorId})
}

toggleLayers = (layer) => {
	let tmpColors = this.state.layers

    if(layer === 0) {
		tmpColors[0].hidden = false;
		tmpColors[1].hidden = true;
	} else if (layer === 1) {
		tmpColors[0].hidden = true;
		tmpColors[1].hidden = false;
	} else {
		tmpColors[0].hidden = false;
		tmpColors[1].hidden = false;
	}

    this.setState({
		layers: tmpColors
    });
}

getHiddenLayer = () => {
	let hiddenLayers = this.state.layers.filter(layer => layer.hidden);
	return hiddenLayers
}

render() {
	let str = this.getString();
	let {h, s, l, a} = this.getSelectedColor();



    return (
		<div>
      		<Background className="gradientr" background={str} width={this.state.background}>
        		<Wrapper>
          			gradientr
        		</Wrapper> 
				<Container style={{animation: !this.state.containerHidden ? "slide-top .5s ease-in-out both": "slide-bottom 0.5s ease-in-out 0s 1 normal both"}}>
					<ToggleButton onClick={this.togglePanel} style={ this.state.containerHidden ? {position: "fixed", bottom: "0", left: "10%"} : null}><span>hide</span></ToggleButton>	
					{this.state.layers.map((layer, layerIndex) => {
						return <Tablink background={this.state.currentLayer === layerIndex ? '#ffffff42' : '#ffffffb0'} onClick={() => this.toggleTab(layerIndex)} >
							<span>Layer {layerIndex+1}</span>
						</Tablink>
					})}
					<Tablink background={this.state.currentLayer === 3 ? '#ffffff42' : '#ffffffb0'} onClick={() => this.toggleTab(3)} ><i class="fa fa-code" /></Tablink>
					{this.state.currentLayer !== 3 ? ( <TabContent background={this.state.editing ? '#ffffff00' : null}>
						<ColorDistSlider 
							layer={this.state.currentLayer} 
							colors={this.state.layers[this.state.currentLayer].colors} 
							handleColorAmountChange={this.handleChange} 
							finishEditing={this.finishEditing} 
						/>
						<AngleSlider 
							handleChange={this.handleChange}
							finishEditing={this.finishEditing}
							currentValue={this.state.layers[this.state.currentLayer].degree} 
						/>
						<LayerToggle 
							layers={this.state.layers}
							toggleLayers={this.toggleLayers}
						/>
						<LayerItem>
							<ul>
								<li style={{display: "inline-block", width: "50%", float: 'left'}}>
									<Layer 
									layer={this.state.layers[this.state.currentLayer]} 
									index={this.state.currentLayer} 
									addColor={this.addColor} 
									removeColor={this.removeColor} 
									checked={this.state.layers[this.state.currentLayer].hidden}
									setColor={this.setSelectedColor}
									selectedColor={this.state.selectedColorId}
									/>
								</li>
								<li style={{display: "inline-block", width: "50%", float: 'left'}}>
									<CustomPicker onChange={ this.handleColorChange } color={ {h, s, l, a} } />
								</li>
							</ul>
						</LayerItem>
					</TabContent>) : (<TabContent>
					<CodeEditor><Highlight language="css"><span style={{wordBreak: "break-all", wordWrap: "break-word"}}>{`background: ${str}`}</span></Highlight></CodeEditor></TabContent>)}
				</Container>
			</Background>
      	</div>
    );
  }
}

export default App;
