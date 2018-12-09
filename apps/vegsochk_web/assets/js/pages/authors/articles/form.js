import React, { Component } from "react";
import { Editor } from "slate-react";
import { isKeyHotkey } from 'is-hotkey'
import { Value, Block } from "slate";
import Select, { Option } from "rc-select";
import styles from "./form.css";
import htmlSerializer from './htmlSerializer'
import styled from "@emotion/styled";

const isBoldHotkey = isKeyHotkey('mod+b')
const isItalicHotkey = isKeyHotkey('mod+i')
const isUnderlinedHotkey = isKeyHotkey('mod+u')
const isCodeHotkey = isKeyHotkey('mod+`')

function insertImage(editor, src, target) {
  if (target) {
    editor.select(target)
  }

  editor.insertBlock({
    type: 'image',
    data: { src },
  })
}

export const Button = styled("span")`
  cursor: pointer;
  color: ${props =>
    props.reversed
      ? props.active
        ? "white"
        : "#aaa"
      : props.active
      ? "black"
      : "#ccc"};
`;

const Image = styled('img')`
  display: block;
  max-width: 100%;
  max-height: 20em;
  box-shadow: ${props => (props.selected ? '0 0 0 2px blue;' : 'none')};
`

export const Icon = styled(({ className, ...rest }) => {
  return <span className={`material-icons ${className}`} {...rest} />;
})`
  font-size: 18px;
  vertical-align: text-bottom;
`;

export const Menu = styled("div")`
  & > * {
    display: inline-block;
  }
  & > * + * {
    margin-left: 15px;
  }
`;

export const Toolbar = styled(Menu)`
  position: relative;
  padding: 1px 18px 17px;
  margin: 0 -20px;
  border-bottom: 2px solid #eee;
  margin-bottom: 20px;
`;

/**
 * Define Block Types
 */
const HEADING_1 = "HEADING_1";
const HEADING_2 = "HEADING_2";
const BLOCK_QUOTE = "BLOCK_QUOTE";
const NUMBERED_LIST = "NUMBERED_LIST";
const BULLETED_LIST = "BULLETED_LIST";
const LIST_ITEM = "LIST_ITEM";

const schema = {
  document: {
    last: { type: 'paragraph' },
    normalize: (editor, { code, node, child }) => {
      switch (code) {
        case 'last_child_type_invalid': {
          const paragraph = Block.create('paragraph')
          return editor.insertNodeByKey(node.key, node.nodes.size, paragraph)
        }
      }
    },
  },
  blocks: {
    image: {
      isVoid: true,
    },
  },
}

