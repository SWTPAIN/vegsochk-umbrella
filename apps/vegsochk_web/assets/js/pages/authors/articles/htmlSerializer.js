import React from 'react';
import Html from "slate-html-serializer";

const RULES = [
  {
    deserialize(el, next) {
      const block = BLOCK_TAGS[el.tagName.toLowerCase()];

      if (block) {
        return {
          object: "block",
          type: block,
          nodes: next(el.childNodes)
        };
      }
    },
    serialize: function(object, children) {
      if (object.object != "block") {
        return;
      }
      console.log(object);
      switch (object.type) {
        case "numbered-list":
          return <ol>{children}</ol>;
        case "bulleted-list":
          return <ul>{children}</ul>;
        case "list-item":
          return <li>{children}</li>;
        case "paragraph":
          return <p>{children}</p>;
        case "heading-three":
          return <h3>{children}</h3>;
        case "link":
          return <a>{children}</a>;
      }
    }
  },
  {
    deserialize(el, next) {
      const mark = MARK_TAGS[el.tagName.toLowerCase()];

      if (mark) {
        return {
          object: "mark",
          type: mark,
          nodes: next(el.childNodes)
        };
      }
    },
    serialize: function(object, children) {
      if (object.object != "mark") {
        return;
      }
      switch (object.type) {
        case "bold":
          return <strong>{children}</strong>;
        case "italic":
          return <em>{children}</em>;
        case "underline":
          return <u>{children}</u>;
      }
    }
  },
  {
    // Special case for code blocks, which need to grab the nested childNodes.
    deserialize(el, next) {
      if (el.tagName.toLowerCase() == "pre") {
        const code = el.childNodes[0];
        const childNodes =
          code && code.tagName.toLowerCase() == "code"
            ? code.childNodes
            : el.childNodes;

        return {
          object: "block",
          type: "code",
          nodes: next(childNodes)
        };
      }
    }
  },
  {
    // Special case for images, to grab their src.
    deserialize(el, next) {
      if (el.tagName.toLowerCase() == "img") {
        return {
          object: "block",
          type: "image",
          nodes: next(el.childNodes),
          data: {
            src: el.getAttribute("src")
          }
        };
      }
    },
    serialize: function(object, children) {
      if (object.type != "image") {
        return;
      }      
      return <img src={object.data.get('src')}/>;
    }    
  },
  {
    // Special case for links, to grab their href.
    deserialize(el, next) {
      if (el.tagName.toLowerCase() == "a") {
        return {
          object: "inline",
          type: "link",
          nodes: next(el.childNodes),
          data: {
            href: el.getAttribute("href")
          }
        };
      }
    }
  }
];

const BLOCK_TAGS = {
  p: "paragraph",
  li: "list-item",
  ul: "bulleted-list",
  ol: "numbered-list",
  blockquote: "quote",
  pre: "code",
  h1: "heading-one",
  h2: "heading-two",
  h3: "heading-three",
  h4: "heading-four",
  h5: "heading-five",
  h6: "heading-six"
};

const MARK_TAGS = {
  strong: "bold",
  em: "italic",
  u: "underline",
  s: "strikethrough",
  code: "code"
};

const serializer = new Html({ rules: RULES });

export default serializer;
