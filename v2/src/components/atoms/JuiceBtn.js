import React from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { makingJuice } from "../../store/modules/grape";

const JuiceBtn = () => {
	const isJuiceSaving = useSelector(({ grape }) => grape.isJuiceSaving);
	const dispatch = useDispatch();

	const handleClick = () => {
		if (isJuiceSaving) return;
		dispatch(makingJuice());
	};

	return (
		<JuiceBtnSvg
			onClick={handleClick}
			width="100"
			height="100"
			xmlns="http://www.w3.org/2000/svg"
		>
			<circle
				className="juiceBtn"
				cx="50"
				cy="50"
				fill="gold"
				r="40"
			></circle>
			<text x="35" y="45">
				주스
			</text>
			<text x="25" y="65">
				만들기
			</text>
		</JuiceBtnSvg>
	);
};

const JuiceBtnSvg = styled.svg`
	position: fixed;
	left: calc(100vw - 130px);
	top: 8px;
	cursor: pointer;
	filter: drop-shadow(0 0 10px rgba(255, 235, 59, 1));
`;

export default JuiceBtn;
