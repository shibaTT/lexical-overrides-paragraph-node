import { useEffect, useState } from "react";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { $generateHtmlFromNodes } from "@lexical/html";

import * as prettier from "prettier/standalone";
import * as parserHtml from "prettier/parser-html";

export default function ShowDOMPlugin() {
  const [dom, setDom] = useState<string>("");
  const [editor] = useLexicalComposerContext();

  useEffect(() => {
    return editor.registerUpdateListener(({ editorState }) => {
      editorState.read(async () => {
        const elementString = $generateHtmlFromNodes(editor, null);

        const formattedElementString = await prettier.format(elementString, {
          tabWidth: 4,
          printWidth: 80,
          parser: "html",
          plugins: [parserHtml],
        });
        setDom(formattedElementString);
        // console.log(formattedElementString);
      });
    });
  });

  return (
    <div className="relative h-[20svh] overflow-y-scroll bg-slate-800">
      <span className="fixed ml-4 rounded-b-md bg-slate-300 px-2 py-0.5 text-sm">
        DOM
      </span>
      <pre className="mt-4 h-full w-full whitespace-pre-wrap p-4 text-sm text-white">
        {dom}
      </pre>
    </div>
  );
}
