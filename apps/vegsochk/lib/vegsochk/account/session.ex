defmodule Vegsochk.Account.Session do
  use Ecto.Schema
  import Ecto.{Query, Changeset}
  alias Vegsochk.Account.{Session, User}
  alias Vegsochk.Repo
  alias SecureRandom

  schema "sessions" do
    field :token, :string

    belongs_to :user, User
    timestamps()
  end

  def find_by_email_and_password(email, _password) do
    User
    |> where([p], p.email == ^email)
    |> limit(1)
    |> Repo.one
  end

  @doc false
  def changeset(%Session{} = session, attrs \\ :empty) do
    session
    |> cast(attrs, [:user_id])
    |> validate_required([:user_id])
  end

  def registration_changeset(%Session{} = session, attrs \\ :empty) do
    session
    |> changeset(attrs)
    |> put_change(:token, SecureRandom.urlsafe_base64())
  end

end
