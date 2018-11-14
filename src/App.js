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
import CustomPicker from './components/CustomPicker';
import HideContainerButton, { Header, Title } from './components/Header';
import Tab from './components/Tab';

import Background from './styledComponents/Background';
import Container from './styledComponents/Container';
import ControlPanel from './styledComponents/ControlPanel';

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
	const { layerData, selectedColorId } =  this.props.layers;
	this.props.dispatch(setEdting('color'))
    layerData.forEach(layer => {
		layer.colors.forEach(c => {
			if(selectedColorId === c.id) {
				c.h = Number(color.hsl.h.toFixed(2));
				c.s = Number((color.hsl.s * 100).toFixed(2));
				c.l = Number((color.hsl.l * 100).toFixed(2));
				c.a = color.hsl.a;
			}
		});
	});
	
	this.props.dispatch(setLayers(layerData))
}

finishEditing = () => {
	this.props.dispatch(setEdting(false))
}

render() {
	const { layerData, selectedColor, editing, hidden, gradientString } =  this.props.layers;
	let {h, s, l, a} = selectedColor || {h:1, s:1, l:1, a:1}

    return (
	<Background className="gradientr" background={gradientString}>
		<Header>
			<Title>Gradientr</Title>
			<HideContainerButton />
		</Header>
		{layerData && layerData.length > 0 ? (
		<Container hide={hidden}>
			<Tab index={0} />
			<Tab index={1} />
			<ControlPanel editing={editing}>
					<Layer/>
					<CustomPicker 
						opacity={editing && editing !== 'color' ? "0" : "1"} 
						onChange={ this.handleColorChange } 
						onChangeComplete={ this.finishEditing } 
						color={ {h, s, l, a} } 
					/>
			</ControlPanel>
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
