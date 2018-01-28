defmodule Vegsochk.CMS do

  import Ecto.Query, warn: false

  alias Vegsochk.Repo
  alias Ecto.Multi
  alias Vegsochk.CMS.{Author, Article, Image, Restaurant, Category}
  alias Vegsochk.Account.User

  def list_latest_articles(limit_num \\ 10) do
    Article
    |> order_by([a], [desc: a.inserted_at])
    |> limit(^limit_num)
    |> Repo.all()
    |> Repo.preload([:categories])
  end

  def list_articles(%Author{} = author) do
    Article
    |> where([a], a.author_id == ^author.id)
    |> Repo.all()
  end

  def create_article(%Author{} = author, %{"category_ids" => category_ids} = attrs) do
    %Article{author_id: author.id}
    |> Article.auto_slug_changeset(attrs)
    |> Ecto.Changeset.put_assoc(:categories, _get_categories!(category_ids))
    |> Repo.insert()
  end

  defp _get_categories!(category_ids) do
    category_ids
    |> Enum.map(&get_category!/1)
  end

  def update_article(%Article{} = article, %{"category_ids" => category_ids} = attrs) do
    article
    |> Article.auto_slug_changeset(attrs)
    |> Ecto.Changeset.put_assoc(:categories, _get_categories!(category_ids))
    |> Repo.update()
  end

  def delete_article(%Article{} = article) do
    Repo.delete(article)
  end

  def get_article!(id) do
    Repo.get_by!(Article, %{slug: id})
    |> Repo.preload([:categories])
  end

  def list_restaurants() do
    Restaurant
    |> Repo.all()
  end

  def create_restaurant(attrs \\ %{}) do
    %Restaurant{}
    |> Restaurant.changeset(attrs)
    |> Repo.insert()
  end

  def change_restaurant(restaurant) do
    restaurant
    |> Restaurant.changeset(%{})
  end

  def update_restaurant(%Restaurant{} = restaurant, attrs) do
    restaurant
    |> Restaurant.changeset(attrs)
    |> Repo.update()
  end

  def delete_restaurant(%Restaurant{} = restaurant) do
    Repo.delete(restaurant)
  end

  def get_restaurant!(id) do
    Repo.get!(Restaurant, id) 
  end

  def list_categories() do
    Category
    |> Repo.all()
  end

  def create_category(attrs \\ %{}) do
    %Category{}
    |> Category.changeset(attrs)
    |> Repo.insert()
  end

  def change_category(category) do
    category
    |> Category.changeset(%{})
  end

  def update_category(%Category{} = category, attrs) do
    category
    |> Category.changeset(attrs)
    |> Repo.update()
  end

  def delete_category(%Category{} = category) do
    Repo.delete(category)
  end

  def get_category!(id) do
    Repo.get!(Category, id) 
  end

  def list_images(%Author{} = author) do
    Image
    |> where([i], i.author_id == ^author.id)
    |> Repo.all()
  end

  def create_image(%Author{} = author, image_url) do
    %Image{}
    |> Image.changeset(%{url: image_url, author_id: author.id})
    |> Repo.insert()
  end

  def get_author!(id) do
    Repo.get!(Author, id)
    |> Repo.preload([:user])
  end

  def get_author(%User{} = user) do
    Author.find_one_by(%{user_id: user.id})
  end

  def add_author(%User{} = user, attrs) do
    %Author{user_id: user.id}
    |> Author.changeset(attrs)
    |> Repo.insert()
  end

  def change_author(author) do
    author
    |> Author.changeset(%{})
  end

  def update_author_profile(%Author{} = author, %{bio: bio, avatar: avatar}) do
    result = Multi.new
    |> Multi.update(:author, Author.changeset(author, %{bio: bio}))
    |> Multi.update(:user, User.changeset(author.user, %{avatar: avatar}))
    |> Repo.transaction
    case result do
      {:ok, %{author: author}} -> {:ok, author}
      {:error, _, failed_changeset, _} -> {:error, failed_changeset}
    end
  end

  def update_author_profile(%Author{} = author, %{bio: bio}) do
    Repo.update(Author.changeset(author, %{bio: bio}))
  end

  def is_author?(%User{} = user) do
    !!get_author(user)
  end 

end
