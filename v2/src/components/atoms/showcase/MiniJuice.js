import React from "react";
import styled from "styled-components";

const MiniJuice = ({ rgba, handleClick }) => {
	return (
		<BottleBlock>
			<Cap />
			<BottleEnter />
			<BottleNeck />
			<BottleBody>
				<Liquid rgba={rgba} onClick={handleClick} />
			</BottleBody>
		</BottleBlock>
	);
};

const BottleBlock = styled.div`
	position: relative;
	margin: 0 20px;
`;

const Cap = styled.div`
	position: relative;
	top: 15px;
	margin: auto;
	border-radius: 7px;
	width: 30px;
	height: 30px;
	background-color: brown;
`;

const BottleEnter = styled.div`
	border-radius: 3px;
	margin: auto;
	position: relative;
	top: 2px;
	border: 2px solid black;
	width: 48px;
	height: 17px;
	background-color: white;
`;

const BottleNeck = styled.div`
	border: 2px solid black;
	position: relative;
	border-bottom: none;
	margin: auto;
	border-top: none;
	width: 31px;
	height: 19px;
	background-color: white;
	z-index: 1;
`;
const BottleBody = styled.div`
	border: 2px solid black;
	width: 86px;
	height: 110px;
	position: relative;
	top: -2px;
	border-top-left-radius: 35%;
	border-top-right-radius: 35%;
	border-bottom-left-radius: 7px;
	border-bottom-right-radius: 7px;
	background-color: white;
	margin: auto;
`;
const Liquid = styled.div`
	width: 100%;
	height: 70%;
	position: relative;
	top: 30%;
	background-color: ${p => p.rgba};
`;

export default MiniJuice;
