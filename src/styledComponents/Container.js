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
	width: 85vw;
	margin: auto;
	animation: ${fadeIn} .3s linear;
	transform: rotate(0deg);
	opacity: 1;
  	transition: opacity .2s ease-out;

	${ props => props.hide && css`
		opacity: 0;
	`};
`

export default Container;