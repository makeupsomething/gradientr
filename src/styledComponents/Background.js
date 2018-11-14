import styled from 'styled-components';

const Background = styled.div.attrs({
	background: props => props.background || 'pappyawhip',
})`
	height: 100vh;
	width: 100vw;
	background: ${props => props.background};
`;

export default Background;