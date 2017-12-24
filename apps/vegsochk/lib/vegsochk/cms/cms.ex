defmodule Vegsochk.CMS do

  import Ecto.Query, warn: false

  alias Vegsochk.Repo
  alias Vegsochk.CMS.{Author, Article, Image}
  alias Vegsochk.Account.User

  def list_latest_articles(limit_num \\ 10) do
    Article
    |> order_by([a], [desc: a.inserted_at])
    |> limit(^limit_num)
    |> Repo.all()
  end

  def list_articles(%Author{} = author) do
    Article
    |> where([a], a.author_id == ^author.id)
    |> Repo.all()
  end

  def create_article(%Author{} = author, attrs \\ %{}) do
    %Article{author_id: author.id}
    |> Article.auto_slug_changeset(attrs)
    |> Repo.insert()
  end

  def update_article(%Article{} = article, attrs) do
    article
    |> Article.auto_slug_changeset(attrs)
    |> Repo.update()
  end

  def delete_article(%Article{} = article) do
    Repo.delete(article)
  end

  def get_article!(id) do
    Repo.get_by!(Article, %{slug: id})
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

  def get_author!(id), do: Repo.get!(Author, id)

  def get_author(%User{} = user) do
    Author.find_one_by(%{user_id: user.id})
  end

  def add_author(%User{} = user, attrs) do
    %Author{user_id: user.id}
    |> Author.changeset(attrs)
    |> Repo.insert()
  end

  def is_author?(%User{} = user) do
    !!get_author(user)
  end 

end
