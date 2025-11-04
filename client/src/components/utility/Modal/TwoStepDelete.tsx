import { Popover } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { LucideX } from "lucide-react";
import type { MouseEvent, ReactNode } from "react";
import Buttons from "@/lib/theme/components/buttons";
import Containers from "@/lib/theme/components/container.style";
import { actionDropdownStyle } from "@/lib/theme/components/containers/popover.style";
import { spacingValue } from "@/lib/theme/snippets/spacing";

/* This is a generalized two-step delete button for detail modals specifically,
currently implemented in DetailedHabit and DetailedActivity. */
export default function TwoStepDelete({
	disabled,
	title,
	handleConfirmClick,
	confirmLabel,
	rejectLabel,
}: {
	disabled?: boolean;
	title: string | ReactNode;
	handleConfirmClick: (e: MouseEvent<HTMLButtonElement>) => void;
	confirmLabel: string | ReactNode;
	rejectLabel: string | ReactNode;
}) {
	const [opened, { toggle, close }] = useDisclosure(false);

	return (
		<Popover
			withArrow
			opened={opened}
			onChange={toggle}
			trapFocus
			closeOnClickOutside
		>
			<Popover.Target>
				<Buttons.Action.Stylized
					disabled={disabled}
					$color="orange"
					type="button"
					onClick={toggle}
				>
					<LucideX size={20} />
				</Buttons.Action.Stylized>
			</Popover.Target>
			<Popover.Dropdown style={actionDropdownStyle}>
				{title}
				<Containers.Row gap="small" style={{ marginTop: spacingValue.smaller }}>
					<Buttons.Action.DefaultText
						$color="red"
						type="button"
						onClick={handleConfirmClick}
					>
						{confirmLabel}
					</Buttons.Action.DefaultText>
					<Buttons.Action.DefaultText $minimal type="button" onClick={close}>
						{rejectLabel}
					</Buttons.Action.DefaultText>
				</Containers.Row>
			</Popover.Dropdown>
		</Popover>
	);
}
