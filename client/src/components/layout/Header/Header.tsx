import useReconcileSession from "@lib/hooks/useReconcileSession";
import NavBar from "@/components/layout/Header/NavBar";

export default function Header() {
	useReconcileSession();

	return <NavBar />;
}
