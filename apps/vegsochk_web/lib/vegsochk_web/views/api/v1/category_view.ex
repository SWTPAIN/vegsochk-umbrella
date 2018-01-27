defmodule VegsochkWeb.Api.V1.CategoryView do
  use VegsochkWeb, :view

  alias Vegsochk.CMS.Article

  def render("index.json", %{categories: categories}) do
    %{
      categories: Enum.map(categories, &render_category/1)
    }
  end

  defp render_category(category) do
    %{
      id: category.id,
      name: category.name,
      color: category.color
    }
  end
end

