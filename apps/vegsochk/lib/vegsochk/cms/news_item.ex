defmodule Vegsochk.CMS.NewsItem do
  use Vegsochk.Data

  alias Vegsochk.CMS.{Article, Author, Category, NewsItem}

  defenum Status, suspended: -1, draft: 0, published: 1
  @required_fields ~w(status url headline story image)a
  
  schema "news_items" do
    field :status, Status, default: :draft
    
    field :url, :string
    field :headline, :string
    field :story, :string
    field :image, :string

    timestamps()
  end

  @doc false
  def changeset(%NewsItem{} = news_item, attrs) do
    news_item 
    |> cast(attrs, @required_fields)
    |> validate_required(@required_fields)
  end

end

