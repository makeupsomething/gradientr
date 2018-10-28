import React, { Component } from 'react';
import { connect } from 'react-redux';
import { 
	setLayers, 
	setSelectedColor, 
	setCurrentLayer,
	setEdting,
} from './actions/layers';

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

class App extends Component {

componentDidMount() {
	this.props.dispatch(setLayers(
		[
			{degree: 93, hidden: false, colors:[{h: '188', s: '100', l: '50', a: '0.73', amount: 25, name: "color01", id: "color01"}, 
			{h: '301', s: '100', l: '60', a: '0.3', amount: 75, name: "color02", id: "color02"}]},
			{degree: 0, hidden: false, colors:[{h: '53', s: '93', l: '50', a: '0.75', amount: 30, name: "color11", id: "color11"}, 
			{h: '291', s: '92', l: '50', a: '0.5', amount: 70, name: "color12", id: "color12"}]}
		]
	));
	this.props.dispatch(setSelectedColor('color01'))
	this.props.dispatch(setCurrentLayer({ layerIndex: 0 }))
	this.props.dispatch(setEdting(false))

}

handleColorChange = (color) => {
	const { layerData, selectedColor, layerIndex, editing, selectedColorId } =  this.props.layers;
	
    layerData.forEach(layer => {
		layer.colors.forEach(c => {
			if(selectedColorId === c.id) {
				c.h = color.hsl.h;
				c.s = color.hsl.s * 100;
				c.l = color.hsl.l * 100;
				c.a = color.hsl.a;
			}
		});
	});
	
	this.props.dispatch(setLayers(layerData))
}

getString = () => {
	if(Object.keys(this.props.layers).length === 0)
		return
	let str = '';
	let strColors = this.props.layers.layerData.filter(({hidden}) => !hidden)

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

toggleTab = (layer) => {
	this.props.dispatch(setCurrentLayer({ layerIndex: layer }))
	if(layer !== 3) {
		this.props.dispatch(setSelectedColor(this.props.layers.layerData[layer].colors[0].id))
	}
}

render() {
	let str = this.getString();
	const { layerData, selectedColor, layerIndex, editing, selectedColorId } =  this.props.layers;
	let {h, s, l, a} = selectedColor || {h:1, s:1, l:1, a:1}

    return (
	<Background className="gradientr" background={str}>
		<Wrapper>
			gradientr
		</Wrapper> 
		{layerData && layerData.length > 0 ? (
		<Container>
			{layerData.map((layer, li) => {
					return (
					<Tablink background={layerIndex === li} onClick={() => this.toggleTab(li)} key={`tab-${li}`} >
						<span>Layer {li+1}</span>
					</Tablink>)
			})}
			<Tablink background={layerIndex === 3} onClick={() => this.toggleTab(3)} key="tab-3">
				<i className="fa fa-code" />
			</Tablink>
			{layerIndex !== 3 ? 
				(<TabContent background={editing ? '#ffffff00' : null}>
					<ColorDistSlider/>
					<AngleSlider/>
					<LayerToggle/>
					<LayerItem>
						<ul>
							<li style={{display: "inline-block", width: "50%", float: 'left'}}>
								<Layer/>
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
		</Container>) : null}
	</Background>
    );
  }
}

function mapStateToProps({ layers }) {
	return {
		layers,
	}
}

export default connect(mapStateToProps)(App);
