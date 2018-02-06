defmodule VegsochkWeb.Plugs.CurrentUser do
  @moduledoc """
    A `Plug` to assign `:current_user` based on the session
  """

  import Plug.Conn
  import VegsochkWeb.Session
  alias Vegsochk.Account

  def init(options), do: options

  def call(conn, _opts) do
    if conn.assigns[:current_user] && conn.assigns[:current_session_token] do
      conn
    else
      conn
      |> assign(:current_user, get_session(conn, :current_user))
      |> assign(:current_session_token, get_session(conn, :current_session_token))
    end
  end

end
