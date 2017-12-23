defmodule VegsochkWeb.Author.ArticleController do
  use VegsochkWeb, :controller

  alias Vegsochk.CMS

  plug :authorize_article when action in [:edit, :delete]

  def new(conn, _params) do
    render conn, "new.html"
  end

  def index(conn, _params) do
    articles = CMS.list_articles(conn.assigns.current_author)
    render conn, "index.html", articles: articles
  end

  def delete(conn, _params) do
    {:ok, _article} = CMS.delete_article(conn.assigns.article)
    conn
    |> put_flash(:info, "Article deleted successfully.")
    |> redirect(to: article_path(conn, :index))
  end

  def edit(conn, _params) do
    render conn, "edit.html", article: conn.assigns.article
  end 

  defp authorize_article(conn, _) do
    article = CMS.get_article!(conn.params["id"])

    if conn.assigns.current_author.id == article.author_id do
      assign(conn, :article, article)
    else
      conn
      |> put_flash(:error, "You can't modify that article")
      |> redirect(to: "/")
      |> halt()
    end
  end
end

defimpl Phoenix.Param, for: Vegsochk.CMS.Article do
  def to_param(%{slug: slug}) do
    "#{slug}"
  end
end

