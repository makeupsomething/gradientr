import styled from 'styled-components';

const Tablink = styled.button.attrs({
	background: props => props.background || '#ffffff42'
})`
    background: ${props => props.background};
	color: white;
    border: none;
    outline: none;
    cursor: pointer;
    padding: 14px 16px;
    font-size: 17px;
	width: 33.3%;
	
	${Tablink}:hover {
    	background: #1010100a;
	}
`

export default Tablink;