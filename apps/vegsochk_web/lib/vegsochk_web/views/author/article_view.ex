defmodule VegsochkWeb.Author.ArticleView do
  use VegsochkWeb, :view

  def render("scripts.new.html", assigns) do
    entry_path = static_path(assigns.conn, "/js/pages/authors-articles-new.js")
    ~s{<script src=#{entry_path}></script>}
    |> raw
  end

  def render("scripts.edit.html", assigns) do
    entry_path = static_path(assigns.conn, "/js/pages/authors-articles-edit.js")
    ~s{<script src=#{entry_path}></script>}
    |> raw
  end

end
