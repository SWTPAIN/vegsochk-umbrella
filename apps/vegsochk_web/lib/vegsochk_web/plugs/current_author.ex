defmodule VegsochkWeb.Plugs.CurrentAuthor do
  @moduledoc """
    A `Plug` to assign `:current_user` based on the session
  """

  import Plug.Conn
  import VegsochkWeb.Session
  alias VegsochkWeb.Router.Helpers, as: Routes
  alias Vegsochk.CMS

  def init(options), do: options

  def call(conn, _opts) do
    user = conn.assigns[:current_user]
    author = user && CMS.get_author(user)
    if author do
      conn
      |> assign(:current_author, author)
    else
      conn
      |> Phoenix.Controller.redirect(to: Routes.author_session_path(conn, :new))
      |> halt()
    end
  end

end
