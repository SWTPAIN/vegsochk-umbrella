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
    render conn, "show.html", article: article, related_articles: related_articles
  end
end
