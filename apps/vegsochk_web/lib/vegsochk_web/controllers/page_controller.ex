defmodule VegsochkWeb.PageController do
  use VegsochkWeb, :controller
  
  alias Vegsochk.CMS

  def index(conn, _params) do
    {first_article, rest_articles} = case CMS.list_latest_articles(3) do
      [] -> {nil, []}
      [first | rest] -> {first, rest}
    end

    render conn, "index.html", first_article: first_article, rest_articles: rest_articles
  end

  def show(conn, %{"page_name" => page_name}) do
    conn
    |> Phoenix.Controller.put_layout("article.html")
    |> render("#{page_name}.html")
  end

  def logout_success(conn, _params) do
    render conn, "logout_success.html"
  end
end
