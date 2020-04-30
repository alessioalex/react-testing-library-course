import React, {useState} from 'react'
import {savePost} from './api'

function Editor({user}) {
  const [isSaving, setIsSaving] = useState(false)

  function handleSubmit(evt) {
    evt.preventDefault()
    setIsSaving(true)

    const {title, content, tags} = evt.target.elements

    const newPost = {
      title: title.value,
      content: content.value,
      tags: tags.value.split(',').map(t => t.trim()),
      authorId: user.id,
    }

    savePost(newPost)
  }

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="title-input">Title</label>
      <input id="title-input" name="title" />

      <label htmlFor="content-input">Content</label>
      <textarea id="content-input" name="content" />

      <label htmlFor="tags-input">Tags</label>
      <input id="tags-input" name="tags" />

      <input type="hidden" name="authorId" value={user.id} />

      <button type="submit" disabled={isSaving}>
        Submit
      </button>
    </form>
  )
}

export {Editor}
