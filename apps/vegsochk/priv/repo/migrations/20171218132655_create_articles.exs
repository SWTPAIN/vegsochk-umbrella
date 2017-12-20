defmodule Vegsochk.Repo.Migrations.CreateArticles do
  use Ecto.Migration

  def change do
    create table(:articles) do
      add :body, :text
      add :title, :string
      add :slug, :string

      add :author_id, references(:authors, on_delete: :delete_all), null: false 

      timestamps()
    end

    create index(:articles, [:slug], unique: true)
  end
end
