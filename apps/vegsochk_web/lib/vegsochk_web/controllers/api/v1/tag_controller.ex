defmodule VegsochkWeb.Api.V1.TagController do
  use VegsochkWeb, :controller

  alias Vegsochk.CMS

  def index(conn, _params) do
    tags = CMS.list_tags()
    conn
    |> put_status(200)
    |> render("index.json", tags: tags)
  end
end
