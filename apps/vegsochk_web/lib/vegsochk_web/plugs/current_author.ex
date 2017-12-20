defmodule VegsochkWeb.Plugs.CurrentAuthor do
  @moduledoc """
    A `Plug` to assign `:current_user` based on the session
  """

  import Plug.Conn
  import VegsochkWeb.Session
  alias Vegsochk.CMS

  def init(options), do: options

  def call(conn, _opts) do
    user = conn.assigns[:current_user]
    if author = CMS.get_author(user) do
      conn
      |> assign(:current_author, author)
    else
      conn
      |> Phoenix.Controller.redirect(to: "/")
      |> halt()
    end
  end

end
