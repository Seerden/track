import { Popover, Radio, TextInput, Tooltip } from "@mantine/core";
import {
	LucideChevronUp,
	LucideCircleDot,
	LucideFunnelPlus,
	type LucideIcon,
	LucideSearch,
} from "lucide-react";
import type { ChangeEventHandler, ReactNode } from "react";
import RadioOption from "@/components/Today/RadioOption";
import { AnimatedIcon } from "@/lib/animate/AnimatedIcon";
import Buttons from "@/lib/theme/components/buttons";
import Containers from "@/lib/theme/components/container.style";
import Today from "./style/Today.style";

export type RadioGroupOption = {
	value: string | undefined;
	tooltipLabel: string;
	Icon: LucideIcon;
};

type BlockHeaderProps = {
	radioOptions: RadioGroupOption[];
	radioGroupLabel: string;
	radioValue: string | undefined;
	searchValue: string;
	onRadioValueChange: (value: string) => void;
	onSearchValueChange: ChangeEventHandler<HTMLInputElement>;
	triggerAriaLabel: string;
	triggerTooltipOn: string | ReactNode;
	triggerTooltipOff: string | ReactNode;
	popoverOpened: boolean | null;
	togglePopover: () => void;
	onPopoverClose: () => void;
	title: string | ReactNode;
	labelOn?: boolean;
	checked: (value: string | undefined) => boolean;
};

export default function BlockHeader({
	radioOptions,
	radioGroupLabel,
	radioValue,
	searchValue,
	onSearchValueChange,
	triggerAriaLabel,
	triggerTooltipOn,
	triggerTooltipOff,
	popoverOpened,
	onPopoverClose,
	title,
	labelOn,
	togglePopover,
	onRadioValueChange,
	checked,
}: BlockHeaderProps) {
	{
		/* TODO: we're gonna use this in more places, so we need to define the styles */
	}
	return (
		<Popover
			keepMounted
			trapFocus
			width="target"
			opened={!!popoverOpened}
			onClose={onPopoverClose}
			onDismiss={onPopoverClose}
			styles={{
				dropdown: {
					marginTop: "-0.5rem",
					backgroundColor: "var(--bg-1-2)",
				},
			}}
		>
			<Popover.Target>
				<Today.BlockTitle as="header">
					<h2
						style={{
							display: "flex",
							width: "max-content",
						}}
					>
						{title}
					</h2>

					<Tooltip label={labelOn ? triggerTooltipOn : triggerTooltipOff}>
						<Buttons.Unstyled
							onClick={togglePopover}
							role="button"
							type="button"
							aria-label={triggerAriaLabel}
						>
							<AnimatedIcon
								size={18}
								off={labelOn ? <LucideFunnelPlus /> : <LucideCircleDot />}
								intermediate={null}
								on={<LucideChevronUp />}
								state={!!popoverOpened}
							/>
						</Buttons.Unstyled>
					</Tooltip>
				</Today.BlockTitle>
			</Popover.Target>
			<Popover.Dropdown>
				<Containers.Row
					style={{
						justifyContent: "space-between",
						alignItems: "center",
					}}
				>
					<Radio.Group
						aria-label={radioGroupLabel}
						onChange={onRadioValueChange}
						value={radioValue}
					>
						<Containers.Row gap="small">
							{radioOptions.map((option) => (
								<RadioOption
									key={option.value}
									{...option}
									checked={checked(option.value)}
								/>
							))}
						</Containers.Row>
					</Radio.Group>
					<TextInput
						value={searchValue}
						onChange={onSearchValueChange}
						w="200"
						size="sm"
						rightSection={<LucideSearch size={15} />}
					/>
				</Containers.Row>
			</Popover.Dropdown>
		</Popover>
	);
}
