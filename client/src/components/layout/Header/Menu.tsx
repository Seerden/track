import { Popover } from "@mantine/core";
import type { PropsWithChildren, ReactNode } from "react";
import { type PopoverId, usePopover } from "@/lib/hooks/usePopover";
import S from "./style/NavBar.style";

export default function Menu({
	id,
	Target,
	children,
}: PropsWithChildren<{ id: PopoverId; Target: ReactNode }>) {
	const { opened, open, close, toggle } = usePopover("header");

	return (
		<Popover
			trapFocus
			keepMounted
			opened={opened(id)}
			onDismiss={() => close(id)}
			onClose={() => close(id)}
			closeOnEscape
			radius={"sm"}
			withArrow
			styles={{
				dropdown: {
					padding: 0,
					borderRadius: 10,
				},
			}}
		>
			<Popover.Target>
				{/* TODO: styling */}
				<S.MenuTrigger
					role="button"
					onMouseEnter={() => {
						open(id);
					}}
					onClick={() => toggle(id)}
				>
					{Target}
				</S.MenuTrigger>
			</Popover.Target>
			<Popover.Dropdown
				onMouseLeave={async () => {
					// wait 100ms, then close
					await new Promise((resolve) => setTimeout(resolve, 100));
					close(id);
				}}
			>
				{children}
			</Popover.Dropdown>
		</Popover>
	);
}
