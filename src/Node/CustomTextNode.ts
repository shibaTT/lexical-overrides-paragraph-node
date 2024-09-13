import {
  $applyNodeReplacement,
  DOMExportOutput,
  EditorConfig,
  LexicalEditor,
  SerializedTextNode,
  TextNode,
} from "lexical";

export class CustomTextNode extends TextNode {
  static getType(): string {
    return "custom-text";
  }

  static clone(node: CustomTextNode): CustomTextNode {
    return new CustomTextNode(node.__text, node.__key);
  }

  exportDOM(editor: LexicalEditor): DOMExportOutput {
    const { element } = super.exportDOM(editor);
    const textContent = element ? element.textContent : "";
    const text = new Text(textContent ?? "");
    return { element: text };
  }

  createDOM(config: EditorConfig): HTMLElement {
    const element = super.createDOM(config);
    return element;
  }

  static importJSON(serializedNode: SerializedTextNode): CustomTextNode {
    const node = $createCustomTextNode(serializedNode.text);
    node.setFormat(serializedNode.format);
    node.setDetail(serializedNode.detail);
    node.setMode(serializedNode.mode);
    node.setStyle(serializedNode.style);
    return node;
  }

  exportJSON(): SerializedTextNode {
    return {
      ...super.exportJSON(),
      type: CustomTextNode.getType(),
      version: 1,
    };
  }
}

export const $createCustomTextNode = (text: string = ""): CustomTextNode => {
  return $applyNodeReplacement(new CustomTextNode(text));
};
