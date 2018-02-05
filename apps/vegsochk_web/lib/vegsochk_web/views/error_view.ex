defmodule VegsochkWeb.ErrorView do
  use VegsochkWeb, :view

  def render("404.html", _assigns) do
    render("404.html", layout: {VegsochkWeb.LayoutView, "article.html"})
  end

  def render("500.html", _assigns) do
    render("500.html", layout: {VegsochkWeb.LayoutView, "article.html"})
  end

  # In case no render clause matches or no
  # template is found, let's render it as 500
  def template_not_found(_template, _assigns) do
    render("500.html", layout: {VegsochkWeb.LayoutView, "article.html"})
  end
end
