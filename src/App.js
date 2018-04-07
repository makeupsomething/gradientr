import React, { Component } from 'react';
import styled from 'styled-components';
import './App.css';
import ColorPicker from './components/ColorPicker';

const Wrapper = styled.p`
text-align: center;
color: whitesmoke;
font-size: 7.5em;
font-family: Arial, Helvetica, sans-serif;
background: transparent;
`;

const Background = styled.div.attrs({
  background: props => props.background || 'green',
})`
position: absolute;
height: 100%;
width: 100%;
background: ${props => props.background};
`;

const AngleSlider = styled.div`
`

const CodeSnippit = styled.code`
  max-width: 200px;
`

const ListItem = styled.li`
  display: block;
  float: left;
`

class App extends Component {
  state = {
    colors: [
      {degree: 93, colors:[{h: '359', s: '88', l: '68', a: '0.7', amount: 26, name: "color1"}, 
      {h: '199', s: '100', l: '60', a: '0.6', amount: 75, name: "color2"}]},
      {degree: 181, colors:[{h: '98', s: '93', l: '50', a: '0.5', amount: 25, name: "color3"}, 
      {h: '191', s: '92', l: '50', a: '0.5', amount: 50, name: "color4"}]}
    ],
  };

  handleColorChange = (event) => {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    console.log(event)
    console.log(name)
    let tmp = this.state.colors;

    tmp.forEach(layer => {
      layer.colors.forEach(color => {
        if(name.includes(color.name)) {
          color[name.replace(color.name, '')] = value;
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
    const name = target.name;
    const id = target.id;
    console.log(id)
    let ttt = this.state.colors
    ttt[id].degree = value

    this.setState({
      colors: ttt
    });
  }

  addColor = (event) => {
    this.setState({ colors: [...this.state.colors, {h: '0', s: '50', l: '50', name: `color${this.state.colors.length+1}`}] });
  }

  addLayer = (event) => {
    this.setState({ colors2: [{h: '359', s: '50', l: '50', name: "color1"}, {h: '280', s: '50', l: '50', name: "color2"}]});
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

    console.log(str)
    return (
      <Background className="gradientr" background={`${str}`}>
        <Wrapper>
          gradientr
        </Wrapper>
        <ul>
          {this.state.colors.map((layer, index) => {
            return <ListItem>
              <AngleSlider>
                <label>Angle</label>
                <input type="range" min="0" max="359" name="degree" id={index} value={layer.degree} onChange={this.handleChange} />
              </AngleSlider>
            </ListItem>
          })}
          {this.state.colors.map(layer => {
            return layer.colors.map(color => {
            return <ListItem key={color.name}>
                    <ColorPicker 
                      h={color.h}
                      s={color.s}
                      l={color.l}
                      a={color.a}
                      amount={color.amount}
                      name={color.name}
                      handleChange={this.handleColorChange}>
                    </ColorPicker>
                  </ListItem>})
          })}
          <button onClick={this.addColor}>Add Color</button>
          <button onClick={this.addLayer}>Add Layer</button>
          <ListItem>
            <CodeSnippit>{`${str}`}</CodeSnippit>
          </ListItem>
        </ul>
      </Background>
    );
  }
}

export default App;
