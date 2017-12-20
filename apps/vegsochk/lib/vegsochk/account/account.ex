defmodule Vegsochk.Account do
  @moduledoc """
  The Account context.
  """

  import Ecto.Query, warn: false
  import Comeonin.Bcrypt, only: [checkpw: 2, dummy_checkpw: 0]
  alias Vegsochk.Repo

  alias Vegsochk.Account.{User, Session}
  alias Vegsochk.CMS.Author

  def list_authors do
    Repo.all(Author)
  end

  def get_author!(id), do: Repo.get!(Author, id)

  def get_author(%{user_id: user_id}) do
    Author.find_one_by(%{user_id: user_id})
  end

  def create_user(attrs \\ %{}) do
    %User{}
    |> User.changeset(attrs)
    |> Repo.insert()
  end

  def update_author(%User{} = author, attrs) do
    author
    |> User.changeset(attrs)
    |> Repo.update()
  end

  def delete_author(%User{} = author) do
    Repo.delete(author)
  end

  def login_user(%{email: email, password: password}) do
    case get_user_by_email(email) do
      nil ->
        {:error, :unauthorized}
      user ->
        case checkpw(password, user.password_digest) do
          true ->
            {:ok, session} = create_session(user.id)
            {:ok, {user, session}}
          _ ->
            dummy_checkpw
            {:error, :unauthorized}
        end
    end
  end

  defp create_session(user_id) do
    Session.registration_changeset(%Session{}, %{user_id: user_id})
    |> Repo.insert()
  end

  def add_author(%User{} = user, attrs) do
    %Author{user_id: user.id}
    |> Author.changeset(attrs)
    |> Repo.insert()
  end

  def is_author?(%User{} = user) do
    !!Author.find_one_by(%{user_id: user.id})
  end 

  def register_user(attrs) do
    %User{}
    |> User.changeset(attrs)
    |> Repo.insert()
  end

  def get_user_by_email(email), do: Repo.get_by(User, %{email: email})

  def get_user_by_id(id), do: Repo.get(User, id)

  def get_user_by_api_token(token) do
     Repo.get_by(User, %{api_token: token})
  end
end
