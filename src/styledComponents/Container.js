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
	width: 70vw;
	animation: ${fadeIn} .3s linear;
	opacity: 1;
	transition: opacity .2s ease-out;
	margin: auto;

	${ props => props.hide && css`
		opacity: 0;
	`};
`

export default Container;