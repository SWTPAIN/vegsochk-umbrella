defmodule Vegsochk.Repo.Migrations.CreateUsers do
  use Ecto.Migration

  def change do
    create table(:users) do
      add :name, :string
      add :avatar_url, :string
      add :email, :string
      add :password_digest, :string

      timestamps()
    end

    create unique_index(:users, [:email])
  end
end
