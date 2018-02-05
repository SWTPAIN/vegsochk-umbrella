defmodule VegsochkWeb.PageController do
  use VegsochkWeb, :controller
  
  alias Vegsochk.CMS

  def index(conn, params) do
    articles = CMS.list_latest_articles(%{page_number: 1, page_size: 6})
    news_items = CMS.list_latest_news_items(5)

    render conn, "index.html", articles: articles, news_items: news_items
  end

  def health(conn, _) do
    # TODO avoid hard card health category as id 1
    health = CMS.get_tag!(1)
    {first_article, rest_articles} = case CMS.list_latest_articles(
      %{tag: health}
    ) do
      %{total_entries: 0} -> {nil, []}
      %{entries: [first | rest]} -> {first, rest}
    end
    conn
    |> render("health.html", first_article: first_article, rest_articles: rest_articles)
  end

  # pages that need special treatment get their own matched function
  #   # all others simply render the template of the same name
  def action(conn, params) do
    case action_name(conn) do
      :index ->
        index(conn, params)
      :health ->
        health(conn, params)
      name ->
        conn
        |> Phoenix.Controller.put_layout("article.html")
        |> render(name)
    end
  end

  def logout_success(conn, _params) do
    render conn, "logout_success.html"
  end
end
