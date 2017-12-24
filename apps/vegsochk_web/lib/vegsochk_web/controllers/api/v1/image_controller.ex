defmodule VegsochkWeb.Api.V1.ImageController do
  use VegsochkWeb, :controller

  alias Vegsochk.CMS

  plug :authorize_image when action in [:show, :update, :delete]

  def show(conn, _params) do
    conn
    |> put_status(200)
    |> render("show.json", conn.assigns.image)
  end

  def create(conn, %{"image" => image_params}) do
    case CMS.create_image(conn.assigns.current_author, image_params) do
      {:ok, image} ->
				conn
				|> put_status(201)
				|> render("show.json", image)
      {:error, changeset} ->
        conn
        |> put_status(400)
    end
  end

  def update(conn, %{"image" => image_params}) do
    case CMS.update_image(conn.assigns.image, image_params) do
      {:ok, image} ->
				conn
				|> put_status(201)
				|> render("show.json", image)
      {:error, changeset} ->
        conn
        |> put_status(400)
    end
  end

  defp authorize_image(conn, _) do
    image = CMS.get_image!(conn.params["id"])

    if conn.assigns.current_author.id == image.author_id do
      assign(conn, :image, image)
    else
      conn
      |> put_flash(:error, "You can't modify that image")
      |> redirect(to: "/")
      |> halt()
    end
  end

end
