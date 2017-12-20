defmodule Vegsochk.CMS.Article do
  use Ecto.Schema
  import Ecto.{Query, Changeset}
  alias Vegsochk.CMS.Author
  alias Vegsochk.Repo

  schema "articles" do
    field :body, :string
    field :title, :string
    field :slug, :string

    belongs_to :author, Author
    timestamps()
  end

  @doc false
  def changeset(%Author{} = author, attrs) do
    author
    |> cast(attrs, [:body, :title, :slug, :author_id])
    |> validate_required([:body, :title, :slug, :author_id])
  end

end
