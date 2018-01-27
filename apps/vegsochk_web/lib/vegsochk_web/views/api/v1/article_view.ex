defmodule VegsochkWeb.Api.V1.ArticleView do
  use VegsochkWeb, :view

  alias Vegsochk.CMS.Article

  def render("show.json",
             %Article{id: id, title: title, body: body, categories: categories})
  do
    %{id: id,
      title: title,
      body: body,
      category_ids: Enum.map(categories, &(&1.id))
    }
  end
end

