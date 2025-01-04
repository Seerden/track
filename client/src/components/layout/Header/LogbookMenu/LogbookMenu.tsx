import useLogbookMenu from "@/components/layout/Header/LogbookMenu/useLogbookMenu";
import { FloatingArrow } from "@floating-ui/react";
import {
	LucideActivity,
	LucideNotebookPen,
	LucideNotebookTabs,
	LucidePin
} from "lucide-react";
import S from "../style/menu.style";

type LogbookMenuProps = {
	iconSize?: number;
};

export default function LogbookMenu({ iconSize = 15 }: LogbookMenuProps) {
	const { float } = useLogbookMenu();

	return (
		<>
			<S.TriggerButton ref={float.refs.setReference} {...float.getReferenceProps()}>
				Logbooks
			</S.TriggerButton>

			{float.open && (
				<>
					<S.Menu
						ref={float.refs.setFloating}
						style={{
							...float.floatingStyles
						}}
						{...float.getFloatingProps()}
					>
						<FloatingArrow
							ref={float.arrowRef}
							context={float.context}
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
								<LucideActivity size={iconSize} /> Recent logs
							</S.MenuSectionHeader>
							<S.LinkCards>
								<S.LinkCard to="">Groceries 10 december</S.LinkCard>
								<S.LinkCard to="">PPL 9 december</S.LinkCard>
							</S.LinkCards>
						</S.MenuSection>

						<S.MenuSection>
							<S.MenuSectionHeader>
								<LucidePin size={iconSize} /> Pinned
							</S.MenuSectionHeader>
							<S.LinkCards>
								<S.LinkCard to="">Weightlifting</S.LinkCard>
							</S.LinkCards>
						</S.MenuSection>
					</S.Menu>
				</>
			)}
		</>
	);
}
