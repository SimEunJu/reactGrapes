import React, { useState, useEffect, useCallback } from "react";
import styled from "styled-components";
import checkedImg from "../../assets/img/checked.png";
import pencilImg from "../../assets/img/pencil.png";
import useAnimation from "../../hooks/animation/useAnimation";
import { shallowEqual, useSelector } from "react-redux";

const getRandRatio = () => {
	// 700 <= num <= 1200
	let num = Math.random() * 1200;
	if (num < 700) num = 700;
	return num;
};

const Grape = ({ id, seq, size, color, openModal, changeGrapeChecked }) => {
	const { startJuiceAni, endJuiceAni } = useSelector(
		({ grape }) => ({
			startJuiceAni: grape.isJuiceMaking,
			endJuiceAni: grape.isJuiceSaving,
		}),
		shallowEqual
	);

	const [dropRef, dropElAni] = useAnimation(animationConfig.drop);
	const [isEditIconVisible, setEditIconVisible] = useState(false);

	const getDropHeight = useCallback(() => {
		//offsetTop
		const top = dropRef.current.getBoundingClientRect().top;
		//document.body.clientHeight를 사용해도 상관없을 것 같다.
		//5는 스크롤 나타나는 것 방지하기 위한 패딩
		const heigtFromViewBottom =
			document.documentElement.clientHeight - top - size - 5;
		return heigtFromViewBottom;
	}, [dropRef]);

	const getDropWidth = useCallback(() => {
		// ?const size = window.innerHeight/depth;
		const left = dropRef.current.getBoundingClientRect().left;
		const centerOfView = document.documentElement.clientWidth / 2;
		const widthFromViewCenter = centerOfView - left - size / 2;
		return widthFromViewCenter;
	}, [dropRef]);

	/* TODO: 기존의 animation api 사용법으로는 해결이 안되어
    이유: parent에서 child animation이 완료되었는지 확인해야 하기 때문
    개괄적인 방법: 부모에서 Promise.all로 child animation.finished promise가 resolve되도록 대기
    방법1: child animation.finished를 부모에게 넘겨줘야 하는데 자식 -> 부모 데이터 흐름 X
    방법2: child에 handler 함수를 prop로 넘겨줌 -> 함수 내에서 자식 ref를 참조해야 하고,
    부모에서 child animation 정보를 가져야 함 -> 너무 복잡
    방법3: 결국 필요한 것은 animation.finshed! -> 부모에서 getAnimations() 호출해
        자식에서 실행되고 있는 모든 animation 객체를 가져올 수 있음
    */
	// TODO: 되돌아가기하면 오류쓰...!
	useEffect(() => {
		const height = getDropHeight();
		const width = getDropWidth();

		const { keyframes, options } = dropElAni;

		const lastKeyframe = keyframes.length - 1;
		// 해당 위치에서 하단 정중앙으로 떨어져야 하기 때문
		keyframes[
			lastKeyframe
		].transform = `translateY(${height}px) translateX(${width}px)`;
		// 떨어지는 속도 랜덤하게
		options.duration = 3 * getRandRatio();

		const keyframeEffect = new KeyframeEffect(
			dropRef.current,
			keyframes,
			options
		);
		// 애니메이션 추후에 실행할 수 있도록 준비한다.
		const dropAni = new Animation(keyframeEffect);
		dropElAni.animation = dropAni;
	}, []);
	/*
    TODO: 동시에 실행시켜야 하는 애니메이션이 여러 컴포넌트에 나뉘어져 있을 때,
    전역 상태를 사용 vs. 부모 상태
    부모의 직계 자식들에게만 애니메이션을 트리거시키면 되기 때문에 부모 상태에서 관리
    */

	useEffect(() => {
		if (!startJuiceAni) return false;

		dropElAni.animation.play();
	}, [startJuiceAni]);

	if (endJuiceAni) return <div />;
	return (
		<Drop
			color={color}
			size={size}
			onMouseEnter={() => setEditIconVisible(true)}
			onMouseLeave={() => setEditIconVisible(false)}
			ref={dropRef}
		>
			<div style={{ visibility: isEditIconVisible ? "" : "hidden" }}>
				<img
					src={pencilImg}
					onClick={() => openModal(id, seq)}
					alt="연필 이미지"
				/>
				<img
					src={checkedImg}
					onClick={() => changeGrapeChecked(id, seq)}
					alt="체크 표시 이미지"
				/>
			</div>
		</Drop>
	);
};

const animationConfig = {
	drop: {
		keyframes: [
			{ transform: "translateY(0) translateX(0)" },
			{ transform: null, backgroundColor: "white" },
		],
		options: {
			duration: null,
			fill: "forwards",
			easing: "ease",
			delay: 1000,
		},
	},
};

const Drop = styled.div`
	width: ${({ size }) => size}px;
	height: ${({ size }) => size}px;
	background-color: ${({ color }) => color};
	border-radius: 100%;
	cursor: pointer;
	margin: 2px;
	display: flex;
	justify-content: center;
	align-items: center;
	flex-direction: column;
`;

export default Grape;
