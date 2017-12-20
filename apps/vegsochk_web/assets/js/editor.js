import React from 'react';
import { Component } from 'react';
import { EditorState, convertToRaw } from 'draft-js';
import { render } from 'react-dom';
import { Editor } from 'react-draft-wysiwyg';
import draftToHtml from 'draftjs-to-html';
import axios from 'axios';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      editorState: EditorState.createEmpty(),
    };
  }

  onEditorStateChange(editorState) {
    this.setState({
      editorState,
    });
  }

  handleTitleInputChange(e) {
    this.setState({title: e.target.value});
  }

  handleCreateButtonClick(e) {
    e.preventDefault();
    const {title, editorState} = this.state;
    const body = draftToHtml(convertToRaw(editorState.getCurrentContent()));
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

  render() {
    const { editorState } = this.state;
    return (
      <div>
        <form>
          <fieldset className="uk-fieldset">
            <legend className="uk-legend">Title</legend>
            <div className="uk-margin">
              <input
                onChange={this.handleTitleInputChange.bind(this)}
                value={this.state.title}
                required className="uk-input" type="text" placeholder="Input"/>
            </div>
            <div className="uk-margin">
              <Editor
                editorState={editorState}
                wrapperClassName="demo-wrapper"
                editorClassName="demo-editor"
                onEditorStateChange={this.onEditorStateChange.bind(this)}
              />
            </div>
          </fieldset>
          <p uk-margin="true">
            <button
              onClick={this.handleCreateButtonClick.bind(this)}
              className="uk-button uk-button-default">Create</button>
            <button className="uk-button uk-button-default" disabled>Disabled</button>
          </p>
        </form>
      </div>
    )
  }
}

export const bootstrap = () => {
  render(
    <App
    />,
    document.getElementById('editable')
  )
}


