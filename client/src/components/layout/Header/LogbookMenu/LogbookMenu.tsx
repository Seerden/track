import useLogbookMenu from "@/components/layout/Header/LogbookMenu/useLogbookMenu";
import { FloatingArrow } from "@floating-ui/react";
import {
	LucideActivity,
	LucideNotebookPen,
	LucideNotebookTabs,
	LucidePin
} from "lucide-react";
import S from "./style/LogbookMenu.style";

export default function LogbookMenu() {
	const {
		arrowRef,
		context,
		floatingStyles,
		open,
		refs,
		getFloatingProps,
		getReferenceProps
	} = useLogbookMenu();

	return (
		<>
			<S.TriggerButton ref={refs.setReference} {...getReferenceProps()}>
				Logbooks
			</S.TriggerButton>

			{open && (
				<>
					<S.Menu
						ref={refs.setFloating}
						style={{
							...floatingStyles
						}}
						{...getFloatingProps()}
					>
						<FloatingArrow
							ref={arrowRef}
							context={context}
							fill="#fff"
							width={20}
						/>
						<S.MenuSection>
							<S.Link to={`/logbooks`}>
								<LucideNotebookTabs /> logbooks
							</S.Link>
							<S.Link to={`/logbooks/new`}>
								<LucideNotebookPen /> new logbook
							</S.Link>
						</S.MenuSection>

						{/* These recent and pinned log(book)s are mocked because the 
                  functionality doesn't exist yet. */}
						<S.MenuSection>
							<S.MenuSectionHeader>
								<LucideActivity size={15} color="orange" /> Recent logs
							</S.MenuSectionHeader>
							<S.LinkCards style={{ listStyle: "none" }}>
								<S.LinkCard to="">Groceries 10 december</S.LinkCard>
								<S.LinkCard to="">PPL 9 december</S.LinkCard>
							</S.LinkCards>
						</S.MenuSection>

						<S.MenuSection>
							<S.MenuSectionHeader>
								<LucidePin size={15} color="orange" /> Pinned
							</S.MenuSectionHeader>
							<S.LinkCards style={{ listStyle: "none" }}>
								<S.LinkCard to="">Weightlifting</S.LinkCard>
							</S.LinkCards>
						</S.MenuSection>
					</S.Menu>
				</>
			)}
		</>
	);
}
