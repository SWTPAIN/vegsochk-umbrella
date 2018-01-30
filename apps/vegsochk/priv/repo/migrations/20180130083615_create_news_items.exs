defmodule Vegsochk.Repo.Migrations.CreateNewsItems do
  use Ecto.Migration

  def change do
    create table(:news_items) do
      add :status, :integer, null: false, default: 0
      add :url, :string, null: false
      add :story, :text
      add :headline, :string
      add :image, :string

      timestamps()
    end

    create index(:news_items, [:status])
  end
end
