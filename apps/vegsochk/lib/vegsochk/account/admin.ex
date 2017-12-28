defmodule Vegsochk.Account.Admin do
  use Ecto.Schema
  import Ecto.{Query, Changeset}
  alias Vegsochk.Account.{Admin, User}
  alias Vegsochk.Repo


  schema "admins" do
    timestamps()

    belongs_to :user, User
  end

  def find_one_by(%{user_id: user_id}) do
    query = from a in Admin,
      left_join: u in assoc(a, :user),
      where: u.id == ^user_id,
      select: a
    Repo.one(query)
  end

  @doc false
  def changeset(%Admin{} = admin, attrs) do
    admin
    |> cast(attrs, [:user_id])
    |> validate_required([:user_id])
    |> unique_constraint(:user_id)
  end

end
