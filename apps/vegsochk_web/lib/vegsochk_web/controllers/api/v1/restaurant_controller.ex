defmodule VegsochkWeb.Api.V1.RestaurantController do
  use VegsochkWeb, :controller

  alias Vegsochk.CMS

  def index(conn, _params) do
    restaurants = CMS.list_restaurants()
    conn
    |> put_status(200)
    |> render("index.json", restaurants: restaurants)
  end
end
