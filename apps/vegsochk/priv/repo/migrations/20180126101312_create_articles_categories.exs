defmodule Vegsochk.Repo.Migrations.CreateArticlesCategories do
  use Ecto.Migration

  def change do
    create table(:articles_categories, primary_key: false) do
      add :article_id, references(:articles)
      add :category_id, references(:categories)
    end
  end
end
