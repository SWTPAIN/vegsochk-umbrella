defmodule VegsochkWeb.Admin.TagController do
  use VegsochkWeb, :controller

  alias Vegsochk.CMS
  alias Vegsochk.CMS.Tag
  alias VegsochkWeb.Uploader

  plug :assign_tag when action in [:edit, :delete, :update]

  def new(conn, _params) do
    changeset = Tag.changeset(%Tag{}, %{})
    render conn, "new.html", changeset: changeset
  end

  def index(conn, _params) do
    tags = CMS.list_tags()
    render conn, "index.html", tags: tags
  end

  def create(conn, %{"tag" => %{
    "name" => name,
  }}) do
    case CMS.create_tag(%{
      name: name,
    }) do
      {:ok, tag} ->
        conn
        |> put_flash(:success, "Tag created successfully")
        |> redirect(to: admin_tag_path(conn, :index))
      {:error, changeset} ->
        render conn, "new.html", changeset: changeset
    end
  end

  def delete(conn, _params) do
    {:ok, _tag} = CMS.delete_tag(conn.assigns.tag)
    conn
    |> put_flash(:success, "Tag deleted successfully.")
    |> redirect(to: admin_tag_path(conn, :index))
  end

  def edit(conn, _params) do
    tag = conn.assigns.tag
    render conn, "edit.html", tag: tag, changeset: CMS.change_tag(tag)
  end 

  def update(conn, %{"tag" => tag_params}) do
    image_params = tag_params["image"]
    tag_params = if image_params do
      image_url = Uploader.upload_image!(image_params)
      Map.put tag_params, "image", image_url
    else
      tag_params
    end

    case CMS.update_tag(conn.assigns.tag, tag_params) do
      {:ok, tag} ->
        conn
        |> put_flash(:success, "Tag update successfully")
        |> redirect(to: admin_tag_path(conn, :index))
      {:error, changeset} ->
        render conn, "edit.html", tag: conn.assigns.tag, changeset: changeset
    end
  end

  def assign_tag(conn, _) do
    tag = conn.params["id"]
      |> String.to_integer
      |> CMS.get_tag!
    conn
    |> assign(:tag, tag)
  end

end

