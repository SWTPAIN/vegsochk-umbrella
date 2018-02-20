defmodule VegsochkWeb.Admin.AuthorController do
  use VegsochkWeb, :controller

  alias Vegsochk.CMS
  alias Vegsochk.CMS.Author
  alias Vegsochk.Account
  alias VegsochkWeb.Uploader

  plug :assign_author when action in [:edit, :delete, :update]

  def new(conn, _params) do
    changeset = Author.changeset(%Author{}, %{})
    render conn, "new.html", changeset: changeset
  end

  def index(conn, _params) do
    authors = CMS.list_authors()
    render conn, "index.html", authors: authors
  end

  def create(conn, %{"author" => author_params}) do
    %{"user" => user_params, "bio" => bio} = author_params
    image_params = user_params["avatar"]
    image_url = Uploader.upload_image!(image_params)
    user_params = Map.put(user_params, "avatar", image_url)
    with {:ok, user}    <- Account.register_user(user_params),
         {:ok, _}  <- CMS.add_author(user, %{bio: bio, role: "writer"})
    do
      conn
      |> put_flash(:success, "Author created successfully")
      |> redirect(to: admin_author_path(conn, :index))
    else
      {:error, changeset} ->
        conn
        |> put_flash(:alert, "Author created fail")
        |> redirect(to: admin_author_path(conn, :new))
    end
  end

  def delete(conn, _params) do
    {:ok, _author} = CMS.delete_author(conn.assigns.author)
    conn
    |> put_flash(:success, "Author deleted successfully.")
    |> redirect(to: admin_author_path(conn, :index))
  end

  def edit(conn, _params) do
    author = conn.assigns.author
    render conn, "edit.html", changeset: CMS.change_author(author)
  end 

  def update(conn, %{"author" => author_params}) do
    %{"user" => user_params, "bio" => bio} = author_params
    avatar_params = user_params["avatar"]
    author_profile_params = if avatar_params do
      avatar_url = Uploader.upload_image!(avatar_params)
      put_in(author_params, ["user", "avatar"], avatar_url)
    else
      author_params
    end

    case CMS.update_author_profile(conn.assigns.author, author_profile_params) do
      {:ok, author} ->
        conn
        |> put_flash(:success, "Author update successfully")
        |> redirect(to: admin_author_path(conn, :index))
      {:error, changeset} ->
        IO.inspect changeset
        render conn, "edit.html", author: conn.assigns.author, changeset: changeset
    end
  end

  def assign_author(conn, _) do
    author = CMS.get_author!(%{name: conn.params["id"]})
    conn
    |> assign(:author, author)
  end

end

