import Loader from "react-loader-spinner";
import styled from "styled-components";

const LoaderBlock = styled.div`
	width: 100vw;
	height: 100vh;
	display: flex;
	justify-content: center;
	align-items: center;
`;

const FullLoader = () => (
	<LoaderBlock>
		<Loader type="Circles" color="#00BFFF" height={200} width={200} />
	</LoaderBlock>
);

export default FullLoader;
