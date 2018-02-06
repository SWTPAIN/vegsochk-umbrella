defmodule Vegsochk.CMS.Tag do
  use Vegsochk.Data

  alias Vegsochk.CMS.{Tag, Article}
  alias Vegsochk.Repo

  schema "tags" do
    field :name, :string

    many_to_many :articles, Article, join_through: "articles_tags"
    timestamps()
  end

  def with_name(query \\ __MODULE__, name) do
    from q in query,
      where: q.name == ^name
  end

  @doc false
  def changeset(%Tag{} = restaurant, attrs \\ :invalid) do
    restaurant
    |> cast(attrs, [:name])
    |> validate_required([:name])
  end
end
