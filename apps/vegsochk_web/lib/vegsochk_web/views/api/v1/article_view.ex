defmodule VegsochkWeb.Api.V1.ArticleView do
  use VegsochkWeb, :view

  alias Vegsochk.CMS.Article

  def render("show.json", %Article{id: id, title: title, body: body}) do
    %{id: id,
      title: title,
      body: body
    }
  end
end

