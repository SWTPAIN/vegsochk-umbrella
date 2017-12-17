defmodule VegsochkWeb.Plugs.CurrentUser do
  @moduledoc """
    A `Plug` to assign `:current_user` based on the session
  """

  import Plug.Conn
  import VegsochkWeb.Session
  alias Vegsochk.Account

  def init(options), do: options

  def call(conn, _opts) do
    if conn.assigns[:user] do
      conn
    else
      user = get_session(conn, :current_user)

      assign(conn, :current_user, get_session(conn, :current_user))
    end
  end

end
