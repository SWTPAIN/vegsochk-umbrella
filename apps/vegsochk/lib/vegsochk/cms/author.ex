defmodule Vegsochk.CMS.Author do
  use Ecto.Schema
  import Ecto.{Query, Changeset}
  import Comeonin.Bcrypt, only: [hashpwsalt: 1]
  alias Vegsochk.CMS.Author
  alias Vegsochk.Account.User
  alias Vegsochk.Repo


  schema "authors" do
    field :bio, :string
    field :role, :string

    belongs_to :user, User
    timestamps()
  end

  def find_one_by(%{user_id: user_id}) do
    query = from a in Author,
      left_join: u in assoc(a, :users),
      where: u.id == ^user_id,
      select: a
    Repo.one(query)
  end

  @doc false
  def changeset(%Author{} = author, attrs) do
    author
    |> cast(attrs, [:bio, :role, :user_id])
    |> validate_required([:bio, :role, :user_id])
  end

end
