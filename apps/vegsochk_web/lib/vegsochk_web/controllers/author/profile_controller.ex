defmodule VegsochkWeb.Author.ProfileController do
  use VegsochkWeb, :controller
  
  alias Vegsochk.{CMS, Account, Repo}
  alias VegsochkWeb.Uploader

  def edit(conn, _params) do
    author_changeset = CMS.change_author(conn.assigns.current_author)
    render conn, "edit.html", changeset: author_changeset 
  end

  def update(conn, %{"author" => author_params}) do
    avatar_params = author_params["user"]["avatar"]
    author_profile_params = if avatar_params do
      avatar_url = Uploader.upload_image!(avatar_params)
      %{bio: author_params["bio"], avatar: avatar_url}
    else
      %{bio: author_params["bio"]}
    end
    case CMS.update_author_profile(conn.assigns.current_author, author_profile_params) do
      {:ok, _} ->
        conn
        |> put_flash(:success, "Update profile successfully")
        |> redirect(to:  author_page_path(conn, :index))
      {:error, changeset} ->
        IO.inspect changeset
        render conn, "edit.html", changeset: changeset
    end
  end
end
