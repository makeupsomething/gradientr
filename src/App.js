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
    colors: [{h: '359', s: '50', l: '50', name: "color1"}, {h: '280', s: '50', l: '50', name: "color2"}],
    degree: 30,
  };

  handleColorChange = (event) => {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;
    let tmp = this.state.colors;

    tmp.forEach(color => {
      if(name.includes(color.name)) {
        color[name.replace(color.name, '')] = value;
      }
    });

    this.setState({
      colors: tmp
    });
  }

  handleChange = (event) => {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value
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

    let gradString = this.state.colors.forEach((color, index) => {
      str+= `hsl(${color.h}, ${color.s}%, ${color.l}%)`
      str+= index === this.state.colors.length-1 ? '' : ',';
    });

    return (
      <Background className="gradientr" background={`linear-gradient(${this.state.degree}deg, ${str})`}>
        <p>{gradString}</p>
        <Wrapper>
          gradientr
        </Wrapper>
        <ul>
          {this.state.colors.map(color => {
            return <ListItem key={color.name}>
                    <ColorPicker 
                      h={color.h}
                      s={color.s}
                      l={color.l}
                      name={color.name}
                      handleChange={this.handleColorChange}>
                    </ColorPicker>
                  </ListItem>
          })}
          <button onClick={this.addColor}>Add Color</button>
          <button onClick={this.addLayer}>Add Layer</button>
          <ListItem>
            <AngleSlider>
              <label>Angle</label>
              <input type="range" min="0" max="359" name="degree" value={this.state.degree} onChange={this.handleChange} />
            </AngleSlider>
          </ListItem>
          <ListItem>
            <CodeSnippit>{`linear-gradient(${this.state.degree}deg, ${str})`}</CodeSnippit>
          </ListItem>
        </ul>
      </Background>
    );
  }
}

export default App;
