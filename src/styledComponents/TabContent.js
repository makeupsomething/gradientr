import styled from 'styled-components';

const TabContent = styled.ul.attrs({
	backgroundColor: props => props.editing ?  '#7b7b7b1f' : '#4c4c4c',
	transition: props => props.editing ? 'background-color .1s linear' : 'background-color 5s linear'
})`
    color: white;
	background-color: ${props => props.backgroundColor};
	width: 100%;
	list-style-type: none;
    margin: 0;
    padding: 0;
	overflow: scroll;
	transition: ${props => props.transition};
`

export default TabContent;