defmodule VegsochkWeb.Author.ArticleView do
  use VegsochkWeb, :view

  def render("scripts.new.html", _assigns) do
    ~s{<script>require("js/article-new.js").bootstrap()</script>}
    |> raw
  end

  def render("scripts.edit.html", _assigns) do
    ~s{<script>require("js/article-edit.js").bootstrap()</script>}
    |> raw
  end
end
