defmodule Vegsochk.CMS.Category do
  use Ecto.Schema
  import Ecto.{Query, Changeset}
  alias Vegsochk.CMS.{Category, Article}
  alias Vegsochk.Repo

  schema "categories" do
    field :name, :string
    field :color, :string

    many_to_many :articles, Article, join_through: "articles_categories"
    timestamps()
  end

  @doc false
  def changeset(%Category{} = restaurant, attrs \\ :invalid) do
    restaurant
    |> cast(attrs, [:name, :color])
    |> validate_required([:name, :color])
  end
end
