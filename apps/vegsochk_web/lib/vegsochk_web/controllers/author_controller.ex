defmodule VegsochkWeb.AuthorController do
  use VegsochkWeb, :controller
  
  alias Vegsochk.{CMS, Repo}

  def show(conn, %{"id" => id} = params) do
    author = CMS.get_author!(%{name: id})
    articles = CMS.list_latest_articles(%{author: author}, params)

    render conn, "show.html", author: author, articles: articles
  end
end
