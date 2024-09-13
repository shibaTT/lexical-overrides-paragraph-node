import { LexicalComposer } from "@lexical/react/LexicalComposer";
import { AutoFocusPlugin } from "@lexical/react/LexicalAutoFocusPlugin";
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin";
import { LexicalErrorBoundary } from "@lexical/react/LexicalErrorBoundary";
import { TextNode } from "lexical";
import { CustomTextNode } from "./nodes/CustomTextNode";
import ShowDOMPlugin from "./plugins/ShowDOMPlugin";

function App() {
  function onError(error: Error) {
    console.error(error);
  }

  const initialConfig = {
    namespace: "override",
    onError,
    nodes: [
      CustomTextNode,
      {
        replace: TextNode,
        with: (node: TextNode) => {
          return new CustomTextNode(node.getTextContent());
        },
      },
    ],
  };

  return (
    <div className="min-h-screen w-screen bg-slate-100">
      <h1 className="pt-10 text-center text-4xl font-black">
        Override Paragraph Node
      </h1>
      <div className="mx-auto mt-10 max-w-2xl overflow-hidden rounded-lg bg-white shadow-2xl shadow-slate-300">
        <LexicalComposer initialConfig={initialConfig}>
          <div className="w-full">
            <RichTextPlugin
              contentEditable={
                <ContentEditable className="h-[60svh] w-full overflow-y-scroll p-3 focus:outline-none" />
              }
              ErrorBoundary={LexicalErrorBoundary}
            />
            <ShowDOMPlugin />
            <HistoryPlugin />
            <AutoFocusPlugin />
          </div>
        </LexicalComposer>
      </div>
    </div>
  );
}

export default App;
