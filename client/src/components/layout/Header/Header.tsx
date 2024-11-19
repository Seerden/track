import NavBar from "@/components/layout/Header/NavBar";
import useReconcileSession from "@lib/hooks/useReconcileSession";

export default function Header() {
	useReconcileSession();

	return <NavBar />;
}
