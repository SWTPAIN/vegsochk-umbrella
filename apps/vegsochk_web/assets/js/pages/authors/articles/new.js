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
      bodyState: EditorState.createEmpty(),
      categories: [],
      selectedCategoryIds: []
    }
  }

  componentDidMount () {
    agent.Category.getAll()
      .then(categories => {
        this.setState({categories})
      })
  }

  handleFormSubmit (title, bodyState, categoryIds) {
    const body = draftToHtml(convertToRaw(bodyState.getCurrentContent()))

    agent.Article.create({
      article: {
        title,
        body,
        categoryIds
      }
    })
    .then(function (response) {
      window.location.href = '/author/articles'
    })
    .catch(function (error) {
      console.log(error)
    })
  }

  handleTitleChange (title) {
    this.setState({title: title})
  }

  handleBodyStateChange (bodyState) {
    this.setState({bodyState})
  }

  render () {
    const {title, bodyState, categories, selectedCategoryIds} = this.state
    return (
      <ArticleForm
        categories={categories}
        selectedCategoryIds={selectedCategoryIds}
        submitButtonText='Create'
        title={title}
        bodyState={bodyState}
        handleCategoriesChange={selectedCategoryIds => this.setState({selectedCategoryIds})}
        handleTitleChange={this.handleTitleChange.bind(this)}
        handleBodyStateChange={this.handleBodyStateChange.bind(this)}
        handleSubmit={this.handleFormSubmit.bind(this)} />)
  }
}

render(
  <App
  />,
  document.getElementById('mount')
)
