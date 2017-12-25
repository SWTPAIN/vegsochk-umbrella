defmodule VegsochkWeb.PageView do
  use VegsochkWeb, :view
  def render("scripts.animals.html", assigns) do
    entry_path = static_path(assigns.conn, "/js/animals.js")
    ~s{<script src=#{entry_path}></script>}
    |> raw
  end
end
