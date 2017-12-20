import React from 'react';
import { Component } from 'react';
import { convertToRaw } from 'draft-js';
import { render } from 'react-dom';
import { Editor } from 'react-draft-wysiwyg';
import draftToHtml from 'draftjs-to-html';
import axios from 'axios';

export default class App extends Component {

  onEditorStateChange(editorState) {
		this.props.handleBodyStateChange(editorState)
  }

  handleTitleInputChange(e) {
		this.props.handleTitleChange(e.target.value)
  }

  handleCreateButtonClick(e) {
    e.preventDefault();
		this.props.handleSubmit()
  }

  render() {
    const {bodyState, title, submitButtonText} = this.props;
    return (
      <div>
        <form>
          <fieldset className="uk-fieldset">
            <legend className="uk-legend">Title</legend>
            <div className="uk-margin">
              <input
                onChange={this.handleTitleInputChange.bind(this)}
                value={title}
                required className="uk-input" type="text" placeholder="Input"/>
            </div>
            <div className="uk-margin">
              <Editor
                editorState={bodyState}
                wrapperClassName="demo-wrapper"
                editorClassName="demo-editor"
                onEditorStateChange={this.onEditorStateChange.bind(this)}
              />
            </div>
          </fieldset>
          <p uk-margin="true">
            <button
              onClick={this.handleCreateButtonClick.bind(this)}
              className="uk-button uk-button-default">{submitButtonText}</button>
          </p>
        </form>
      </div>
    )
  }
}

