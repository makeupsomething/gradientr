import styled, { keyframes, css } from 'styled-components';

const fadeIn = keyframes`
from {
    opacity: 0;
}

to {
	opacity: 1;
}
`;

const Container = styled.div`
	width: 80vw;
	animation: ${fadeIn} 2s ease-in;
	opacity: 1;
	transition: opacity .2s ease-in;
	position: absolute; 
	left: 0; 
	right: 0; 
	margin-left: auto; 
	margin-right: auto; 
	bottom: 5%;

	${ props => props.hide && css`
		opacity: 0;
	`};
`

export default Container;