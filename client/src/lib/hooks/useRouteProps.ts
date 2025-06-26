import { useLocation, useNavigate, useParams } from "@tanstack/react-router";

function useRouteProps() {
	return {
		location: useLocation(),
		navigate: useNavigate(),
		params: useParams({ strict: false })
	};
}

export default useRouteProps;
