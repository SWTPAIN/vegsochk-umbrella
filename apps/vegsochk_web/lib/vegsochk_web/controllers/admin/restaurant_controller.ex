defmodule VegsochkWeb.Admin.RestaurantController do
  use VegsochkWeb, :controller

  alias Vegsochk.CMS
  alias Vegsochk.CMS.Restaurant
  alias VegsochkWeb.Uploader

  plug :assign_restaurant when action in [:edit, :delete, :update]

  def new(conn, _params) do
    changeset = Restaurant.changeset(%Restaurant{}, %{})
    render conn, "new.html", changeset: changeset
  end

  def index(conn, _params) do
    restaurants = CMS.list_restaurants()
    render conn, "index.html", restaurants: restaurants
  end

  def create(conn, %{"restaurant" => %{
    "image" => image_param, 
    "name" => name,
    "address" => address,
    "territory" => territory,
    "telephone_number" => telephone_number 
  }}) do
    image_url = Uploader.upload_image!(image_param)
    case CMS.create_restaurant(%{
      image: image_url,
      name: name,
      address: address,
      territory: territory,
      telephone_number: telephone_number
    }) do
      {:ok, restaurant} ->
        conn
        |> put_flash(:success, "Restaurant created successfully")
        |> redirect(to: admin_restaurant_path(conn, :index))
      {:error, changeset} ->
        render conn, "new.html", changeset: changeset
    end
  end

  def delete(conn, _params) do
    {:ok, _restaurant} = CMS.delete_restaurant(conn.assigns.restaurant)
    conn
    |> put_flash(:success, "Restaurant deleted successfully.")
    |> redirect(to: admin_restaurant_path(conn, :index))
  end

  def edit(conn, _params) do
    restaurant = conn.assigns.restaurant
    render conn, "edit.html", restaurant: restaurant, changeset: CMS.change_restaurant(restaurant)
  end 

  def update(conn, %{"restaurant" => restaurant_params}) do
    image_params = restaurant_params["image"]
    restaurant_params = if image_params do
      image_url = Uploader.upload_image!(image_params)
      Map.put restaurant_params, "image", image_url
    else
      restaurant_params
    end

    case CMS.update_restaurant(conn.assigns.restaurant, restaurant_params) do
      {:ok, restaurant} ->
        conn
        |> put_flash(:success, "Restaurant update successfully")
        |> redirect(to: admin_restaurant_path(conn, :index))
      {:error, changeset} ->
        render conn, "edit.html", restaurant: conn.assigns.restaurant, changeset: changeset
    end
  end

  def assign_restaurant(conn, _) do
    restaurant = conn.params["id"]
      |> String.to_integer
      |> CMS.get_restaurant!
    conn
    |> assign(:restaurant, restaurant)
  end

end

