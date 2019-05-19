import React, { Component } from "react";
import { render } from "react-dom";
import { EditorState, ContentState, convertToRaw } from "draft-js";
import ArticleForm from "./form.js";
import agent from "../../../agent";
import draftToHtml from "draftjs-to-html";
import htmlSerializer from './htmlSerializer'

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      tldr: "",
      isDraft: false,
      coverImage: "",
      // bodyState: EditorState.createEmpty(),
      bodyHtml: "",
      tags: [],
      selectedTagIds: []
    };
    this.articleId = window.location.href.split("/")[5];
  }

  componentDidMount() {
    agent.Tag.getAll().then(tags => {
      console.log("tags", tags);
      this.setState({ tags });
    });
    agent.Article.get(this.articleId)
      .then(response => {
        console.log("response", response);

        const {
          title,
          tldr,
          isDraft,
          coverImage,
          body: bodyHtml,
          tagIds: selectedTagIds
        } = response.data;
        this.setState({ title, tldr, isDraft, coverImage, bodyHtml, selectedTagIds });
      })
      .catch(error => {
        console.log(error);
      });
  }

  handleFormSubmit({ title, tldr, isDraft, coverImage, bodyState, tagIds }) {
    const body = htmlSerializer.serialize(this.formRef.editor.value)
    console.log('body', body)

    agent.Article.update(this.articleId, {
      title,
      tldr,
      coverImage,
      isDraft,
      body,
      tagIds
    })
      .then(function(response) {
        window.location.href = "/author/articles";
      })
      .catch(function(error) {
        console.log(error);
      });
  }

  render() {
    const {
      title,
      tldr,
      coverImage,
      bodyHtml,
      tags,
      isDraft,
      selectedTagIds
    } = this.state;
    return (
      <ArticleForm
        ref={ref => {this.formRef = ref}}
        tags={tags}
        selectedTagIds={selectedTagIds}
        submitButtonText="Edit"
        title={title}
        tldr={tldr}
        isDraft={isDraft}
        coverImage={coverImage}
        bodyHtml={bodyHtml}
        handleTagsChange={selectedTagIds => this.setState({ selectedTagIds })}
        handleTitleChange={title => this.setState({ title })}
        handleTldrChange={tldr => this.setState({ tldr })}
        handleIsDraftChange={isDraft => this.setState({ isDraft })}
        handleCoverImageChange={coverImage => this.setState({ coverImage })}
        handleSubmit={this.handleFormSubmit.bind(this)}
      />
    );
  }
}

render(<App />, document.getElementById("mount"));
