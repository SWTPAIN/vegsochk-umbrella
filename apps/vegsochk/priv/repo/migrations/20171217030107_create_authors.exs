defmodule Vegsochk.Repo.Migrations.CreateAuthors do
  use Ecto.Migration

  def change do
    create table(:authors) do
      add :bio, :text
      add :role, :string

      add :user_id, references(:users, on_delete: :delete_all), null: false
      timestamps()
    end
  end
end
