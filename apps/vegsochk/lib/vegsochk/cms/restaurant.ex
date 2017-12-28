defmodule Vegsochk.CMS.Restaurant do
  use Ecto.Schema
  import Ecto.{Query, Changeset}
  alias Vegsochk.CMS.Restaurant
  alias Vegsochk.Repo

  schema "restaurants" do
    field :name, :string
    field :address, :string
    field :territory, HongKongTerritoryEnum
    field :telephone_number, :string
    field :image, :string

    timestamps()
  end

  @doc false
  def changeset(%Restaurant{} = restaurant, attrs \\ :invalid) do
    restaurant
    |> cast(attrs, [:name, :address, :territory, :telephone_number, :image])
    |> validate_required([:name, :address, :territory, :telephone_number, :image])
  end
end

defimpl Phoenix.Param, for: Vegsochk.CMS.Restaurant do
  def to_param(%{id: id}) do
    to_string id
  end
end

