defmodule Vegsochk.CMS.Author do
  use Vegsochk.Data
  alias Vegsochk.CMS.Author
  alias Vegsochk.Account.User

  @required_fields ~w(bio role user_id)a

  schema "authors" do
    field :bio, :string
    field :role, :string

    belongs_to :user, User
    timestamps()
  end

  def with_name(query \\ __MODULE__, name) do
    from q in query,
      join: u in assoc(q, :user),
      where: u.name == ^name
  end

  def preload_user(query) do
    query |> Ecto.Query.preload(:user)
  end

  def find_one_by(%{user_id: user_id}) do
    query = from a in Author,
      left_join: u in assoc(a, :user),
      where: u.id == ^user_id,
      select: a
    Repo.one(query)
    |> Repo.preload([:user])
  end

  @doc false
  def changeset(%Author{} = author, attrs) do
    author
    |> cast(attrs, @required_fields)
    |> validate_required(@required_fields)
    |> unique_constraint(:user_id)
  end

end
