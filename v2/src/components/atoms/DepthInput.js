import React, { useCallback, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { changeDepth, setDepth } from "../../store/modules/grape";

const DepthInput = () => {
	const inputEl = useRef(null);
	const depth = useSelector(({ grape }) => grape.depth);
	const [depthInputVal, setDepthInputVal] = useState(depth);
	const dispatch = useDispatch();

	const handleChange = ({ target: { value } }) => {
		setDepthInputVal(value);
	};

	const shouldDispatch = useCallback(() => {
		if (depth !== depthInputVal) return true;
		return false;
	}, [depth, depthInputVal]);

	const handleInputVal = useCallback(() => {
		const parsedDepth = Number.parseInt(depthInputVal, 10);

		if (Number.isNaN(parsedDepth)) {
			alert("올바른 정수를 입력해주세요.");
			inputEl.current.focus();
			return;
		}

		if (!shouldDispatch()) return;

		dispatch(changeDepth(parsedDepth));
		dispatch(setDepth(true));
	}, [dispatch, shouldDispatch]);

	const handlekeyPress = useCallback(
		({ key }) => {
			if (key === "Enter") {
				handleInputVal();
			}
		},
		[handleInputVal]
	);

	return (
		<InputBlock>
			<label>포도송이 높이</label>
			<input
				name="depth"
				type="text"
				value={depthInputVal}
				onChange={handleChange}
				onKeyPress={handlekeyPress}
				placeholder="원하는 높이를 입력해 주세요"
				autoFocus={true}
				ref={inputEl}
			></input>
			<button type="button" onClick={handleInputVal}>
				입력
			</button>
		</InputBlock>
	);
};

const InputBlock = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;

	label {
		color: green;
		font-weight: bold;
	}

	input {
		margin: 20px;
		width: 200px;
		height: 20px;
		text-align: center;
		outline: none;
		border: 2px solid green;
	}

	button {
		border: 2px solid green;
		color: green;
		background-color: white;
		height: 25px;
		outline: none;

		&:hover {
			background-color: green;
			color: white;
		}
	}
`;

export default DepthInput;
