import React, { useCallback } from "react";
import styled from "styled-components";
import { withRouter } from "react-router";
import MiniJuice from "./MiniJuice";

function extractYMD(date) {
	if (date == null || date.trim() === "") return "";
	return date.substring(0, 10);
}

function getDefaultIfEmpty(str, defaultVal) {
	if (str) return str;
	return defaultVal;
}
const ShowcaseRow = ({
	history,
	grapes: { rgba, title, id, createDate, finishDate },
}) => {
	const handleClick = useCallback(() => {
		history.push(`/grapes/${id}`);
	}, []);

	return (
		<RowContainer>
			<RowWrap>
				<MiniJuice rgba={rgba} handleClick={handleClick} />
				<Comment>
					<p>
						<b>{getDefaultIfEmpty(title, "제목없음")}</b>
					</p>
					<p>
						{extractYMD(createDate)} ~{" "}
						{getDefaultIfEmpty(extractYMD(finishDate), "진행중")}
					</p>
				</Comment>
			</RowWrap>
			<Bar />
		</RowContainer>
	);
};

const RowWrap = styled.div`
	display: flex;
	position: relative;

	&:before {
		content: "";
		position: absolute;
		background-color: rgba(0, 0, 0, 0.1);
		width: 100%;
		height: 100%;
		z-index: 2;
	}

	&:hover:before {
		width: 0%;
	}
`;
const Bar = styled.div`
	width: 100%;
	height: 10px;
	background-color: burlywood;
`;

const Comment = styled.div`
	padding: 20px 30px;
`;
const RowContainer = styled.div`
	position: relative;
`;

export default withRouter(ShowcaseRow);
