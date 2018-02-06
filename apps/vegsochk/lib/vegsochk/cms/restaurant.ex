defmodule Vegsochk.CMS.Restaurant do
  use Vegsochk.Data
  alias Vegsochk.CMS.Restaurant
  alias Vegsochk.Repo

  @required_fields ~w(name description address territory telephone_number image)a

  schema "restaurants" do
    field :name, :string
    field :address, :string
    field :territory, HongKongTerritoryEnum
    field :telephone_number, :string
    field :image, :string
    field :description, :string

    timestamps()
  end

  @doc false
  def changeset(%Restaurant{} = restaurant, attrs \\ :invalid) do
    restaurant
    |> cast(attrs, @required_fields)
    |> validate_required(@required_fields)
  end
end
