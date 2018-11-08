import styled from 'styled-components';

const Tablink = styled.button`
    background: #4c4c4c;
	color: white;
    border: none;
    outline: none;
    cursor: pointer;
    padding: 14px 16px;
    font-size: 17px;
	width: 33.3%;
    border-bottom: solid 3px ${props => props.borderColor};
	
	${Tablink}:hover {
    	border-bottom: solid 3px lightblue;
	}
`

export default Tablink;