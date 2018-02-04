defmodule Vegsochk.Repo.Migrations.AddUniqueIndexNameAndSuspendedAtToUsers do
  use Ecto.Migration

  def change do
    alter table(:users) do
      add :suspended_at, :datetime
    end

    create unique_index(:users, [:name])
  end
end
