import { convertFromRaw, convertToRaw, EditorState } from "draft-js";
// @ts-ignore
import { draftjsToMd, mdToDraftjs } from "draftjs-md-converter";
import { RTState } from "./types";

export function stateToMarkdown(state: RTState): string {
    return draftjsToMd(convertToRaw(state));
}

export function markdownToState(md: string): RTState {
    const rawData = mdToDraftjs(md);
    return convertFromRaw(rawData);
}

export function createEmptyState(): RTState {
    return EditorState.createEmpty().getCurrentContent();
}
