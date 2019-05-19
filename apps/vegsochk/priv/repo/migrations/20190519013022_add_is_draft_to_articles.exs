defmodule Vegsochk.Repo.Migrations.AddIsDraftToArticles do
  use Ecto.Migration

  def change do
    alter table(:articles) do
      add :is_draft, :boolean, default: false
    end
  end
end
