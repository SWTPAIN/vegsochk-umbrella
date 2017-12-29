import React from 'react';
import { Component } from 'react';
import { render } from 'react-dom';
import { EditorState, ContentState, convertToRaw } from 'draft-js';
import ArticleForm from './form.js';
import agent from '../../../agent';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      title: '',
      bodyState: EditorState.createEmpty(),
    };
    this.articleId = window.location.href.split("/")[5]
  }

  componentDidMount() {
    agent.Article.get(this.articleId)
      .then(response => {
        console.log('a', response.data)
        const {title, body} = response.data
        const contentBlock = htmlToDraft(body);
        const contentState = ContentState.createFromBlockArray(contentBlock.contentBlocks);
        const bodyState = EditorState.createWithContent(contentState);
        this.setState({title: title, bodyState})
      })
      .catch(error => {
          console.log(error);
      });

  }

  handleFormSubmit() {
    const {title, bodyState} = this.state;
    const body = draftToHtml(convertToRaw(bodyState.getCurrentContent()));

    agent.Article.update(this.articleId, {title, body})
      .then(function (response) {
          window.location.href = "/author/articles";
        })
      .catch(function (error) {
          console.log(error);
        });
  }

  handleTitleChange(title) {
    this.setState({title: title})
  }

  handleBodyStateChange(bodyState) {
    this.setState({bodyState})
  }

  render() {
    const {title, bodyState} = this.state;
    return (
      <ArticleForm
        submitButtonText="Edit"
        title={title}
        bodyState={bodyState}
        handleTitleChange={this.handleTitleChange.bind(this)}
        handleBodyStateChange={this.handleBodyStateChange.bind(this)}
        handleSubmit={this.handleFormSubmit.bind(this)}/>)
  }
}

render(
  <App
  />,
  document.getElementById('mount')
)

