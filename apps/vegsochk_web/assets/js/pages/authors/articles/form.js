import React, {Component} from 'react'
import { Editor } from 'react-draft-wysiwyg'
import Select, {Option} from 'rc-select'

export default class ArticleForm extends Component {
  onEditorStateChange (editorState) {
    this.props.handleBodyStateChange(editorState)
  }

  handleTitleInputChange (e) {
    this.props.handleTitleChange(e.target.value)
  }

  handleTldrInputChange (e) {
    this.props.handleTldrChange(e.target.value)
  }

  handleCoverImageInputChange (e) {
    this.props.handleCoverImageChange(e.target.value)
  }

  handleCreateButtonClick (e) {
    e.preventDefault()
    const {bodyState, title, tldr, coverImage, selectedTagIds} = this.props
    this.props.handleSubmit({
      title,
      tldr,
      coverImage,
      bodyState,
      tagIds: selectedTagIds})
  }

  render () {
    const {bodyState, title, tldr, submitButtonText, tags, selectedTagIds, coverImage} = this.props
    return (
      <div>
        <form>
          <fieldset className='uk-fieldset'>
            <legend className='uk-legend'>Title</legend>
            <div className='uk-margin'>
              <input
                onChange={this.handleTitleInputChange.bind(this)}
                value={title}
                required className='uk-input' type='text' placeholder='Input' />
            </div>
            <legend className='uk-legend'>TLDR</legend>
            <div className='uk-margin'>
              <input
                onChange={this.handleTldrInputChange.bind(this)}
                value={tldr}
                required className='uk-input' type='text' placeholder='Input' />
            </div>
            <legend className='uk-legend'>Tags</legend>
            <div className='uk-margin'>
              <Select
                value={selectedTagIds}
                animation='slide-up'
                multiple
                optionLabelProp='children'
                onChange={this.props.handleTagsChange}
              >
                {
                  tags.map(({id, color, name}) =>
                    <Option
                      key={id}
                      title={name}
                      value={id}
                    >
                      {name}
                    </Option>
                  )
                }
              </Select>
            </div>
            <legend className='uk-legend'>Cover Image</legend>
            <div className='uk-margin'>
              <div className='uk-form-controls'>
                <img src={coverImage} />
                <input
                  onChange={this.handleCoverImageInputChange.bind(this)}
                  value={coverImage}
                  required className='uk-input' type='text' placeholder='Input' />
              </div>
            </div>
            <div className='uk-margin'>
              <Editor
                toolbar={{
                  colorPicker: {
                    colors: ['#addbcb', '#b3ddce', '#00becd', '#aeb0a9', '#ffc6a2', '#535354']
                  }
                }}
                editorState={bodyState}
                wrapperClassName='demo-wrapper'
                editorClassName='demo-editor'
                onEditorStateChange={this.onEditorStateChange.bind(this)}
              />
            </div>
          </fieldset>
          <p uk-margin='true'>
            <button
              onClick={this.handleCreateButtonClick.bind(this)}
              className='uk-button uk-button-default'>{submitButtonText}</button>
          </p>
        </form>
      </div>
    )
  }
}
