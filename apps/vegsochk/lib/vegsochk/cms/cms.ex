defmodule Vegsochk.CMS do

  import Ecto.Query, warn: false

  alias Vegsochk.Repo
  alias Ecto.Multi
  alias Vegsochk.CMS.{Author, Article, Image, Restaurant, Tag, NewsItem}
  alias Vegsochk.Account.User

  def list_latest_articles(page_params) do
    Article
    |> Article.newest_first
    |> Article.preload_tags
    |> Article.preload_author
    |> Repo.paginate(page_params)
  end

  def list_latest_articles(%{tag: %Tag{} = tag}, page_params) do
    Article
    |> Article.newest_first
    |> Article.with_tag(tag)
    |> Article.preload_author
    |> Repo.paginate(page_params)
  end

  def list_latest_articles(%{author: %Author{} = author}, page_params) do
    Article
    |> Article.newest_first
    |> Article.with_author(author)
    |> Article.preload_author
    |> Article.preload_tags
    |> Repo.paginate(page_params)
  end

  def list_articles(%Author{} = author) do
    Article
    |> where([a], a.author_id == ^author.id)
    |> Repo.all()
  end

  def create_article(%Author{} = author, %{"tag_ids" => tag_ids} = attrs) do
    %Article{author_id: author.id}
    |> Article.auto_slug_changeset(attrs)
    |> Ecto.Changeset.put_assoc(:tags, _get_tags!(tag_ids))
    |> Repo.insert()
  end

  defp _get_tags!(tag_ids) do
    tag_ids
    |> Enum.map(&get_tag!/1)
  end

  def update_article(%Article{} = article, %{"tag_ids" => tag_ids} = attrs) do
    article
    |> Article.auto_slug_changeset(attrs)
    |> Ecto.Changeset.put_assoc(:tags, _get_tags!(tag_ids))
    |> Repo.update()
  end

  def delete_article(%Article{} = article) do
    Repo.delete(article)
  end

  def get_article!(id) do
    Repo.get_by!(Article, %{slug: id})
    |> Repo.preload([:tags])
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

  def list_tags() do
    Tag
    |> Repo.all()
  end

  def create_tag(attrs \\ %{}) do
    %Tag{}
    |> Tag.changeset(attrs)
    |> Repo.insert()
  end

  def change_tag(tag) do
    tag
    |> Tag.changeset(%{})
  end

  def update_tag(%Tag{} = tag, attrs) do
    tag
    |> Tag.changeset(attrs)
    |> Repo.update()
  end

  def delete_tag(%Tag{} = tag) do
    Repo.delete(tag)
  end

  def get_tag!(%{name: name}) do
    Tag.with_name(name)
    |> Repo.one!
  end

  def get_tag!(id) do
    Repo.get!(Tag, id) 
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

  def get_author!(%{name: name}) do
    Author.with_name(name)
    |> Repo.one!
    |> Author.preload_user
  end

  def get_author!(id) do
    Repo.get!(Author, id)
    |> Author.preload_user
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

  def list_news_items() do
    NewsItem
    |> Repo.all()
  end

  def create_news_item(attrs \\ %{}) do
    %NewsItem{}
    |> NewsItem.changeset(attrs)
    |> Repo.insert()
  end

  def change_news_item(news_item) do
    news_item
    |> NewsItem.changeset(%{})
  end

  def update_news_item(%NewsItem{} = news_item, attrs) do
    news_item
    |> NewsItem.changeset(attrs)
    |> Repo.update()
  end

  def delete_news_item(%NewsItem{} = news_item) do
    Repo.delete(news_item)
  end

  def get_news_item!(id) do
    Repo.get!(NewsItem, id) 
  end

  def list_latest_news_items(limit_num \\ 10) do
    NewsItem
    |> order_by([n], [desc: n.inserted_at])
    |> limit(^limit_num)
    |> Repo.all()
  end

end
