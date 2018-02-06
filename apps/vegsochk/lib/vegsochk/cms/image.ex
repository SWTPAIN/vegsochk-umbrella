defmodule Vegsochk.CMS.Image do
  use Vegsochk.Data
  alias Vegsochk.CMS.{Image, Author}

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
