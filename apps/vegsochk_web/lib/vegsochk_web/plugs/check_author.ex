defmodule VegsochkWeb.Plugs.CheckAuthor do
  @moduledoc """
    A `Plug` to assign `:current_user` based on the session
  """

  import Plug.Conn
  import VegsochkWeb.Session
  alias Vegsochk.Account

  def init(options), do: options

  def call(conn, _opts) do
    IO.puts "aaaa"
    if conn.assigns[:current_user] do
      conn
    else
      user = get_session(conn, :current_user)
      if user && Account.is_author?(user) do
        conn
      else
        conn
        |> Phoenix.Controller.redirect(to: "/")
        |> halt()
      end

      assign(conn, :current_user, get_session(conn, :current_user))
    end
  end

end
