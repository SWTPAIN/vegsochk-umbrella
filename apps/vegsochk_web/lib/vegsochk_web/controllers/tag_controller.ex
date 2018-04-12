defmodule VegsochkWeb.TagController do
  use VegsochkWeb, :controller
  
  alias Vegsochk.{CMS, Repo}

  def show(conn, %{"id" => id} = params) do
    tag = CMS.get_tag!(%{name: id})
    IO.puts "hi"
    IO.inspect params
    articles = CMS.list_latest_articles(%{tag: tag}, params)

    render conn, "show.html", tag: tag, articles: articles
  end
end
