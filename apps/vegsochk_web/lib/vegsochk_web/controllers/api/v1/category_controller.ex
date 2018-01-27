defmodule VegsochkWeb.Api.V1.CategoryController do
  use VegsochkWeb, :controller

  alias Vegsochk.CMS

  def index(conn, _params) do
    categories = CMS.list_categories()
    conn
    |> put_status(200)
    |> render("index.json", categories: categories)
  end
end
