import styled, { keyframes } from 'styled-components';

const TabContent = styled.ul.attrs({
	backgroundColor: props => props.editing ?  '#7b7b7b1f' : '#272727',
	transition: props => props.editing ? 'background-color .1s linear' : 'background-color 5s linear'
})`
    color: white;
	background-color: ${props => props.backgroundColor};
	width: 100%;
	list-style-type: none;
    margin: 0;
    padding: 0;
	display: flex;
	justify-content: center;
    align-items: center;
	transition: ${props => props.transition};
`

const fadeIn = keyframes`
from {
    opacity: 0;
}

to {
	opacity: 1;
}
`;

export const AddButton = styled.button`
	width:  50px;
    height:  50px;
    margin: 5px;
    background-color: #1010100a;
    border-radius: 50%;
    cursor: pointer;
    box-shadow: rgba(0, 0, 0, 0.3) 0px 0px 2px;
    transition: all .3s;
    animation: ${fadeIn} .3s linear;
    border: solid 2px lightblue;
    color: lightblue;

    ${AddButton}:hover {
        border: solid 2px hotpink;
        color: hotpink;
    }

    ${AddButton}:active {
        border: solid 2px lightblue;
        color: hotpink;
    }
`

export const CopyButton = styled.button`
    border: none;
    outline: none;
    cursor: pointer;
    font-size: 17px;
    background-color: inherit;
    color: white;
    border: solid 3px lightblue;

    ${CopyButton}:hover {
        border: solid 3px hotpink;
    }

    ${CopyButton}:active {
        border: solid 3px lightblue;
    }
`

export const ItemContainer = styled.span`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 50%;
`

export const ColorContainer = styled.span`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    width: 100%;
    transition: all .3s;
`

export const ColorBlock = styled.div.attrs({
    background: props => props.background || 'green',
    height: props => props.selected ? '75px' : '50px',
    width: props => props.selected ? '75px' : '50px',
})`
    height: ${props => props.height};
    width: ${props => props.width};
    margin: 5px;
    background-color: ${props => props.background};
    border-radius: 50%;
    float: left;
    cursor: pointer;
    box-shadow: rgba(0, 0, 0, 0.3) 0px 0px 2px;
    transition: all .5s;
    display: flex;
    justify-content: center;
    align-items: center;
    animation: ${fadeIn} .3s linear;

    ${ColorBlock}:hover {
        box-shadow: rgba(0, 0, 0, 0.3) 0px 0px 10px;
    }

    ${ColorBlock}:active {
        box-shadow: rgba(0, 0, 0, 0.3) 0px 0px 2px;
    }
`

export default TabContent;