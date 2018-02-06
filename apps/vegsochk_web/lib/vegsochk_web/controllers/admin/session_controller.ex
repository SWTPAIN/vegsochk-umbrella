defmodule VegsochkWeb.Admin.SessionController do
  use VegsochkWeb, :controller

  alias Vegsochk.Account

  def new(conn, _params) do
    render conn, "new.html"
  end

  def create(conn, %{"admin" => %{"email" => email, "password" => password}}) do
    case Account.login_admin(%{email: email, password: password}) do
       {:ok, {admin, session}} ->
         conn
         |> ok_login(admin, session)
       {:error, :unauthorized} ->
         conn
         |> put_flash(:danger, "Bad email/password combination")
         |> redirect(to: admin_session_path(conn, :new))
      end
  end

  def delete(conn, _params) do
    Account.delete_session(conn.assigns.current_session_token)
    conn
    |> configure_session(drop: true)
    |> redirect(to: page_path(conn, :logout_success))
  end

  defp ok_login(conn, admin, session) do
    conn
    |> put_flash(:success, "Successfully authenticated.")
    |> put_session(:current_user, admin.user)
    |> assign(:current_admin, admin.user)
    |> assign(:current_session_token, session.token)
    |> assign(:token, session.token)
    |> render("login_success.html")
  end

end