export default class ArticleForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      editorValue: htmlSerializer.deserialize(props.bodyHtml)
    };
  }

  handleEditorValueChange = ({ value: editorValue }) => {
    this.setState({ editorValue });
  };

  handleTitleInputChange(e) {
    this.props.handleTitleChange(e.target.value);
  }

  handleTldrInputChange(e) {
    this.props.handleTldrChange(e.target.value);
  }

  handleCoverImageInputChange(e) {
    this.props.handleCoverImageChange(e.target.value);
  }

  componentWillReceiveProps(nextProps) {
    // You don't have to do this check first, but it can help prevent an unneeded render
    const editorValue = htmlSerializer.deserialize(nextProps.bodyHtml);
    if (nextProps.bodyHtml !== this.props.bodyHtml) {
      this.setState({ editorValue });
    }
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

  ref = editor => {
    this.editor = editor;
  };

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
                schema={schema}
                spellCheck
                autoFocus
                placeholder="Enter some rich text..."
                ref={this.ref}
                value={this.state.editorValue}
                onChange={this.handleEditorValueChange}
                onKeyDown={this.onKeyDown}
                renderNode={this.renderNode}
                renderMark={this.renderMark}
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

  onKeyDown = (event, editor, next) => {
    let mark;

    if (isBoldHotkey(event)) {
      mark = "bold";
    } else if (isItalicHotkey(event)) {
      mark = "italic";
    } else if (isUnderlinedHotkey(event)) {
      mark = "underlined";
    } else if (isCodeHotkey(event)) {
      mark = "code";
    } else {
      return next();
    }

    event.preventDefault();
    editor.toggleMark(mark);
  };

  renderImageButton = () => {
    return (
      <Button onMouseDown={this.handleClickImage}>
        <Icon>image</Icon>
      </Button>      
    )
  }

  handleClickImage = event => {
    event.preventDefault()
    const src = window.prompt('Enter the URL of the image:')
    if (!src) return
    this.editor.command(insertImage, src)
  }  

  renderBlockButton = (type, icon) => {
    let isActive = this.hasBlock(type);

    if ([NUMBERED_LIST, BULLETED_LIST].includes(type)) {
      // const { value } = this.state;
      const value = this.state.editorValue;
      const parent = value.document.getParent(value.blocks.first().key);
      isActive = this.hasBlock(LIST_ITEM) && parent && parent.type === type;
    }

    const onMouseDown = event => this.onClickBlock(event, type);

    return (
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
    return (
      <Toolbar>
        <div>
          {this.renderMarkButton("bold", "format_bold")}
          {this.renderMarkButton("italic", "format_italic")}
          {this.renderMarkButton("underlined", "format_underlined")}
          {this.renderMarkButton("code", "code")}
          {this.renderImageButton()}
          {this.renderBlockButton("heading-one", "looks_one")}
          {this.renderBlockButton("heading-two", "looks_two")}
          {this.renderBlockButton("block-quote", "format_quote")}
          {this.renderBlockButton("numbered-list", "format_list_numbered")}
          {this.renderBlockButton("bulleted-list", "format_list_bulleted")}
          {this.renderBlockButton("bulleted-list", "format_list_bulleted")}
        </div>    
    </Toolbar>
    );
  };

  renderNode = (props, editor, next) => {
    const { attributes, children, node, isFocused } = props;

    switch (node.type) {
      case "block-quote":
        return <blockquote {...attributes}>{children}</blockquote>;
      case "bulleted-list":
        return <ul {...attributes}>{children}</ul>;
      case "heading-one":
        return <h1 {...attributes}>{children}</h1>;
      case "heading-two":
        return <h2 {...attributes}>{children}</h2>;
      case "list-item":
        return <li {...attributes}>{children}</li>;
      case "numbered-list":
        return <ol {...attributes}>{children}</ol>;
      case 'image': {
        const src = node.data.get('src')
        return <Image src={src} selected={isFocused} {...attributes} />
      }        
      default:
        return next();
    }
  };

  hasBlock = type => {
    return this.state.editorValue.blocks.some(node => node.type === type);
  };

  hasMark = type => {
    console.log("this.state.editorValue", this.state.editorValue);
    return this.state.editorValue.activeMarks.some(mark => mark.type === type);
  };

  get bodyValue() {
    return htmlSerializer.deserialize(this.props.bodyHtml);
  }

  hasLinks = () => {
    return this.state.editorValue.inlines.some(
      inline => inline.type === "link"
    );
  };

  onClickBlock = (event, type) => {
    event.preventDefault();

    const { editor } = this;
    const { value } = editor;
    const { document } = value;

    // Handle everything but list buttons.
    if (type != "bulleted-list" && type != "numbered-list") {
      const isActive = this.hasBlock(type);
      const isList = this.hasBlock("list-item");

      if (isList) {
        editor
          .setBlocks(isActive ? DEFAULT_NODE : type)
          .unwrapBlock("bulleted-list")
          .unwrapBlock("numbered-list");
      } else {
        editor.setBlocks(isActive ? DEFAULT_NODE : type);
      }
    } else {
      // Handle the extra wrapping required for list buttons.
      const isList = this.hasBlock("list-item");
      const isType = value.blocks.some(block => {
        return !!document.getClosest(block.key, parent => parent.type == type);
      });

      if (isList && isType) {
        editor
          .setBlocks(DEFAULT_NODE)
          .unwrapBlock("bulleted-list")
          .unwrapBlock("numbered-list");
      } else if (isList) {
        editor
          .unwrapBlock(
            type == "bulleted-list" ? "numbered-list" : "bulleted-list"
          )
          .wrapBlock(type);
      } else {
        editor.setBlocks("list-item").wrapBlock(type);
      }
    }
  };

  onClickMark = (event, type) => {
    event.preventDefault();
    this.editor.toggleMark(type);
  };

  renderMarkButton = (type, icon) => {
    const isActive = this.hasMark(type);
    return (
      <Button
        active={isActive}
        onMouseDown={event => this.onClickMark(event, type)}
      >
        <Icon>{icon}</Icon>
      </Button>
    );
  };

  renderMark = (props, editor, next) => {
    const { children, mark, attributes } = props;

    switch (mark.type) {
      case "bold":
        return <strong {...attributes}>{children}</strong>;
      case "code":
        return <code {...attributes}>{children}</code>;
      case "italic":
        return <em {...attributes}>{children}</em>;
      case "underlined":
        return <u {...attributes}>{children}</u>;
      default:
        return next();
    }
  };
}
