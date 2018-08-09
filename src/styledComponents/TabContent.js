import styled from 'styled-components';

const TabContent = styled.ul.attrs({
	background: props => props.background || '#ffffff42'
})`
    color: white;
	background: ${props => props.background};
	width: 100%;
	height: 85%;
	list-style-type: none;
    margin: 0;
    padding: 0;
	overflow: scroll;
`

export default TabContent;