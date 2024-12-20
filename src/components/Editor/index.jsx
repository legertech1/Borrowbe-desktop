import { AutoFocusPlugin } from "@lexical/react/LexicalAutoFocusPlugin";

import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import { LexicalErrorBoundary } from "@lexical/react/LexicalErrorBoundary";
import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin";
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
import ToolbarPlugin from "./plugins/ToolbarPlugin";
import "./styles.css";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { useEffect, useState } from "react";
import { setFormData } from "../../store/adSlice";
import { useDispatch, useSelector } from "react-redux";
import { $generateHtmlFromNodes, $generateNodesFromDOM } from "@lexical/html";
import { OnChangePlugin } from "@lexical/react/LexicalOnChangePlugin";
import { $createParagraphNode, $getRoot, $isElementNode } from "lexical";
import { ListPlugin } from "@lexical/react/LexicalListPlugin";
const parser = new DOMParser();
const InsertHTMLPlugin = ({ htmlContent }) => {
  const [editor] = useLexicalComposerContext();

  useEffect(() => {
    console.log(htmlContent);
    if (htmlContent) {
      editor.update(() => {
        const parser = new DOMParser();
        const dom = parser.parseFromString(htmlContent, "text/html");
        const nodes = $generateNodesFromDOM(editor, dom);

        const root = $getRoot();

        root.clear();

        nodes.forEach((node) => {
          if (!$isElementNode(node)) {
            // Wrap non-element nodes in a paragraph
            const paragraphNode = $createParagraphNode();
            paragraphNode.append(node);
            root.append(paragraphNode);
          } else {
            root.append(node);
          }
        });
      });
    }
    // Mark the content as initialized
  }, [editor, htmlContent]);

  return null;
};

export default function Editor({ placeholder, initialState }) {
  const formData = useSelector((state) => state.ad);
  const dispatch = useDispatch();

  const handleChange = (editorState, editor) => {
    editor.update(() => {
      // Generate HTML from the editor state
      const htmlString = document.querySelector(".editor-input").innerHTML;
      if (
        parser
          .parseFromString(htmlString || "", "text/html")
          .body.textContent.trim()
      )
        dispatch(setFormData({ ...formData, description: htmlString }));
    });
  };

  return (
    <div className="editor-container">
      <ToolbarPlugin />
      <div className="editor-inner">
        <InsertHTMLPlugin htmlContent={initialState} />
        <RichTextPlugin
          contentEditable={
            <ContentEditable
              className="editor-input"
              aria-placeholder={placeholder}
              placeholder={
                <div className="editor-placeholder">{placeholder}</div>
              }
            />
          }
          ErrorBoundary={LexicalErrorBoundary}
        />
        <OnChangePlugin onChange={handleChange} />
        <HistoryPlugin />
        <ListPlugin />
        <AutoFocusPlugin />
      </div>
    </div>
  );
}
