import styled from 'styled-components';

const Tablink = styled.button.attrs({
	backgroundColor: props => props.editing ?  '#7b7b7b1f' : '#4c4c4c',
	transition: props => props.editing ? 'background-color .1s linear' : 'background-color 5s linear'
})`
    background-color: ${props => props.backgroundColor};
	color: white;
    border: none;
    outline: none;
    cursor: pointer;
    padding: 14px 16px;
    font-size: 17px;
	width: 33.3%;
    border-bottom: solid 3px ${props => props.borderColor};
    transition: ${props => props.transition};
	
	${Tablink}:hover {
    	border-bottom: solid 3px lightblue;
	}
`

export default Tablink;