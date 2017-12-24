defmodule Vegsochk.Repo.Migrations.CreateImages do
  use Ecto.Migration

  def change do
    create table(:images) do
      add :url, :string

      add :author_id, references(:authors, on_delete: :delete_all), null: false 

      timestamps()
    end

    create index(:images, [:author_id])
  end

end
