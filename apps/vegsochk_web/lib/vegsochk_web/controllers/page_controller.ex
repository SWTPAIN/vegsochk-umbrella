defmodule VegsochkWeb.PageController do
  use VegsochkWeb, :controller
  
  alias Vegsochk.CMS

  def index(conn, _params) do
    articles = CMS.list_latest_articles()
    news_items = CMS.list_latest_news_items(5)

    render conn, "index.html", articles: articles, news_items: news_items
  end

  def show(conn, %{"page_name" => "health"}) do
    # TODO avoid hard card health category as id 1
    health = CMS.get_tag!(1)
    {first_article, rest_articles} = case CMS.list_latest_articles(%{tag: health}, 10) do
      [] -> {nil, []}
      [first | rest] -> {first, rest}
    end
    conn
    |> render("health.html", first_article: first_article, rest_articles: rest_articles)
  end

  def show(conn, %{"page_name" => page_name}) when page_name in ["about_us"] do
    conn
    |> render("#{page_name}.html")
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
