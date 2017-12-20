defmodule VegsochkWeb.Plugs.ApiCurrentUser do
  @moduledoc """
    A `Plug` to assign `:current_user` based on the session
  """

  import Plug.Conn
  import VegsochkWeb.Session
  alias Vegsochk.Account

  def init(options), do: options

  def call(conn, _opts) do
    case get_req_header(conn, "authorization") do
      [] -> conn
      [authorization|_] ->
        api_token =
          authorization
          |> String.replace("Bearer ", "")

        case Account.get_user_by_api_token(api_token) do
          nil ->
            IO.puts "not found"
            conn
          user ->
            IO.puts "found it"
            assign(conn, :current_user, user)
        end
    end
  end

end
