import React from 'react';
import { Component } from 'react';
import { render } from 'react-dom';
import axios from 'axios';
import { EditorState, ContentState, convertToRaw } from 'draft-js';
import ArticleForm from './form.js';
import draftToHtml from 'draftjs-to-html';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      title: '',
      bodyState: EditorState.createEmpty(),
    };
  }


  handleFormSubmit() {
    const {title, bodyState} = this.state;
    const body = draftToHtml(convertToRaw(bodyState.getCurrentContent()));

    axios({
      method: 'post',
      url: '/api/v1/articles',
      headers: {Authorization: `Bearer ${window.localStorage["api_token"]}`},
      data: {
        article: {
          title: title, 
          body: body
        }
      }
    })
    .then(function (response) {
        window.location.href = "/authors/articles";
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
        submitButtonText="Create"
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


