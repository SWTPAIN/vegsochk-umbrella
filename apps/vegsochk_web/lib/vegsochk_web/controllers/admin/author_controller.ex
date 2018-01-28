defmodule VegsochkWeb.Admin.AuthorController do
  use VegsochkWeb, :controller

  alias Vegsochk.CMS
  alias Vegsochk.CMS.Author
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

  def create(conn, %{"author" => %{
    "image" => image_param, 
    "name" => name,
    "description" => description,
    "address" => address,
    "territory" => territory,
    "telephone_number" => telephone_number 
  }}) do
    image_url = Uploader.upload_image!(image_param)
    case CMS.create_author(%{
      image: image_url,
      name: name,
      description: description,
      address: address,
      territory: territory,
      telephone_number: telephone_number
    }) do
      {:ok, author} ->
        conn
        |> put_flash(:success, "Author created successfully")
        |> redirect(to: admin_author_path(conn, :index))
      {:error, changeset} ->
        render conn, "new.html", changeset: changeset
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
    render conn, "edit.html", author: author, changeset: CMS.change_author(author)
  end 

  def update(conn, %{"author" => author_params}) do
    image_params = author_params["image"]
    author_params = if image_params do
      image_url = Uploader.upload_image!(image_params)
      Map.put author_params, "image", image_url
    else
      author_params
    end

    case CMS.update_author(conn.assigns.author, author_params) do
      {:ok, author} ->
        conn
        |> put_flash(:success, "Author update successfully")
        |> redirect(to: admin_author_path(conn, :index))
      {:error, changeset} ->
        render conn, "edit.html", author: conn.assigns.author, changeset: changeset
    end
  end

  def assign_author(conn, _) do
    author = conn.params["id"]
      |> String.to_integer
      |> CMS.get_author!
    conn
    |> assign(:author, author)
  end

end

