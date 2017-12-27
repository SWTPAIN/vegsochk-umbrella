defmodule Vegsochk.Repo.Migrations.CreateRestaurants do
  use Ecto.Migration

  def change do
    create table(:restaurants) do
      add :name, :string
      add :address, :string
      add :territory, :integer
      add :telephone_number, :string
      add :image, :string

      timestamps()
    end
  end
end
