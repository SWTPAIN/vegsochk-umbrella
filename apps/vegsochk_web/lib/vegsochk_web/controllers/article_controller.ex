defmodule VegsochkWeb.ArticleController do
  use VegsochkWeb, :controller
  
  alias Vegsochk.{CMS, Repo}

  plug :put_layout, "article.html"

  def index(conn, params) do
    articles = CMS.list_latest_articles(params)
    render conn, "index.html", articles: articles
  end

  def show(conn, %{"id" => id}) do
    article = CMS.get_article!(id)
    related_articles = CMS.list_related_articles(article.id, 3)
    og_tags = %{
      "og:type": "article",
      "og:site_name": "Hong Kong Vegeterian Society",
      "og:image": article.cover_image,
      "og:title": article.title,
      "og:description": article.tldr,
    }
    render(conn, "show.html",
      article: article,
      related_articles: related_articles,
      og_tags: og_tags
    )
  end
end
