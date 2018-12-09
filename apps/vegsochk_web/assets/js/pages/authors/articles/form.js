import React, { Component } from "react";
//import { Editor } from 'react-draft-wysiwyg'
import { Editor } from "slate-react";
import { Value } from "slate";
import Select, { Option } from "rc-select";
import styles from "./form.css";
import Html from "slate-html-serializer";

const htmlSerializer = new Html();

/**
 * Define Block Types
 */
const HEADING_1 = "HEADING_1";
const HEADING_2 = "HEADING_2";
const BLOCK_QUOTE = "BLOCK_QUOTE";
const NUMBERED_LIST = "NUMBERED_LIST";
const BULLETED_LIST = "BULLETED_LIST";
const LIST_ITEM = "LIST_ITEM";

export default class ArticleForm extends Component {
  onEditorStateChange(editorState) {
    this.props.handleBodyStateChange(editorState);
  }

  handleTitleInputChange(e) {
    this.props.handleTitleChange(e.target.value);
  }

  handleTldrInputChange(e) {
    this.props.handleTldrChange(e.target.value);
  }

  handleCoverImageInputChange(e) {
    this.props.handleCoverImageChange(e.target.value);
  }

  handleCreateButtonClick(e) {
    e.preventDefault();
    const { bodyState, title, tldr, coverImage, selectedTagIds } = this.props;
    this.props.handleSubmit({
      title,
      tldr,
      coverImage,
      bodyState,
      tagIds: selectedTagIds
    });
  }

  render() {
    const {
      bodyHtml,
      title,
      tldr,
      submitButtonText,
      tags,
      selectedTagIds,
      coverImage
    } = this.props;
    const value = htmlSerializer.deserialize(bodyHtml);
    return (
      <div>
        <form>
          <fieldset className="uk-fieldset">
            <legend className="uk-legend">Title</legend>
            <div className="uk-margin">
              <input
                onChange={this.handleTitleInputChange.bind(this)}
                value={title}
                required
                className="uk-input"
                type="text"
                placeholder="Input"
              />
            </div>
            <legend className="uk-legend">TLDR</legend>
            <div className="uk-margin">
              <input
                onChange={this.handleTldrInputChange.bind(this)}
                value={tldr}
                required
                className="uk-input"
                type="text"
                placeholder="Input"
              />
            </div>
            <legend className="uk-legend">Tags</legend>
            <div className="uk-margin">
              <Select
                value={selectedTagIds}
                animation="slide-up"
                multiple
                optionLabelProp="children"
                onChange={this.props.handleTagsChange}
              >
                {tags.map(({ id, color, name }) => (
                  <Option key={id} title={name} value={id}>
                    {name}
                  </Option>
                ))}
              </Select>
            </div>
            <legend className="uk-legend">Cover Image</legend>
            <div className="uk-margin">
              <div className="uk-form-controls">
                <img src={coverImage} />
                <input
                  onChange={this.handleCoverImageInputChange.bind(this)}
                  value={coverImage}
                  required
                  className="uk-input"
                  type="text"
                  placeholder="Input"
                />
              </div>
            </div>
            <div className="uk-margin">
              {this.renderToolbar()}
              <Editor
                value={value}
                toolbar={{
                  colorPicker: {
                    colors: [
                      "#addbcb",
                      "#b3ddce",
                      "#00becd",
                      "#aeb0a9",
                      "#ffc6a2",
                      "#535354"
                    ]
                  },
                  history: { inDropdown: false }
                }}
                // editorState={bodyState}
                wrapperClassName="article-wrapper"
                editorClassName="article-form-container"
                onEditorStateChange={this.onEditorStateChange.bind(this)}
              />
            </div>
          </fieldset>
          <p uk-margin="true">
            <button
              onClick={this.handleCreateButtonClick.bind(this)}
              className="uk-button uk-button-default"
            >
              {submitButtonText}
            </button>
          </p>
        </form>
      </div>
    );
  }

  renderBlockButton = (type, icon) => {
    let isActive = this.hasBlock(type);

    if ([NUMBERED_LIST, BULLETED_LIST].includes(type)) {
      // const { value } = this.state;
      const value = this.bodyValue
      const parent = value.document.getParent(value.blocks.first().key);
      isActive = this.hasBlock(LIST_ITEM) && parent && parent.type === type;
    }

    const onMouseDown = event => this.onClickBlock(event, type);

    return (
      // eslint-disable-next-line react/jsx-no-bind
      <span
        className={styles.button}
        onMouseDown={onMouseDown}
        data-active={isActive}
      >
        <span className={`${styles.materialIcons} material-icons`}>{icon}</span>
      </span>
    );
  };

  renderToolbar = () => {
    return <div>{this.renderMarkButtons()}</div>;
  };

  renderMarkButtons = () => (
    <div>
      {this.renderMarkButton("bold", "format_bold")}
      {this.renderMarkButton("italic", "format_italic")}
      {this.renderMarkButton("underlined", "format_underlined")}
      {this.renderMarkButton("code", "code")}
      <span
        className={styles.button}
        onMouseDown={this.onClickLink}
        data-active={this.hasLinks()}
      >
        <span className={`${styles.materialIcons} material-icons`}>link</span>
      </span>
      {this.renderBlockButton(HEADING_1, "looks_one")}
      {this.renderBlockButton(HEADING_2, "looks_two")}
      {this.renderBlockButton(BLOCK_QUOTE, "format_quote")}
      {this.renderBlockButton(NUMBERED_LIST, "format_list_numbered")}
      {this.renderBlockButton(BULLETED_LIST, "format_list_bulleted")}
    </div>
  );

  hasBlock = (type) => {
    return this.bodyValue.blocks.some(node => node.type === type)
}

  hasMark = type => {
    const value = htmlSerializer.deserialize(this.props.bodyHtml);
    return value.activeMarks.some(mark => mark.type === type);
  };

  get bodyValue() {
    return htmlSerializer.deserialize(this.props.bodyHtml);
  }

  hasLinks = () => {
    // const { value } = this.state
    const value = htmlSerializer.deserialize(this.props.bodyHtml);
    return value.inlines.some(inline => inline.type === "link");
  };

  renderMarkButton = (type, icon) => {
    const isActive = this.hasMark(type);
    const onMouseDown = event => this.onClickMark(event, type);

    return (
      // eslint-disable-next-line react/jsx-no-bind
      <span
        className={styles.button}
        onMouseDown={onMouseDown}
        data-active={isActive}
      >
        <span className={`${styles.materialIcons} material-icons`}>{icon}</span>
      </span>
    );
  };
}
