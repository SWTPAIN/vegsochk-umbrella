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

  handleCreateButtonClick (e) {
    e.preventDefault()
    const {bodyState, title, selectedCategoryIds} = this.props
    this.props.handleSubmit(title, bodyState, selectedCategoryIds)
  }

  render () {
    const {bodyState, title, submitButtonText, categories, selectedCategoryIds} = this.props
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
            <legend className='uk-legend'>Categories</legend>
            <div className='uk-margin'>
              <Select
                value={selectedCategoryIds}
                animation='slide-up'
                multiple
                optionLabelProp='children'
                onChange={this.props.handleCategoriesChange}
               >
                {
                  categories.map(({id, color, name}) =>
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
            <div className='uk-margin'>
              <Editor
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
