defmodule VegsochkWeb.Admin.SessionController do
  use VegsochkWeb, :controller

  alias Vegsochk.Account

  def new(conn, _params) do
    render conn, "new.html"
  end

  def create(conn, %{"user" => %{"email" => email, "password" => password}}) do
    case Account.login_user(%{email: email, password: password}) do
       {:ok, user} ->
         conn
         |> put_flash(:info, "Welcome back!")
         |> ok_login(user)
       {:error, :unauthorized} ->
         conn
         |> put_flash(:error, "Bad email/password combination")
         |> redirect(to: session_path(conn, :new))
      end
  end

  def delete(conn, _params) do
    conn
    |> configure_session(drop: true)
    |> redirect(to: page_path(conn, :index))
  end

  defp ok_login(conn, user) do
    conn
    |> put_flash(:info, "Successfully authenticated.")
    |> put_session(:current_user, user)
    |> redirect(to: "/")
  end

end
