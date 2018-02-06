defmodule VegsochkWeb.Author.SessionController do
  use VegsochkWeb, :controller

  alias Vegsochk.Account

  def new(conn, _params) do
    render conn, "new.html"
  end

  def create(conn, %{"user" => %{"email" => email, "password" => password}}) do
    case Account.login_author(%{email: email, password: password}) do
       {:ok, {author, session}} ->
         conn
         |> ok_login(author, session)
       {:error, :unauthorized} ->
         conn
         |> put_flash(:danger, "Bad email/password combination")
         |> redirect(to: author_session_path(conn, :new))
      end
  end

  def delete(conn, _params) do
    token = conn.assigns.current_session_token
    if token do
      Account.delete_session(token)
    end
    conn
    |> configure_session(drop: true)
    |> redirect(to: page_path(conn, :logout_success))
  end

  defp ok_login(conn, author, session) do
    conn
    |> put_flash(:success, "Successfully authenticated.")
    |> put_session(:current_user, author.user)
    |> put_session(:current_session_token, session.token)
    |> assign(:current_user, author.user)
    |> assign(:current_session_token, session.token)
    |> assign(:token, session.token)
    |> render "login_success.html"
  end

end
