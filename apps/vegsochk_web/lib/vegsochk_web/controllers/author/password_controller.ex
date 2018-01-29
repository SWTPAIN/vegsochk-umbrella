defmodule VegsochkWeb.Author.PasswordController do
  use VegsochkWeb, :controller
  
  alias Vegsochk.{Account, Repo}
  alias VegsochkWeb.Uploader

  def edit(conn, _params) do
    render conn, "edit.html"
  end

  def update(conn, %{"password" => %{
    "password_confirmation" => password_confirmation,
    "password" => new_password,
    "existing_password" => existing_password
  }}) do
    if password_confirmation != new_password do
        conn
        |> put_flash(:danger, "confirm password is different than new password")
        |> render "edit.html", changeset: conn.assigns.current_user
    else
      case Account.update_user_password(conn.assigns.current_user, existing_password, new_password) do
        {:ok, user} ->
          conn
          |> put_session(:current_user, user)
          |> put_flash(:success, "Update password successfully")
          |> redirect(to:  author_page_path(conn, :index))
        {:error, :incorrect_password} ->
           conn
          |> put_flash(:danger, "Incorrect existing password")
          |> render "edit.html", changeset: conn.assigns.current_user
        {:error, changeset} ->
          render conn, "edit.html", changeset: changeset 
      end
    end
  end
end
