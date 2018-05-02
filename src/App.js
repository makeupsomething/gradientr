import React, { Component } from 'react';
import styled from 'styled-components';
import './App.css';
import ColorPicker from './components/ColorPicker';
import Layer from './components/Layer';
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

const Line = styled.hr`
	color: #ffffff63;
	border-width: 1px;
`

const Sidebar = styled.div.attrs({
	background: props => props.background || '#ffffff42',
  	width: props => props.width || '20%',
})`
  	background: ${props => props.background};
  	height: 100%;
  	width: ${props => props.width};
  	right: 0
  	position: absolute;
  	overflow: scroll;
	padding-top: 3%;
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


handleColorAmountChange = (layer, color, value) => {
    let tmp = this.state.colors;
    tmp[layer].colors.forEach(c => {color === c.id ? c.amount = value : null});
    this.setState({
      	colors: tmp
    });
}

handleColorAmountChange_test = (layer, colors) => {
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
			color.id === this.state.selectedColorId ? selectedColor = color : null;
		});
	});

	return selectedColor
}

setSelectedColor = (colorId) => {
	console.log(colorId)
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
      		</Background>
			<MenuButton onClick={this.toggleSidebar}><i class="fas fa-bars"></i></MenuButton>
      		<Sidebar width={this.state.sidebar}>
			  <ColorDistSlider layer={0} colors={this.state.colors[0].colors} handleColorAmountChange={this.handleColorAmountChange_test}  />
			  <ChromePicker onChange={ this.handleColorChange } color={ {h, s, l, a} } />
			  <ul style={{"list-style-type": "none", margin: "0", padding: "0"}}>
			  {this.state.colors.map((layer, layerIndex) => {
            		return <li style={{display: "inline"}}>
						<Layer 
							layer={layer} 
							index={layerIndex} 
							handleChange={this.handleChange} 
							addColor={this.addColor} 
							handleColorAmountChange={this.handleColorAmountChange} 
							removeColor={this.removeColor} 
							checked={this.state.colors[layerIndex].hidden}
							setColor={this.setSelectedColor}
							selectedColor={this.state.selectedColorId}
						/>
						</li>
				  })}
				</ul>
				<Line />
				<CodeSnippit>{`${str}`}</CodeSnippit>
      		</Sidebar>
      	</div>
    );
  }
}

export default App;
