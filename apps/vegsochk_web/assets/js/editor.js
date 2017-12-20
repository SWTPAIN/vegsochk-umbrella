import React from 'react';
import { Component } from 'react';
import { EditorState, convertToRaw } from 'draft-js';
import { render } from 'react-dom';
import { Editor } from 'react-draft-wysiwyg';
import draftToHtml from 'draftjs-to-html';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      editorState: EditorState.createEmpty(),
    };
  }

  onEditorStateChange(editorState) {
    this.setState({
      editorState,
    });
  };

  handleCreateButtonClick(e) {
    console.log('e', e)
    e.preventDefault();
    console.log('aaa', draftToHtml(convertToRaw(this.state.editorState.getCurrentContent())))
  }

  render() {
    const { editorState } = this.state;
    return (
      <div>
        <form>
          <fieldset className="uk-fieldset">
            <legend className="uk-legend">Title</legend>
            <div className="uk-margin">
              <input className="uk-input" type="text" placeholder="Input"/>
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


