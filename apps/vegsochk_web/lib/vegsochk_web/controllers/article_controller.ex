defmodule VegsochkWeb.ArticleController do
  use VegsochkWeb, :controller
  
  alias Vegsochk.{CMS, Repo}

  plug :put_layout, "article.html"

  def show(conn, %{"id" => id}) do
    article = CMS.get_article!(id)
              |> Repo.preload(:author)

    render conn, "show.html", article: article
  end
end
