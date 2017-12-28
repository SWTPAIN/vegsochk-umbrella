defmodule Vegsochk.CMS.Article do
  use Ecto.Schema
  import Ecto.{Query, Changeset}
  alias Vegsochk.CMS.{Article, Author}
  alias Vegsochk.Repo

  schema "articles" do
    field :body, :string
    field :title, :string
    field :slug, :string

    belongs_to :author, Author
    timestamps()
  end

  @doc false
  def changeset(%Article{} = article, attrs) do
    article
    |> cast(attrs, [:body, :title, :author_id])
    |> validate_required([:body, :title, :author_id])
  end

  def auto_slug_changeset(%Article{} = article, attrs) do
    changeset = changeset(article, attrs)
    if title = get_change(changeset, :title) do
      put_change(changeset, :slug, String.downcase(title) |> String.replace(" ", "-"))
    else
      changeset
    end
  end
end

defimpl Phoenix.Param, for: Vegsochk.CMS.Article do
  def to_param(%{slug: slug}) do
    "#{slug}"
  end
end

