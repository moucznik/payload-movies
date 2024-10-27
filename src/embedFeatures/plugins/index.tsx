'use client'
import { useEffect } from 'react'
import { $insertNodeToNearestRoot, mergeRegister } from '@lexical/utils'
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext'
import { COMMAND_PRIORITY_NORMAL, createCommand, LexicalCommand } from 'lexical'
import { PluginComponent } from '@payloadcms/richtext-lexical'
import { $createEmbedNode, EmbedNode } from '../nodes'

export const INSERT_EMBER_COMMAND: LexicalCommand<undefined> = createCommand('INSERT_EMBER_COMMAND')

export const EmbedPlugin: PluginComponent = () => {
  const [editor] = useLexicalComposerContext()

  useEffect(() => {
    return mergeRegister(
      editor.registerCommand(
        INSERT_EMBER_COMMAND,
        () => {
          const embedNode: EmbedNode = $createEmbedNode({
            url: 'http://',
          })

          $insertNodeToNearestRoot(embedNode)

          return true
        },
        COMMAND_PRIORITY_NORMAL,
      ),
    )
  })

  return null
}
