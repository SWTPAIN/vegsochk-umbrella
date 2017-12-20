defmodule VegsochkWeb.Author.ArticleView do
  use VegsochkWeb, :view

  def render("scripts.new.html", _assigns) do
      ~s{<script>require("js/editor.js").bootstrap()</script>}
      |> raw
  end
end
