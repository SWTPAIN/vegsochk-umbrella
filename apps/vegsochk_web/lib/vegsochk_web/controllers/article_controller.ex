defmodule VegsochkWeb.ArticleController do
  use VegsochkWeb, :controller
  
  alias Vegsochk.{CMS, Repo}

  plug :put_layout, "article.html"

  def show(conn, %{"id" => id}) do
    article = CMS.get_article!(id)
    related_articles = CMS.list_related_articles(article.id, 3)
    render conn, "show.html", article: article, related_articles: related_articles
  end
end
