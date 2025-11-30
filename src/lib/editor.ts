import type { Editor } from "@tiptap/react";

/**
 * Downloads a blob to the user's device.
 * @param blob - The blob to download.
 * @param filename - The filename to download the blob as.
 */
function download(blob: Blob, filename: string) {
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
  a.remove();
}

/**
 * Exports the editor's content as HTML.
 * @param editor - The editor instance.
 * @param filename - The filename to export the HTML as.
 */
function exportAsHTML(editor: Editor | null, filename: string) {
  if (!editor) {
    return;
  }

  const html = editor.getHTML();
  const blob = new Blob([html], { type: "text/html" });
  download(blob, filename);
}

/**
 * Exports the editor's content as JSON.
 * @param editor - The editor instance.
 * @param filename - The filename to export the JSON as.
 */
function exportAsJSON(editor: Editor | null, filename: string) {
  if (!editor) {
    return;
  }

  const json = editor.getJSON();
  const blob = new Blob([JSON.stringify(json)], { type: "application/json" });
  download(blob, filename);
}

/**
 * Exports the editor's content as text.
 * @param editor - The editor instance.
 * @param filename - The filename to export the text as.
 */
function exportAsText(editor: Editor | null, filename: string) {
  if (!editor) {
    return;
  }

  const text = editor.getText();
  const blob = new Blob([text], { type: "text/plain" });
  download(blob, filename);
}

/**
 * Inserts a table into the editor.
 * @param editor - The editor instance.
 * @param rows - The number of rows to insert.
 * @param cols - The number of columns to insert.
 */
function insertTable(editor: Editor | null, rows: number, cols: number) {
  if (!editor) {
    return;
  }

  editor.chain().focus().insertTable({ rows, cols }).run();
}

export { exportAsHTML, exportAsJSON, exportAsText, insertTable };
