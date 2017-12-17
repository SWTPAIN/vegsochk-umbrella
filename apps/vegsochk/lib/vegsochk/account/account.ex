defmodule Vegsochk.Account do
  @moduledoc """
  The Account context.
  """

  import Ecto.Query, warn: false
  import Comeonin.Bcrypt, only: [checkpw: 2, dummy_checkpw: 0]
  alias Vegsochk.Repo

  alias Vegsochk.Account.User
  alias Vegsochk.CMS.Author

  def list_authors do
    Repo.all(User)
  end

  def get_author!(id), do: Repo.get!(User, id)

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

  def change_author(%User{} = author) do
    User.changeset(author, %{})
    |> Repo.insert
  end

  def login_user(%{email: email, password: password}) do
    case get_user_by_email(email) do
      nil ->
        {:error, :unauthorized}
      user ->
        case checkpw(password, user.password_digest) do
          true ->
            {:ok, user}
          _ ->
            {:error, :unauthorized}
        end
    end
  end

  def add_author(%User{} = user, attrs) do
    IO.puts "ok"
    IO.inspect user
    %Author{user_id: user.id}
    |> Author.changeset(attrs)
    |> Repo.insert()
  end

  def register_user(attrs) do
    %User{}
    |> User.changeset(attrs)
    |> Repo.insert()
  end

  def get_user_by_email(email), do: Repo.get_by(User, %{email: email})

  def get_user_by_id(id), do: Repo.get(User, id)

end
