defmodule Vegsochk.Account.User do
  use Ecto.Schema
  import Ecto.{Query, Changeset}
  import Comeonin.Bcrypt, only: [hashpwsalt: 1]
  alias Vegsochk.Account.User
  alias Vegsochk.Repo


  schema "users" do
    field :avatar, :string
    field :email, :string
    field :name, :string
    field :password_digest, :string
    field :suspended_at, Timex.Ecto.DateTime

    field :password, :string, virtual: true

    has_one :author, Vegsochk.CMS.Author
    timestamps()
  end

  def find_by_email_and_password(email, _password) do
    User
    |> where([p], p.email == ^email)
    |> limit(1)
    |> Repo.one
  end

  @doc false
  def registration_changeset(%User{} = user, attrs) do
    changeset(user, attrs)
    |> cast(attrs, [:password])
    |> validate_length(:password, min: 6)
    |> hashed_password
  end

  def changeset(%User{} = user, attrs) do
    user
    |> cast(attrs, [:name, :avatar, :email])
    |> validate_required([:name, :avatar, :email,])
    |> unique_constraint(:email)
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
