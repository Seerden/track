import { TRANSFORMERS } from "@lexical/markdown";
import { LexicalComposer } from "@lexical/react/LexicalComposer";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import { PlainTextPlugin } from "@lexical/react/LexicalPlainTextPlugin";

import { CodeNode } from "@lexical/code";
import { LinkNode } from "@lexical/link";
import { ListItemNode, ListNode } from "@lexical/list";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin";
import { HorizontalRuleNode } from "@lexical/react/LexicalHorizontalRuleNode";
import { MarkdownShortcutPlugin } from "@lexical/react/LexicalMarkdownShortcutPlugin";
import type { HeadingTagType } from "@lexical/rich-text";
import { $createHeadingNode, HeadingNode, QuoteNode } from "@lexical/rich-text";

import { $getSelection, $isRangeSelection } from "lexical";
import styled from "styled-components";

const EditorWrapper = styled.div`
	border: 1px solid #ccc;
	padding: 8px;
	border-radius: 4px;
	background-color: #fefefe;
	font-family: "Arial", sans-serif;
`;

const StyledContentEditable = styled(ContentEditable)`
	outline: none;
	width: 100%;
	height: 150px;
	font-size: 16px;
	font-family: monospace;
	line-height: 1.5;
	color: #333;
	overflow-y: auto;
`;

const Placeholder = styled.div`
	position: absolute;
	color: #999;
	font-size: 16px;
	font-family: monospace;
`;

const ToolbarWrapper = styled.div`
	display: flex;
	gap: 8px;
	border-bottom: 1px solid #ddd;
	padding: 8px;
	background-color: #f9f9f9;
`;

const ToolbarButtonStyled = styled.button`
	border: none;
	background-color: #eaeaea;
	border-radius: 4px;
	padding: 6px 12px;
	cursor: pointer;
	font-size: 14px;
	&:hover {
		background-color: #ddd;
	}
`;

const Toolbar = () => {
	const [editor] = useLexicalComposerContext();

	const applyHeading = (level: number) => {
		editor.update(() => {
			const selection = $getSelection();
			if ($isRangeSelection(selection)) {
				const headingNode = $createHeadingNode(`h${level}` as HeadingTagType);
				headingNode.append(...selection.extract());
			}
		});
	};

	return (
		<ToolbarWrapper>
			<ToolbarButtonStyled onClick={() => applyHeading(1)}>H1</ToolbarButtonStyled>
			<ToolbarButtonStyled onClick={() => applyHeading(2)}>H2</ToolbarButtonStyled>
			<ToolbarButtonStyled onClick={() => applyHeading(3)}>H3</ToolbarButtonStyled>
			{/* Add more buttons here for bold, italic, etc. */}
		</ToolbarWrapper>
	);
};

const MarkdownEditor = () => {
	const initialConfig = {
		namespace: "MarkdownEditor",
		onError: (error: Error) => {
			console.error("Lexical Error:", error);
		},
		nodes: [
			HorizontalRuleNode,
			CodeNode,
			LinkNode,
			ListNode,
			ListItemNode,
			HeadingNode,
			QuoteNode
		], // Include necessary nodes
		theme: {} // Optionally define a theme for the editor
	};

	return (
		<LexicalComposer initialConfig={initialConfig}>
			<EditorWrapper>
				<Toolbar />
				<PlainTextPlugin
					contentEditable={<StyledContentEditable />}
					placeholder={<Placeholder>Enter Markdown...</Placeholder>}
					ErrorBoundary={({ children }) => <>{children}</>}
				/>
				<MarkdownShortcutPlugin transformers={TRANSFORMERS} />
				<HistoryPlugin />
			</EditorWrapper>
		</LexicalComposer>
	);
};

export default MarkdownEditor;
