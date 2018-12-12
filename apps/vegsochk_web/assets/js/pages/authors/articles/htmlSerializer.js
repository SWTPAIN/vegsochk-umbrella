import React from "react";
import Html from "slate-html-serializer";
import * as R from "ramda";

const camelCased = str => str.replace(/-([a-z])/g, g => g[1].toUpperCase());

const styleStringToObject = R.compose(
  R.reduce(
    (acc, [key, value]) => R.assoc(camelCased(R.trim(key)), R.trim(value), acc),
    {}
  ),
  R.filter(
    R.compose(
      R.equals(2),
      R.length
    )
  ),
  R.map(R.split(":")),
  R.filter(R.identity),
  R.split(";")
);

const RULES = [
  {
    deserialize(el, next) {
      const block = BLOCK_TAGS[el.tagName.toLowerCase()];

      if (block) {
        const style = styleStringToObject(el.getAttribute("style") || "");
        return {
          object: "block",
          type: block,
          nodes: next(el.childNodes),
          data: {
            style
          }
        };
      }
    },
    serialize: function(object, children) {
      if (object.object != "block") {
        return;
      }
      const style = object.data.get("style");
      switch (object.type) {
        case "numbered-list":
          return <ol>{children}</ol>;
        case "bulleted-list":
          return <ul>{children}</ul>;
        case "list-item":
          return <li>{children}</li>;
        case "paragraph":
          return <p style={style}>{children}</p>;
        case "heading-one":
          return <h1 style={style}>{children}</h1>;
        case "heading-two":
          return <h2 style={style}>{children}</h2>;
        case "heading-three":
          return <h3 style={style}>{children}</h3>;
        case "heading-four":
          return <h4 style={style}>{children}</h4>;
        case "heading-five":
          return <h5 style={style}>{children}</h5>;
        case "heading-six":
          return <h6 style={style}>{children}</h6>;
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
      const href = object.data.get("href");
      if (href) {
        return (
          <a href={href}>
            <img src={object.data.get("src")} />
          </a>
        );
      }
      return <img src={object.data.get("src")} />;
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
    },
    serialize: function(object, children) {
      if (object.type != "link") {
        return;
      }
      return (
        <a target="_blank" href={object.data.get("href")}>
          {children}
        </a>
      );
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
