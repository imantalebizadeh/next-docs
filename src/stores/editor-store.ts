import type { Editor } from "@tiptap/react";
import { create } from "zustand";

export type EditorState = {
  editor: Editor | null;
};

export type EditorActions = {
  setEditor: (editor: Editor | null) => void;
};

export type EditorStore = EditorState & EditorActions;

export const defaultInitState: EditorState = {
  editor: null,
};

export const createEditorStore = (initState: EditorState = defaultInitState) =>
  create<EditorStore>()((set) => ({
    ...initState,
    setEditor: (editor: Editor | null) => set({ editor }),
  }));
