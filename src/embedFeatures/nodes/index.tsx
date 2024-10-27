import { JSX, lazy } from 'react'
import {
  DecoratorBlockNode,
  SerializedDecoratorBlockNode,
} from '@lexical/react/LexicalDecoratorBlockNode'
import {
  $applyNodeReplacement,
  DOMExportOutput,
  EditorConfig,
  ElementFormatType,
  LexicalEditor,
  LexicalNode,
  NodeKey,
  SerializedLexicalNode,
  Spread,
} from 'lexical'

export type EmbedNodeData = {
  url: string
}

export type SerializedEmbedNode = Spread<
  {
    fields: EmbedNodeData
    type: 'embed'
    children?: never
  },
  SerializedDecoratorBlockNode
>

const EmbedComponent = lazy(() =>
  import('../component/').then((module) => ({
    default: module.EmbedComponent,
  })),
)

export class EmbedNode extends DecoratorBlockNode {
  __data: EmbedNodeData

  constructor({
    data,
    format,
    key,
  }: {
    data: EmbedNodeData
    format: ElementFormatType
    key: NodeKey
  }) {
    super(format, key)
    this.__data = data
  }

  static clone(node: EmbedNode): EmbedNode {
    return new EmbedNode({
      data: node.__data,
      format: node.__format,
      key: node.__key,
    })
  }

  static getType(): string {
    return 'embed'
  }

  static importJSON(serializedNode: SerializedLexicalNode): EmbedNode {
    const newEmbedNode: EmbedNode = $createEmbedNode({
      url: serializedNode.fields.url,
    })
    newEmbedNode.setFormat(serializedNode.format)
    return newEmbedNode
  }

  decorate(): JSX.Element {
    return <EmbedComponent />
  }

  exportJSON(): SerializedDecoratorBlockNode {
    return {
      ...super.exportJSON(),
      fields: this.getData(),
      type: 'embed',
      version: 1,
    }
  }

  getData(): EmbedNodeData {
    return this.getLatest().__data
  }

  setData(data: EmbedNodeData) {
    const writable = this.getWritable()
    writable.__data = data
  }

  exportDOM(editor: LexicalEditor): DOMExportOutput {
    return {
      element: document.createElement('div'),
    }
  }

  getTextContent(): string {
    return this.getData()?.url
  }
}

export function $createEmbedNode(data: EmbedNodeData): EmbedNode {
  return $applyNodeReplacement(
    new EmbedNode({
      data,
    }),
  )
}

export function $isEmbedNode(node: LexicalEditor | null | undefined): node is EmbedNode {
  return node instanceof EmbedNode
}
