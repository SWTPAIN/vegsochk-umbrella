defmodule Vegsochk.CMS do

  import Ecto.Query, warn: false

  alias Vegsochk.Repo
  alias Vegsochk.CMS.{Author, Article}
  alias Vegsochk.Account.User

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

  def ensure_author_exists(%User{} = user) do
    %Author{user_id: user.id}
    |> Ecto.Changeset.change()
    |> Ecto.Changeset.unique_constraint(:user_id)
    |> Repo.insert()
    |> handle_existing_author()
  end

  defp handle_existing_author({:ok, author}), do: author
  defp handle_existing_author({:error, changeset}) do
      Repo.get_by!(Author, user_id: changeset.data.user_id)
  end
end
