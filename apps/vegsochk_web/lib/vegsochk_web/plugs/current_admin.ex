defmodule VegsochkWeb.Plugs.CurrentAdmin do
  @moduledoc """
    A `Plug` to assign `:current_user` based on the session
  """

  import Plug.Conn
  import VegsochkWeb.Session
  alias VegsochkWeb.Router.Helpers, as: Routes
  alias Vegsochk.Account

  def init(options), do: options

  def call(conn, _opts) do
    user = conn.assigns[:current_user]
    if user do
      conn
      |> assign(:current_admin, Account.get_admin(user))
    else
      conn
      |> Phoenix.Controller.redirect(to: Routes.admin_session_path(conn, :new))
      |> halt()
    end
  end

end
