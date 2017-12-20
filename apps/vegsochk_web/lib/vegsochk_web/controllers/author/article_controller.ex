defmodule VegsochkWeb.Author.ArticleController do
  use VegsochkWeb, :controller

  alias Vegscohk.CMS

  plug :require_existing_author
  plug :authorize_page when action in [:edit, :update, :delete]

  def new(conn, _params) do
    render conn, "new.html"
  end

  def index(conn, _params) do
    articles = CMS.list_articles(conn.assigns.current_author)
    render conn, "index.html", articles: articles
  end

  def create(conn, %{"page" => page_params}) do
    case CMS.create_page(conn.assigns.current_author, page_params) do
      {:ok, article} ->
        conn
        |> put_flash(:info, "Article created successfully")
        |> redirect(to: "/")
    end
  end

  defp require_existing_author(conn, _) do
    author = CMS.ensure_author_exists(conn.assigns.current_user)
    assign(conn, :current_author, author)
  end

  defp authorize_page(conn, _) do
    page = CMS.get_page!(conn.params["id"])

    if conn.assigns.current_author.id == page.author_id do
      assign(conn, :page, page)
    else
      conn
      |> put_flash(:error, "You can't modify that page")
      |> redirect(to: "/")
      |> halt()
    end
  end
end
