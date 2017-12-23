defmodule Vegsochk.CMS.Image do
  use Ecto.Schema
  import Ecto.{Query, Changeset}
  alias Vegsochk.CMS.{Image, Author}
  alias Vegsochk.Repo

  schema "images" do
    field :url, :string

    belongs_to :author, Author
    timestamps()
  end

  @doc false
  def changeset(%Image{} = image, attrs \\ :invalid) do
    image 
    |> cast(attrs, [:url, :author_id])
    |> validate_required([:url])
  end

end
