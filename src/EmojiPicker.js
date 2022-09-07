'use babel'

import React, { useState } from 'react'
import { actions } from 'inkdrop'
import { Picker } from 'emoji-mart'
import yaml from 'js-yaml'
const matter = require('white-matter')
const emojiRegex = require('emoji-regex')

function generateFrontMatter(data, emoji) {
  const newData = {
    ...data,
    'emoji': emoji,
  };
  const yamlText = yaml.dump(newData)+''
  return `---
${yamlText}---
`
}

export const EmojiPicker = () => {
  const [isShown, setIsShown] = useState(false)

  const selectEmoji = (emoji) => {
    const { editingNote } = inkdrop.store.getState()
    const { body }  = editingNote
    const { data, content } = matter(body)

    const newBody = generateFrontMatter(data, emoji.native) + content
    inkdrop.store.dispatch(actions.editingNote.update({ body: newBody }))
    inkdrop.store.dispatch(actions.editor.change(true))

    setIsShown(false)
  }

  const closePicker = () => {
    setIsShown(false)
  }

  const { editingNote } = inkdrop.store.getState()
  const { body }  = editingNote
  const { data } = matter(body)

  const getEmoji = () => {
    const regex = emojiRegex()

    if (data && data['emoji']) {
      const match = data.emoji.match(regex)
      if (match.length > 0 && match[0] === data['emoji']) {
        return match[0]
      }
    }
    return undefined
  }

  return (
    <div className='emoji-picker'>
      <div className='emoji-picker-dropdown' onClick={function(){setIsShown(!isShown)}}>
        <div className='ui dropdown no-drag'>
          <div className={getEmoji() ? 'text': 'default text'}>
            {getEmoji() ? (
              <span className='emoji'>{getEmoji()}</span>
            ) : (
              <span>{"Emoji"}</span>
            )}
            <i className='dropdown icon'/>
          </div>
        </div>
      </div>
      <div className={'emoji-picker-observer '+ (isShown ? undefined : 'untouchable')} onClick={closePicker}/>
      {isShown ?  
        <div className='emoji-picker-menu'>
          <Picker set='apple' onSelect={selectEmoji} showPreview={false} showSkinTones={false} native/>
        </div>
      : undefined}
    </div>
  );
};
