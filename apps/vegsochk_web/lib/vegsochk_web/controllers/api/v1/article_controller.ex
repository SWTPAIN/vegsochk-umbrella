defmodule VegsochkWeb.Api.V1.ArticleController do
  use VegsochkWeb, :controller

  alias Vegsochk.CMS

  plug :authorize_article when action in [:show, :update, :delete]

  def show(conn, _params) do
    conn
    |> put_status(200)
    |> render("show.json", conn.assigns.article)
  end

  def create(conn, %{"article" => article_params}) do
    case CMS.create_article(conn.assigns.current_author, article_params) do
      {:ok, article} ->
				conn
				|> put_status(201)
				|> render("show.json", article)
      {:error, changeset} ->
        conn
        |> put_status(400)
    end
  end

  def update(conn, %{"article" => article_params}) do
    case CMS.update_article(conn.assigns.article, article_params) do
      {:ok, article} ->
				conn
				|> put_status(201)
				|> render("show.json", article)
      {:error, changeset} ->
        conn
        |> put_status(400)
    end
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
