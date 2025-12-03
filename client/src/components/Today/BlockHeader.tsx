import { Collapse, Radio, TextInput, Tooltip } from "@mantine/core";
import { useClickOutside } from "@mantine/hooks";
import {
	LucideChevronUp,
	LucideCircleDot,
	LucideFunnelPlus,
	type LucideIcon,
	LucideSearch,
} from "lucide-react";
import { type ChangeEventHandler, type ReactNode, useRef } from "react";
import RadioOption from "@/components/utility/RadioOption";
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
	title,
	labelOn,
	togglePopover,
	onRadioValueChange,
	checked,
}: BlockHeaderProps) {
	const targetRef = useRef<HTMLButtonElement>(null);
	const filterRef = useClickOutside((e) => {
		if (popoverOpened) {
			if (e.composedPath().includes(targetRef.current as Node)) {
				return;
			}

			togglePopover();
		}
	});

	return (
		<>
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
						ref={targetRef}
						onClick={togglePopover}
						aria-controls={triggerAriaLabel}
						aria-expanded={!!popoverOpened}
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
			<Collapse in={!!popoverOpened} animateOpacity transitionDuration={150}>
				<Containers.Row
					ref={filterRef}
					id={triggerAriaLabel}
					style={{
						justifyContent: "space-between",
						alignItems: "center",
						backgroundColor: "var(--bg-1-2)",
						padding: "0.5rem",
						borderRadius: 3,
						marginBottom: "1rem",
						boxShadow: "0 0.3rem 0 -0.2rem var(--bg-3-4)",
					}}
				>
					<Radio.Group
						autoFocus={false}
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
			</Collapse>
		</>
	);
}
