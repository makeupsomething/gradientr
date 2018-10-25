import React, { Component } from 'react';
import './App.css';
import Layer from './components/Layer';
import AngleSlider from './components/AngleSlider';
import ColorDistSlider from './components/ColorDistSlider';
import Highlight from 'react-highlight';
import CustomPicker from './components/CustomPicker';
import LayerToggle from './components/LayerToggle';

import Wrapper from './styledComponents/Wrapper';
import Background from './styledComponents/Background';
import CodeEditor from './styledComponents/CodeEditor';
import Container from './styledComponents/Container';
import Tablink from './styledComponents/Tablink';
import TabContent from './styledComponents/TabContent';
import LayerItem from './styledComponents/LayerItem';

/*
linear-gradient(93deg, 
hsla(188.80656108597287, 100%, 50%,  0.73) 25%,
hsla(301.20475113122177, 100%, 60%,  0.32) 75%),
linear-gradient(0deg, 
hsla(53.602941176470594, 93.00000000000001%, 50%,  0.75) 30%,
hsla(291.4309954751131, 92%, 50%,  0.5) 70%)
*/
class App extends Component {
	state = {
		layers: [
			{degree: 93, hidden: false, colors:[{h: '188', s: '100', l: '50', a: '0.73', amount: 25, name: "color01", id: "color01"}, 
			{h: '301', s: '100', l: '60', a: '0.3', amount: 75, name: "color02", id: "color02"}]},
			{degree: 0, hidden: false, colors:[{h: '53', s: '93', l: '50', a: '0.75', amount: 30, name: "color11", id: "color11"}, 
			{h: '291', s: '92', l: '50', a: '0.5', amount: 70, name: "color12", id: "color12"}]}
		],
		containerHidden: true,
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
	const { currentLayer, layers, editing, selectedColorId, background } = this.state;

    return (
	<Background className="gradientr" background={str} width={background}>
		<Wrapper>
			gradientr
		</Wrapper> 
		<Container>
			{layers.map((layer, layerIndex) => {
				return (
				<Tablink background={currentLayer === layerIndex ? '#ffffff42' : '#ffffffb0'} onClick={() => this.toggleTab(layerIndex)} >
					<span>Layer {layerIndex+1}</span>
				</Tablink>)
			})}
			<Tablink background={currentLayer === 3 ? '#ffffff42' : '#ffffffb0'} onClick={() => this.toggleTab(3)}>
				<i class="fa fa-code" />
			</Tablink>
			{currentLayer !== 3 ? 
			(<TabContent background={editing ? '#ffffff00' : null}>
				<ColorDistSlider 
					layer={currentLayer} 
					colors={layers[currentLayer].colors} 
					handleColorAmountChange={this.handleChange} 
					finishEditing={this.finishEditing} 
				/>
				<AngleSlider 
					handleChange={this.handleChange}
					finishEditing={this.finishEditing}
					currentValue={layers[currentLayer].degree} 
				/>
				<LayerToggle 
					layers={layers}
					toggleLayers={this.toggleLayers}
				/>
				<LayerItem>
					<ul>
						<li style={{display: "inline-block", width: "50%", float: 'left'}}>
							<Layer 
							layer={layers[currentLayer]} 
							index={currentLayer} 
							addColor={this.addColor} 
							removeColor={this.removeColor} 
							checked={layers[currentLayer].hidden}
							setColor={this.setSelectedColor}
							selectedColor={selectedColorId}
							/>
						</li>
						<li style={{display: "inline-block", width: "50%", float: 'left'}}>
							<CustomPicker onChange={ this.handleColorChange } color={ {h, s, l, a} } />
						</li>
					</ul>
				</LayerItem>
			</TabContent>) : 
			(<TabContent>
				<CodeEditor>
					<Highlight language="css">
						<span style={{wordBreak: "break-all", wordWrap: "break-word"}}>{`background: ${str}`}</span>
					</Highlight>
				</CodeEditor>
			</TabContent>)}
		</Container>
	</Background>
    );
  }
}

export default App;
