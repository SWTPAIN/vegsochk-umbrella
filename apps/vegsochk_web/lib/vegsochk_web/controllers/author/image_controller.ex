defmodule VegsochkWeb.Author.ImageController do
  use VegsochkWeb, :controller

  alias Vegsochk.CMS
	alias Vegsochk.CMS.Image
  alias VegsochkWeb.Uploader

  plug :authorize_image when action in [:edit, :delete]

  def new(conn, _params) do
		changeset = Image.changeset(%Image{})
		render conn, "new.html", changeset: changeset
  end

  def index(conn, _params) do
    images = CMS.list_images(conn.assigns.current_author)
    render conn, "index.html", images: images
  end

	def create(conn, %{"image" => %{"image" => upload_param}}) do
    image_url = Uploader.upload_image!(upload_param)
    case CMS.create_image(conn.assigns.current_author, image_url) do
			{:ok, _image} ->
					conn
					|> put_flash(:success, "Image uploaded successfully!")
					|> redirect(to: author_image_path(conn, :index))
			{:error, changeset} ->
					render conn, "new.html", changeset: changeset
    end
	end

  def delete(conn, _params) do
    {:ok, _image} = CMS.delete_image(conn.assigns.image)
    conn
    |> put_flash(:success, "Article deleted successfully.")
    |> redirect(to: author_image_path(conn, :index))
  end

  def edit(conn, _params) do
    render conn, "edit.html", image: conn.assigns.image
  end 

  defp authorize_image(conn, _) do
    image = CMS.get_image!(conn.params["id"])

    if conn.assigns.current_author.id == image.author_id do
      assign(conn, :image, image)
    else
      conn
      |> put_flash(:danger, "You can't modify that image")
      |> redirect(to: "/")
      |> halt()
    end
  end
end
