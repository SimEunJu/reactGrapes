import React, { useEffect, useRef } from "react";
import { withRouter } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { getGrapeNo } from "../../store/modules/grape";
import useAnimation from "../../hooks/animation/useAnimation";
import useEffectOnlyUpdate from "../../hooks/useEffectOnlyUpdate";

const StartBtn = ({ history }) => {
	const [btnBlockRef, slideBtnAni] = useAnimation(animationOtps.slideBtn);
	const [btnRef, expandBtnAni] = useAnimation(animationOtps.expandBtn);

	const { isDepthSet, gno, depth } = useSelector(({ grape }) => ({
		isDepthSet: grape.isDepthSet,
		depth: grape.depth,
		gno: grape.gno,
	}));
	const dispatch = useDispatch();

	useEffect(() => {
		const animations = [slideBtnAni, expandBtnAni];
		animations.forEach((ani) => {
			const { ref, animation, keyframes, options } = ani;

			if (isDepthSet)
				ani.animation = ref.current.animate(keyframes, options);
			else if (animation) animation.cancel();
		});
	}, [isDepthSet]);

	const handleClick = () => {
		if (!isDepthSet) return false;

		dispatch(getGrapeNo(depth));
	};

	useEffectOnlyUpdate(() => {
		if (gno) history.push(`/grapes/${gno}`);
		else if (gno === null) alert("잠시 후 다시 시도해주세요.");
	}, [gno]);

	return (
		<BtnBlock ref={btnBlockRef}>
			<Btn ref={btnRef} onClick={handleClick}>
				시작하기
			</Btn>
		</BtnBlock>
	);
};

const Btn = styled.button`
	margin-top: 0;
	border-radius: 50%;
	border: none;
	height: 100px;
	width: 100px;
	text-align: center;
	font-size: 20px;
	color: purple;
	font-weight: bold;
	outline: none;
	background-color: purple;
	color: white;
`;

const BtnBlock = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	visibility: hidden;
	transform: translateX(-10vw);
`;

const animationOtps = {
	expandBtn: {
		keyframes: [{ transform: "scale(1)" }, { transform: "scale(1.1)" }],
		options: {
			duration: 1000,
			iterations: Infinity,
			direction: "alternate",
			easing: "ease-out",
		},
	},
	slideBtn: {
		keyframes: [{ transform: "translateX(0)", visibility: "inherit" }],
		options: {
			duration: 1000,
			delay: 300,
			fill: "forwards",
			easing: "ease-out",
		},
	},
};

export default withRouter(StartBtn);
