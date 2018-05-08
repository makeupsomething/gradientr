import React, { Component } from 'react';
import styled from 'styled-components';
import './App.css';
import Layer from './components/Layer';
import ControlPanel from './components/ControlPanel';
import ColorDistSlider from './components/ColorDistSlider';
import { ChromePicker } from 'react-color';
import Slider from 'rc-slider';
import Tooltip from 'rc-tooltip';
import Highlight from 'react-highlight'
import 'rc-slider/assets/index.css';

const Wrapper = styled.p`
	margin: auto;
	text-align: center;
	color: whitesmoke;
	font-size: 7.5em;
	background: transparent;
`;

const Background = styled.div.attrs({
	background: props => props.background || 'green',
	width: props => props.width || '80%',
})`
	position: absolute;
	height: 100%;
	width: ${props => props.width};
	background: ${props => props.background};
`;

const CodeEditor = styled.div`
	margin: auto;
	margin-top: 5%;
	margin-bottom: 5%;
	padding: 5%;
	width: 80%;
	height: 200px;
	word-wrap: break-word;
	border: solid gray 3px;
	font-size: 1.5em;
`

const Tablink = styled.button.attrs({
	background: props => props.background || '#ffffff42'
})`
    background: ${props => props.background};
    color: white;
    border: none;
    outline: none;
    cursor: pointer;
    padding: 14px 16px;
    font-size: 17px;
	width: 33.3%;
	
	${Tablink}:hover {
    	background: #1010100a;
	}
`

const TabContent = styled.ul`
    color: white;
	background-color: #ffffff42;
	width: 100%;
	height: 85%;
	list-style-type: none;
    margin: 0;
    padding: 0;
    overflow: scroll;
`

const LayerItem = styled.li`
	display: inline-block;
	width: 50%;
`

const Container = styled.div`
	width: 80vw;  
	height: 79vh;
	margin-left: auto;
	margin-right: auto;
	margin-top: 15vh;
`

const ToggleButton = styled.button`
  	background-color: #ffffff42;
	border: 2px solid gray;
	color: white;
	width: 10%;
	height: 10%;
	font-size: 1em;
	cursor: pointer;

	${ToggleButton}:hover {
		background: #1010100a;
	}
`

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

handleColorAmountChange = (layer, colors) => {
    let tmp = this.state.layers;
    tmp[layer].colors = colors
    this.setState({
      	layers: tmp
    });
}

handleChange = (layer, parameter, value, event) => {
	if(event) {
		event.stopPropagation();
	}
	value = parameter === "degree" ? value.value : value
    let tmpColors = this.state.layers
    tmpColors[layer][parameter] = value

    this.setState({
		layers: tmpColors
    });
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
	console.log("toggle")
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
	console.log(hiddenLayers.length)
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
				{this.state.containerHidden ? <ToggleButton style={{position: "fixed", bottom: this.state.containerHidden ? "0" : '67%', left: "10%"}} onClick={this.togglePanel}>show</ToggleButton> : null}
				<br />		
				<Container style={{animation: !this.state.containerHidden ? "slide-top .5s ease-in-out both": "slide-bottom 0.5s ease-in-out 0s 1 normal both"}}>
					{!this.state.containerHidden ? <ToggleButton onClick={this.togglePanel}>hide</ToggleButton> : null}
					<br />	
					{this.state.layers.map((layer, layerIndex) => {
						return <Tablink background={this.state.currentLayer === layerIndex ? '#ffffff42' : '#ffffffb0'} onClick={() => this.toggleTab(layerIndex)} >
							Layer {layerIndex+1}
						</Tablink>
					})}
					<Tablink background={this.state.currentLayer === 3 ? '#ffffff42' : '#ffffffb0'} onClick={() => this.toggleTab(3)} ><i class="fa fa-code" /></Tablink>
					{this.state.currentLayer !== 3 ? ( <TabContent>
						<ColorDistSlider layer={this.state.currentLayer} colors={this.state.layers[this.state.currentLayer].colors} handleColorAmountChange={this.handleColorAmountChange}  />
						<Slider 
							min={0} 
							max={360} 
							marks={marks} 
							style={{height: "20px", width: "90%", margin: "40px auto"}}
							railStyle={{height: "20px"}} 
							handleStyle={{height: "30px", borderRadius: "20%"}} 
							trackStyle={{backgroundColor: `#abe2fb00`}}
							dotStyle={{top: "16px"}}
							onChange={value => this.handleChange(this.state.currentLayer, "degree", {value})}
							value={this.state.layers[this.state.currentLayer].degree}
						/>
						<div style={{height: "20px", width: "90%", margin: "40px auto"}}>
							<label>
								Show Layer:
							</label>
							<label style={{marginLeft: "10%"}}>
								both layers
							<input onClick={() => this.toggleLayers(2)} type="radio" name="hidden" value="both" checked={!this.state.layers[0].hidden && !this.state.layers[1].hidden } />
							</label>
							<label style={{marginLeft: "10%"}}>
								layer 1
							<input onClick={() => this.toggleLayers(0)} type="radio" name="hidden" value="1" />
							</label>
							<label style={{marginLeft: "10%"}}>
								layer 2
							<input onClick={() => this.toggleLayers(1)} type="radio" name="hidden" value="2" />
							</label>
						</div>
						<LayerItem>
						<Layer 
						layer={this.state.layers[this.state.currentLayer]} 
						index={this.state.currentLayer} 
						addColor={this.addColor} 
						removeColor={this.removeColor} 
						checked={this.state.layers[this.state.currentLayer].hidden}
						setColor={this.setSelectedColor}
						selectedColor={this.state.selectedColorId}
						/>
						</LayerItem>
						<LayerItem>
							<ChromePicker onChange={ this.handleColorChange } color={ {h, s, l, a} } />
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
