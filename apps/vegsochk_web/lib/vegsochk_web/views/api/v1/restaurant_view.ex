defmodule VegsochkWeb.Api.V1.RestaurantView do
  use VegsochkWeb, :view

  alias Vegsochk.CMS.Article

  def render("index.json", %{restaurants: restaurants}) do
    %{
      restaurants: Enum.map(restaurants, &render_restaurant/1)
    }
  end

  defp render_restaurant(restaurant) do
    %{
      name: restaurant.name,
      address: restaurant.address,
      territory: restaurant.territory,
      telephone_number: restaurant.telephone_number,
      image: restaurant.image,
      description: restaurant.description
    }
  end
end

