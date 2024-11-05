import { useLocation, useNavigate, useParams } from "react-router";

function useRouteProps() {
	return {
		location: useLocation(),
		navigate: useNavigate(),
		params: useParams()
	};
}

export default useRouteProps;
