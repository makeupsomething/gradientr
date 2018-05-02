import React, { Component } from 'react';
import styled from 'styled-components';
import './App.css';
import Layer from './components/Layer';
import ControlPanel from './components/ControlPanel';
import ColorDistSlider from './components/ColorDistSlider';
import { ChromePicker } from 'react-color';

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

const CodeSnippit = styled.code`
  	width: 80%;
	background: white;
	color: gray;
	padding-left: 10px;
`

const MenuButton = styled.button`
  	position: absolute;
  	right: 0;
  	z-index: 2;
  	background-color: #ffffff42;
  	border: 2px solid gray;
`

const Tablink = styled.button.attrs({
	background: props => props.background || '#777'
})`
    background: ${props => props.background};
    color: white;
    float: left;
    border: none;
    outline: none;
    cursor: pointer;
    padding: 14px 16px;
    font-size: 17px;
	width: 25%;
	
	${Tablink}:hover {
    	background-color: #222;
	}
`

const TabContent = styled.div`
    color: white;
    display: block;
	background-color: #555;
	width: 50%;
`

const Sidebar = styled.div.attrs({
	background: props => props.background || '#ffffff42',
})`
  	background: ${props => props.background};
  	height: 100%;
  	width: ${props => props.width};
  	right: 0
  	position: absolute;
  	overflow: scroll;
	padding-top: 3%;
`

const AngleSlider = styled.div`
	margin: 10px 0;
	padding-left: 10px;
`

const Container = styled.div`
  	width: 75%;
    margin: auto;
	border: solid 2px black;
	top: 300px;
`

class App extends Component {
  state = {
    colors: [
		{degree: 93, hidden: false, colors:[{h: '359', s: '88', l: '68', a: '0.7', amount: 26, name: "color01", id: "color01"}, 
      	{h: '199', s: '100', l: '60', a: '0.6', amount: 75, name: "color02", id: "color02"}]},
      	{degree: 181, hidden: false, colors:[{h: '98', s: '93', l: '50', a: '0.5', amount: 25, name: "color11", id: "color11"}, 
      	{h: '191', s: '92', l: '50', a: '0.5', amount: 50, name: "color12", id: "color12"}]}
    ],
    sidebar: '25%',
	background: '100%',
	selectedColorId: 'color01',
	currentLayer: 0,
  };

handleColorChange = (color) => {
	let tmp = this.state.colors;
	
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
    let tmp = this.state.colors;
    tmp[layer].colors = colors
    this.setState({
      	colors: tmp
    });
}

handleChange = (layer, parameter, value) => {
    let tmpColors = this.state.colors
    tmpColors[layer][parameter] = value

    this.setState({
		colors: tmpColors
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
	let tmpColors = this.state.colors
	let uuid = this.uuidv4()
	tmpColors[layer].colors.push({h: '0', s: '50', l: '50', a: '0.5', amount: 50, id: uuid})
    this.setState({ colors: tmpColors });
}

toggleSidebar = (event) => {
	this.setState({sidebar: this.state.sidebar === '25%' ? '0%' : '25%'})
}

removeColor = (id, layer) => {
	let tmpColors = this.state.colors;
	tmpColors[layer].colors = this.state.colors[layer].colors.filter(color => color.id !== id)
	this.setState({ colors: tmpColors });	
}

getString = () => {
	let str = '';
	let strColors = this.state.colors.filter(({hidden}) => !hidden)

	strColors.forEach((layer, index) => {
		str+= `linear-gradient(${layer.degree}deg, `;
        layer.colors.forEach((color, index) => {
        	str+= `hsla(${color.h}, ${color.s}%, ${color.l}%,  ${color.a}) ${color.amount}%`
        	str+= index === layer.colors.length-1 ? `)` : ',';
		});
	
	str+= index === strColors.length-1 ? '' : ',';
	});

	return str;
}

getSelectedColor = () => {
	let selectedColor = null;
	this.state.colors.forEach(layer => {
		layer.colors.forEach(color => {
			if(color.id === this.state.selectedColorId) {
				selectedColor = color;
			}
		});
	});

	return selectedColor
}

setSelectedColor = (colorId) => {
	this.setState({selectedColorId: colorId})
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
      		
			<Container>
				<ul style={{"list-style-type": "none", margin: "0", padding: "0"}}>
					<li><ChromePicker onChange={ this.handleColorChange } color={ {h, s, l, a} } /></li>
					<li>
						<ul>
							<li style={{height: "48px"}}>
							{this.state.colors.map((layer, layerIndex) => {
								return <Tablink background={this.state.currentLayer === layerIndex ? '#555' : '#777'} onClick={() => this.setState({currentLayer: layerIndex})} >{layerIndex}</Tablink>
							})}
							</li>
							<li>
							<TabContent>
							<Layer 
							layer={this.state.colors[this.state.currentLayer]} 
							index={this.state.currentLayer} 
							handleChange={this.handleChange} 
							addColor={this.addColor} 
							removeColor={this.removeColor} 
							checked={this.state.colors[this.state.currentLayer].hidden}
							setColor={this.setSelectedColor}
							selectedColor={this.state.selectedColorId}
							/>
							</TabContent>
							</li>
						</ul>
					</li>
				</ul>
			</Container>
			</Background>
			<Sidebar width={this.state.sidebar}>
			  <ul style={{"list-style-type": "none", margin: "0", padding: "0"}}>
			  <li>
			  <ColorDistSlider layer={this.state.currentLayer} colors={this.state.colors[this.state.currentLayer].colors} handleColorAmountChange={this.handleColorAmountChange}  />
			  </li>
			  <li>
			  <AngleSlider>
                    <label>Angle</label>
                    <input type="range" min="0" max="359" value={this.state.colors[this.state.currentLayer].degree} onChange={(event) => this.handleChange(this.state.currentLayer, "degree", event.target.value)} />
				</AngleSlider>
			  </li>
			  <li>{this.state.colors.map((layer, layerIndex) => {
				  return <Tablink background={this.state.currentLayer === layerIndex ? '#555' : '#777'} onClick={() => this.setState({currentLayer: layerIndex})} >{layerIndex}</Tablink>
				  
			  })}</li>
				</ul>
				<TabContent>
				<Layer 
					layer={this.state.colors[this.state.currentLayer]} 
					index={this.state.currentLayer} 
					handleChange={this.handleChange} 
					addColor={this.addColor} 
					removeColor={this.removeColor} 
					checked={this.state.colors[this.state.currentLayer].hidden}
					setColor={this.setSelectedColor}
					selectedColor={this.state.selectedColorId}
					/>
				</TabContent>
				<CodeSnippit>{`${str}`}</CodeSnippit>
      		</Sidebar>
      	</div>
    );
  }
}

export default App;
