defmodule Vegscohk.CMS do

  import Ecto.Query, warn: false

  alias Vegsochk.Repo
  alias Vegsochk.CMS.{Author, Article}
  alias Vegsochk.Account.User

  def list_articles(%Author{} = author) do
    Article
    |> where([a], a.author_id == ^author.id)
    |> Repo.all()
  end

  def create_page(%Author{} = author, attrs \\ %{}) do
    %Article{}
    |> Article.changeset(attrs)
    |> Ecto.Changeset.put_change(:author_id, author.id)
    |> Repo.insert()
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
