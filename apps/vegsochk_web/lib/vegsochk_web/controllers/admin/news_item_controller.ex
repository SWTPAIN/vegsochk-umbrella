defmodule VegsochkWeb.Admin.NewsItemController do
  use VegsochkWeb, :controller

  alias Vegsochk.CMS
  alias Vegsochk.CMS.NewsItem
  alias VegsochkWeb.Uploader

  plug :assign_news_item when action in [:edit, :delete, :update]

  def new(conn, _params) do
    changeset = NewsItem.changeset(%NewsItem{}, %{})
    render conn, "new.html", changeset: changeset
  end

  def index(conn, _params) do
    news_items = CMS.list_news_items()
    render conn, "index.html", news_items: news_items
  end

  def create(conn, %{"news_item" => news_item_params}) do
    image_url = Uploader.upload_image!(news_item_params["image"])
    case CMS.create_news_item(%{news_item_params | "image" => image_url}) do
      {:ok, news_item} ->
        conn
        |> put_flash(:success, "NewsItem created successfully")
        |> redirect(to: admin_news_item_path(conn, :index))
      {:error, changeset} ->
        render conn, "new.html", changeset: changeset
    end
  end

  def delete(conn, _params) do
    {:ok, _news_item} = CMS.delete_news_item(conn.assigns.news_item)
    conn
    |> put_flash(:success, "NewsItem deleted successfully.")
    |> redirect(to: admin_news_item_path(conn, :index))
  end

  def edit(conn, _params) do
    news_item = conn.assigns.news_item
    render conn, "edit.html", news_item: news_item, changeset: CMS.change_news_item(news_item)
  end 

  def update(conn, %{"news_item" => news_item_params}) do
    image_params = news_item_params["image"]
    news_item_params = if image_params do
      image_url = Uploader.upload_image!(image_params)
      Map.put news_item_params, "image", image_url
    else
      news_item_params
    end

    case CMS.update_news_item(conn.assigns.news_item, news_item_params) do
      {:ok, news_item} ->
        conn
        |> put_flash(:success, "NewsItem update successfully")
        |> redirect(to: admin_news_item_path(conn, :index))
      {:error, changeset} ->
        render conn, "edit.html", news_item: conn.assigns.news_item, changeset: changeset
    end
  end

  def assign_news_item(conn, _) do
    news_item = conn.params["id"]
      |> String.to_integer
      |> CMS.get_news_item!
    conn
    |> assign(:news_item, news_item)
  end

end

