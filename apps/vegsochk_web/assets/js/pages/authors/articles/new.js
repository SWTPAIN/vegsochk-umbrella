import React, {Component} from 'react'
import { render } from 'react-dom'
import { EditorState, convertToRaw } from 'draft-js'
import ArticleForm from './form.js'
import agent from '../../../agent'
import draftToHtml from 'draftjs-to-html'

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
  }

  componentDidMount () {
    agent.Tag.getAll()
      .then(tags => {
        this.setState({tags})
      })
  }

  handleFormSubmit ({title, tldr, coverImage, bodyState, tagIds}) {
    const body = draftToHtml(convertToRaw(bodyState.getCurrentContent()))

    agent.Article.create({
      title,
      tldr,
      coverImage,
      body,
      tagIds
    })
    .then(function (response) {
      window.location.href = '/author/articles'
    })
    .catch(function (error) {
      console.log(error)
    })
  }

  render () {
    const {title, tldr, bodyState,
      tags, selectedTagIds, coverImage
    } = this.state
    return (
      <ArticleForm
        tags={tags}
        selectedTagIds={selectedTagIds}
        submitButtonText='Create'
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
