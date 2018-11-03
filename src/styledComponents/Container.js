import styled, { keyframes } from 'styled-components';

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
`

export default Container;