defmodule Vegsochk.Repo.Migrations.AddTldrAndCoverImageToArticles do
  use Ecto.Migration

  def change do
    alter table(:articles) do
      add :tldr, :string
      add :cover_image, :string
    end
  end
end
