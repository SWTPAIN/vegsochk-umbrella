defmodule Vegsochk.Repo.Migrations.AddDescriptionToRestaurants do
  use Ecto.Migration

  def change do
    alter table(:restaurants) do
      add :description, :text
    end
  end
end
