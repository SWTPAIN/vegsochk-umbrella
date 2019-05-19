import React, { Component } from "react";
import { Editor, getEventTransfer } from "slate-react";
import { isKeyHotkey } from "is-hotkey";
import { Value, Block, Data } from "slate";
import Select, { Option } from "rc-select";
import styles from "./form.css";
import htmlSerializer from "./htmlSerializer";
import styled from "@emotion/styled";
import { ChromePicker } from "react-color";

const isBoldHotkey = isKeyHotkey("mod+b");
const isItalicHotkey = isKeyHotkey("mod+i");
const isUnderlinedHotkey = isKeyHotkey("mod+u");
const isCodeHotkey = isKeyHotkey("mod+`");

function insertImage(editor, { src, href }, target) {
  if (target) {
    editor.select(target);
  }

  editor.insertBlock({
    type: "image",
    data: { src, href }
  });
}

function wrapLink(editor, href) {
  editor.wrapInline({
    type: "link",
    data: { href }
  });

  editor.moveToEnd();
}

function unwrapLink(editor) {
  editor.unwrapInline("link");
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

const Image = styled("img")`
  display: block;
  max-width: 100%;
  max-height: 20em;
  box-shadow: ${props => (props.selected ? "0 0 0 2px blue;" : "none")};
`;

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
    last: { type: "paragraph" },
    normalize: (editor, { code, node, child }) => {
      switch (code) {
        case "last_child_type_invalid": {
          const paragraph = Block.create("paragraph");
          return editor.insertNodeByKey(node.key, node.nodes.size, paragraph);
        }
      }
    }
  },
  blocks: {
    image: {
      isVoid: true
    }
  }
};

export default class ArticleForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      editorValue: htmlSerializer.deserialize(props.bodyHtml),
      isColorPickerShown: false,
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
            <legend className="uk-legend">文章簡述</legend>
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
                onPaste={this.handlePaste}
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
    );
  };

  renderLinkButton = () => {
    return (
      <Button active={this.hasLinks()} onMouseDown={this.handleClickLink}>
        <Icon>link</Icon>
      </Button>
    );
  };

  handlePaste = (event, editor, next) => {
    const transfer = getEventTransfer(event);
    if (transfer.type != "html") return next();
    const { document } = htmlSerializer.deserialize(transfer.html);
    editor.insertFragment(document);
  };

  handleClickLink = event => {
    event.preventDefault();

    const { editor } = this;
    const { value } = editor;
    const hasLinks = this.hasLinks();

    if (hasLinks) {
      editor.command(unwrapLink);
    } else if (value.selection.isExpanded) {
      const href = window.prompt("Enter the URL of the link:");

      if (href === null) {
        return;
      }

      editor.command(wrapLink, href);
    } else {
      const href = window.prompt("Enter the URL of the link:");

      if (href === null) {
        return;
      }

      const text = window.prompt("Enter the text for the link:");

      if (text === null) {
        return;
      }

      editor
        .insertText(text)
        .moveFocusBackward(text.length)
        .command(wrapLink, href);
    }
  };

  handleClickImage = event => {
    event.preventDefault();
    const src = window.prompt("Enter the URL of the image:");
    if (!src) return;

    const href = window.prompt("Enter the URL of the link if any:");
    // const ahref = window.prompt('Enter the External Link when the image click if any')
    this.editor.command(insertImage, { src, href });
  };

  handleClickStyle = (event, style) => {
    // if (event) {
    //   event.preventDefault();
    // }
    // const firstBlockType = state.blocks.first().type;
    this.setState({
      colorPickerColor: style.color
    }, () => {
      this.editor.setBlocks({
        data: Data.create({ style })
      });
    })

  };

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

  renderStyleButton = (style, icon) => {
    let isActive = false;
    const { blocks, document } = this.state.editorValue;
    const isType = blocks.some(block => {
      return !!document.getClosest(block.key, parent => parent.style === style);
    });
    if (isType) {
      isActive = true;
    }
    const onMouseDown = e => this.handleClickStyle(e, style);
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

  renderColorButton = () => {
    return (
      <span style={{ position: "relative" }}>
        <span
          onClick={() => this.setState({
            isColorPickerShown: !this.state.isColorPickerShown
          })}
          className={styles.button}>
          <span className={`${styles.materialIcons} material-icons`}>
            color_lens
          </span>
        </span>
        {
          this.state.isColorPickerShown &&
          <span style={{ position: "absolute", top: 30, left: -5 }}>
            <ChromePicker
              color={this.state.colorPickerColor}
              onChangeComplete={color =>
                this.handleClickStyle(null, { color: color.hex })
              }
            />
          </span>
        }
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
          {this.renderLinkButton()}
          {this.renderBlockButton("heading-one", "looks_one")}
          {this.renderBlockButton("heading-two", "looks_two")}
          {this.renderBlockButton("block-quote", "format_quote")}
          {this.renderBlockButton("numbered-list", "format_list_numbered")}
          {this.renderBlockButton("bulleted-list", "format_list_bulleted")}
          {this.renderBlockButton("bulleted-list", "format_list_bulleted")}
          {this.renderStyleButton({ textAlign: "left" }, "format_align_left")}
          {this.renderStyleButton(
            { textAlign: "center" },
            "format_align_center"
          )}
          {this.renderStyleButton({ textAlign: "right" }, "format_align_right")}
          {this.renderColorButton()}
        </div>
      </Toolbar>
    );
  };

  renderNode = (props, editor, next) => {
    const { attributes, children, node, isFocused } = props;
    console.log("props.data", props.data);

    // const style = props.node.data.get("style") || {}
    const style = props.node.data.get("style") || {};
    switch (node.type) {
      case "quote":
        return <blockquote {...attributes}>{children}</blockquote>;
      case "code":
        return (
          <pre>
            <code {...attributes}>{children}</code>
          </pre>
        );
      case "bulleted-list":
        return (
          <ul style={style} {...attributes}>
            {children}
          </ul>
        );
      case "paragraph":
        return <p style={style}>{children}</p>;
      case "heading-one":
        return (
          <h1 style={style} {...attributes}>
            {children}
          </h1>
        );
      case "heading-two":
        return (
          <h2 style={style} {...attributes}>
            {children}
          </h2>
        );
      case "heading-three":
        return (
          <h3 style={style} {...attributes}>
            {children}
          </h3>
        );
      case "heading-four":
        return (
          <h4 style={style} {...attributes}>
            {children}
          </h4>
        );
      case "heading-five":
        return (
          <h5 style={style} {...attributes}>
            {children}
          </h5>
        );
      case "heading-six":
        return (
          <h6 style={style} {...attributes}>
            {children}
          </h6>
        );
      case "list-item":
        return (
          <li style={style} {...attributes}>
            {children}
          </li>
        );
      case "numbered-list":
        return (
          <ol style={style} {...attributes}>
            {children}
          </ol>
        );
      case "image": {
        const src = node.data.get("src");
        return <Image src={src} selected={isFocused} {...attributes} />;
      }
      case "link": {
        const { data } = node;
        const href = data.get("href");
        return (
          <a {...attributes} href={href}>
            {children}
          </a>
        );
      }
      default:
        return next();
    }
  };

  hasBlock = type => {
    return this.state.editorValue.blocks.some(node => node.type === type);
  };

  hasLinks = () => {
    const { value } = this.state;
    return value.inlines.some(inline => inline.type == "link");
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
