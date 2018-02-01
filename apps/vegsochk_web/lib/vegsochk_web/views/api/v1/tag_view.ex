defmodule VegsochkWeb.Api.V1.TagView do
  use VegsochkWeb, :view

  alias Vegsochk.CMS.Article

  def render("index.json", %{tags: tags}) do
    %{
      tags: Enum.map(tags, &render_tag/1)
    }
  end

  defp render_tag(tag) do
    %{
      id: tag.id,
      name: tag.name,
    }
  end
end

