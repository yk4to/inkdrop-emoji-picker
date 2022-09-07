'use babel'

import { EmojiPicker } from "./EmojiPicker"

module.exports = {

  activate() {
    inkdrop.components.registerClass(EmojiPicker)
    inkdrop.layouts.insertComponentToLayoutBefore(
      'editor-meta',
      'EditorMetaStatusPicker',
      'EmojiPicker'
    )
  },

  deactivate() {
    inkdrop.layouts.removeComponentFromLayout(
      'editor-meta',
      'EmojiPicker'
    )
    inkdrop.components.deleteClass(EmojiPicker)
  }

}
