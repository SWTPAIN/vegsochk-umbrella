defmodule VegsochkWeb.TagController do
  use VegsochkWeb, :controller
  
  alias Vegsochk.{CMS, Repo}

  #plug :put_layout, "article.html"

  def show(conn, %{"id" => id}) do
    tag = CMS.get_tag!(%{name: id})
    articles = CMS.list_latest_articles(%{tag: tag}, 10)

    render conn, "show.html", tag: tag, articles: articles
  end
end
