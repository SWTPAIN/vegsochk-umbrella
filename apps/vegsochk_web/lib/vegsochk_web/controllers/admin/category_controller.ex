defmodule VegsochkWeb.Admin.CategoryController do
  use VegsochkWeb, :controller

  alias Vegsochk.CMS
  alias Vegsochk.CMS.Category
  alias VegsochkWeb.Uploader

  plug :assign_category when action in [:edit, :delete, :update]

  def new(conn, _params) do
    changeset = Category.changeset(%Category{}, %{})
    render conn, "new.html", changeset: changeset
  end

  def index(conn, _params) do
    categories = CMS.list_categories()
    render conn, "index.html", categories: categories
  end

  def create(conn, %{"category" => %{
    "name" => name,
    "color" => color
  }}) do
    case CMS.create_category(%{
      name: name,
      color: color
    }) do
      {:ok, category} ->
        conn
        |> put_flash(:success, "Category created successfully")
        |> redirect(to: admin_category_path(conn, :index))
      {:error, changeset} ->
        render conn, "new.html", changeset: changeset
    end
  end

  def delete(conn, _params) do
    {:ok, _category} = CMS.delete_category(conn.assigns.category)
    conn
    |> put_flash(:success, "Category deleted successfully.")
    |> redirect(to: admin_category_path(conn, :index))
  end

  def edit(conn, _params) do
    category = conn.assigns.category
    render conn, "edit.html", category: category, changeset: CMS.change_category(category)
  end 

  def update(conn, %{"category" => category_params}) do
    image_params = category_params["image"]
    category_params = if image_params do
      image_url = Uploader.upload_image!(image_params)
      Map.put category_params, "image", image_url
    else
      category_params
    end

    case CMS.update_category(conn.assigns.category, category_params) do
      {:ok, category} ->
        conn
        |> put_flash(:success, "Category update successfully")
        |> redirect(to: admin_category_path(conn, :index))
      {:error, changeset} ->
        render conn, "edit.html", category: conn.assigns.category, changeset: changeset
    end
  end

  def assign_category(conn, _) do
    category = conn.params["id"]
      |> String.to_integer
      |> CMS.get_category!
    conn
    |> assign(:category, category)
  end

end

