import React, { Component } from 'react'
import { render } from 'react-dom'
import { EditorState, ContentState, convertToRaw } from 'draft-js'
import ArticleForm from './form.js'
import agent from '../../../agent'
import draftToHtml from 'draftjs-to-html'
import htmlToDraft from 'html-to-draftjs'

class App extends Component {
  constructor (props) {
    super(props)
    this.state = {
      title: '',
      tldr: '',
      coverImage: '',
      bodyState: EditorState.createEmpty(),
      tags: [],
      selectedTagIds: []
    }
    this.articleId = window.location.href.split('/')[5]
  }

  componentDidMount () {
    agent.Tag.getAll()
      .then(tags => {
        console.log('tags', tags)
        this.setState({tags})
      })
    agent.Article.get(this.articleId)
      .then(response => {
        console.log('response', response)

        const {title, tldr, coverImage, body, tagIds: selectedTagIds} = response.data
        const contentBlock = htmlToDraft(body)
        const contentState = ContentState.createFromBlockArray(contentBlock.contentBlocks)
        const bodyState = EditorState.createWithContent(contentState)
        this.setState({title, tldr, coverImage, bodyState, selectedTagIds})
      })
      .catch(error => {
        console.log(error)
      })
  }

  handleFormSubmit ({title, tldr, coverImage, bodyState, tagIds}) {
    const body = draftToHtml(convertToRaw(bodyState.getCurrentContent()))

    agent.Article.update(this.articleId, {title, tldr, coverImage, body, tagIds})
      .then(function (response) {
        window.location.href = '/author/articles'
      })
      .catch(function (error) {
        console.log(error)
      })
  }

  render () {
    const {title, tldr, coverImage, bodyState, tags, selectedTagIds} = this.state
    return (
      <ArticleForm
        tags={tags}
        selectedTagIds={selectedTagIds}
        submitButtonText='Edit'
        title={title}
        tldr={tldr}
        coverImage={coverImage}
        bodyState={bodyState}
        handleTagsChange={selectedTagIds => this.setState({selectedTagIds})}
        handleTitleChange={title => this.setState({title})}
        handleTldrChange={tldr => this.setState({tldr})}
        handleCoverImageChange={coverImage => this.setState({coverImage})}
        handleBodyStateChange={bodyState => this.setState({bodyState})}
        handleSubmit={this.handleFormSubmit.bind(this)} />)
  }
}

render(
  <App
  />,
  document.getElementById('mount')
)
