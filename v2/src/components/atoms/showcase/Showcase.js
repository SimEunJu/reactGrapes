import React, { useEffect, useMemo, useLayoutEffect, useRef } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import ShowcaseRow from "./ShowcaseRow";
import { getShowcase } from "../../../store/modules/grape";
import ScrollSentinel from "../ScrollSentinel";
import Loader from "../Loader";
import NetworkErr from "../../pages/error/NetworkErr";

const Showcase = () => {
	const { showcase, showcasePaging, getShowcaseSuccess, getShowcaseLoading } =
		useSelector(({ grape, loading }) => ({
			getShowcaseSuccess: grape.getShowcaseSuccess,
			getShowcaseLoading: loading["grape/getShowcase"],
			showcase: grape.showcase,
			showcasePaging: grape.showcasePaging,
		}));
	const dispatch = useDispatch();

	useEffect(() => {
		loadMoreData();
	}, []);

	const loadMoreData = () => {
		if (!showcasePaging.hasNext) return;

		dispatch(
			getShowcase({
				size: showcasePaging.size,
				page: showcasePaging.page + 1,
			})
		);
	};

	if (!getShowcaseSuccess) return <NetworkErr />;

	return (
		<ShowcaseFrame>
			{showcase.map((grape) => (
				<ShowcaseRow grapes={grape} />
			))}
			{getShowcaseLoading && <Loader />}
			<ScrollSentinel
				apiCall={loadMoreData}
				isStop={!showcasePaging.hasNext}
			/>
		</ShowcaseFrame>
	);
};

const ShowcaseFrame = styled.div`
	margin: 50px;
	border: 7px solid olivedrab;
	background-color: white;
`;

export default Showcase;
