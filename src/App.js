import React, { Component } from 'react';
import styled from 'styled-components';
import './App.css';
import ColorPicker from './components/ColorPicker';

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

const AngleSlider = styled.div`
	margin: 10px 0;
`

const CodeSnippit = styled.code`
  	width: 80%;
  	background: white;
`

const LayerLabel = styled.p`
  	width: 100%;
  	margin: auto;
  	color: black;
`

const MenuButton = styled.button`
  	position: absolute;
  	right: 0;
  	z-index: 2;
  	background-color: #ffffff42;
  	border: 2px solid gray;
`

const AddButton = styled.button`
  	z-index: 2;
  	background-color: #ffffff42;
  	border: 2px solid gray;
  	border-radius: 3px;
  	width: 40px;
  	height: 40px;
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
`


class App extends Component {
  state = {
    colors: [
		{degree: 93, colors:[{h: '359', s: '88', l: '68', a: '0.7', amount: 26, name: "color01"}, 
      	{h: '199', s: '100', l: '60', a: '0.6', amount: 75, name: "color02"}]},
      	{degree: 181, colors:[{h: '98', s: '93', l: '50', a: '0.5', amount: 25, name: "color11"}, 
      	{h: '191', s: '92', l: '50', a: '0.5', amount: 50, name: "color12"}]}
    ],
    sidebar: '25%',
    background: '100%',
  };

handleColorChange = (color, target) => {
    let tmp = this.state.colors;

    tmp.forEach(layer => {
      	layer.colors.forEach(c => {
        	if(target === c.name) {
          	c.h = color.h;
          	c.s = color.s * 100;
          	c.l = color.l * 100;
          	c.a = color.a;
        	}
      	});
    });

    this.setState({
		colors: tmp
	});
}


handleColorAmountChange = (event) => {
	const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    let tmp = this.state.colors;

    tmp.forEach(layer => {
      	layer.colors.forEach(c => {
        	if(name === c.name) {
          	c.amount = value;
        	}
      	});
    });

    this.setState({
      	colors: tmp
    });
}


handleChange = (event) => {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const id = target.id;


    let ttt = this.state.colors
    ttt[id].degree = value

    this.setState({
		colors: ttt
    });
}

addColor = (event) => {
	const target = event.target;
    const name = target.name;
    let ttt = this.state.colors
    ttt[name].colors.push({h: '0', s: '50', l: '50', a: '0.5', amount: 50, name: `color${name}${ttt[name].colors.length+1}`})
    this.setState({ colors: ttt });
}

  addLayer = (event) => {
    let ttt = this.state.colors
    ttt.push({degree: 181, colors: [{h: '0', s: '50', l: '50', a: '0.5', amount: 50, name: `color${this.state.colors.length+1}1`}, {h: '191', s: '92', l: '50', a: '0.5', amount: 50, name: `color${this.state.colors.length+1}2`}]})
    this.setState({ colors: ttt });
}

toggleSidebar = (event) => {
	this.setState({sidebar: this.state.sidebar === '25%' ? '0%' : '25%'})
}

render() {
    let str = '';

    let gradString = this.state.colors.forEach((layer, index) => {
		str+= `linear-gradient(${layer.degree}deg, `;
        layer.colors.forEach((color, index) => {
        	str+= `hsla(${color.h}, ${color.s}%, ${color.l}%,  ${color.a}) ${color.amount}%`
        	str+= index === layer.colors.length-1 ? `)` : ',';
		});
	
	str+= index === this.state.colors.length-1 ? '' : ',';
	
	});

    return (
		<div>
      		<Background className="gradientr" background={str} width={this.state.background}>
        		<MenuButton onClick={this.toggleSidebar}><i class="fas fa-bars"></i></MenuButton>
        		<Wrapper>
          			gradientr
        		</Wrapper>
      		</Background>
      		<Sidebar width={this.state.sidebar}>
          		{this.state.colors.map((layer, layerIndex) => {
            		return <div>
              			<LayerLabel>{`Layer ${layerIndex}`}</LayerLabel>
						<AngleSlider>
							<label>Angle</label>
							<input type="range" min="0" max="359" name="degree" id={layerIndex} value={layer.degree} onChange={this.handleChange} />
						</AngleSlider>
						<ul style={{"list-style-type": "none", margin: "0", padding: "0"}}>
						{layer.colors.map(color => {
							return <li style={{display: "inline"}}><ColorPicker 
									h={color.h}
									s={color.s}
									l={color.l}
									a={color.a}
									amount={color.amount}
									name={color.name}
									handleChange={this.handleColorChange}>
									</ColorPicker></li>
            			})}<li style={{display: "inline"}}><AddButton name={layerIndex} onClick={this.addColor}><i class="fas fa-plus" />Color</AddButton></li></ul>
						  	<ul style={{"list-style-type": "none", margin: "0", padding: "0"}}>
						  	{layer.colors.map(color => {
							return <li style={{display: "inline"}}><input
									style={{width: "35px", "margin-right": "10px"}}
									type="range"
									min="0"
									max="100"
									value={color.amount}
									name={color.name}
									onChange={this.handleColorAmountChange} /></li>
            				})}</ul>
            				</div>
          		})}
				<AddButton onClick={this.addLayer}><i class="fas fa-plus" />Layer</AddButton>
				<br />
				<CodeSnippit>{`${str}`}</CodeSnippit>
      		</Sidebar>
      	</div>
    );
  }
}

export default App;
