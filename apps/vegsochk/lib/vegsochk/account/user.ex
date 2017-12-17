defmodule Vegsochk.Account.User do
  use Ecto.Schema
  import Ecto.{Query, Changeset}
  import Comeonin.Bcrypt, only: [hashpwsalt: 1]
  alias Vegsochk.Account.User
  alias Vegsochk.Repo


  schema "users" do
    field :avatar_url, :string
    field :email, :string
    field :name, :string
    field :password_digest, :string

    field :password, :string, virtual: true
    timestamps()
  end

  def find_by_email_and_password(email, _password) do
    User
    |> where([p], p.email == ^email)
    |> limit(1)
    |> Repo.one
  end

  @doc false
  def changeset(%User{} = user, attrs) do
    user
    |> cast(attrs, [:name, :avatar_url, :email, :password])
    |> validate_required([:name, :avatar_url, :email, :password])
    |> unique_constraint(:email)
    |> hashed_password
  end

  defp hashed_password(changeset) do
    if password = get_change(changeset, :password) do
      changeset
        |> put_change(:password_digest, hashpwsalt(password))
    else
      changeset
    end
  end
end
