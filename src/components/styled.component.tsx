import { Avatar, Badge, List, Popover } from "antd";
import styled from "styled-components";

const orange = "#f5d9c7";
const blue = "#c0cddb";
const gold = "#D4AF37";
const silver = "#87868c";
const bronze = "#A97142";

export const StyleListItem = styled(List.Item) <{ score: number, place: number }>`
		background-color: ${(props) => (props.score % 2 === 0 ? orange : blue)};
		.ant-list-item-main {
			display: flex;
			flex-direction: column;
			justify-content: center;
		}
		.ant-list-item-meta {
			flex: initial;
			margin-bottom: 0;
		}
		.ant-list-item-meta-title,
		.ant-list-item-meta-description {
			text-align: start;
		}
		.ant-list-item-action {
			margin-left: ${(props) => ((props.place === 1 ? 50 : (props.place === 2 ? 40 : (props.place === 3 ? 35 : 24))) + 16)}px;
			display: flex;
			justify-content: start;
		}
	`;

export const GoldAwardBadge = styled(Badge)`
		.ant-badge-count {
			background-color: ${gold};
		}
	`;

export const StyledPopover = styled(Popover)`
		cursor: pointer;
	`;

export const PlaceBadge = styled(Avatar) <{ place: number }>`
		width: ${(props) => (props.place === 1 ? 50 : (props.place === 2 ? 40 : (props.place === 3 ? 35 : 24)))}px;
		height: ${(props) => (props.place === 1 ? 50 : (props.place === 2 ? 40 : (props.place === 3 ? 35 : 24)))}px;
		line-height: ${(props) => (props.place === 1 ? 50 : (props.place === 2 ? 40 : (props.place === 3 ? 35 : 24)))}px;
		font-size: ${(props) => (props.place < 4 ? 18 : 14)}px;
		background: ${(props) => (props.place === 1 ? gold : (props.place === 2 ? silver : (props.place === 3 ? bronze : "#ccc")))};
	`;