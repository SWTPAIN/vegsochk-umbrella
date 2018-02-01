defmodule Vegsochk.Repo.Migrations.RenameCategoriesToTagsAndRemoveColor do
  use Ecto.Migration

  def change do
    rename table(:categories), to: table(:tags)

    alter table(:tags) do
      remove :color
    end

    rename table(:articles_categories), to: table(:articles_tags)

    alter table(:articles_tags) do
      modify :category_id, references(:tags)
    end
    rename table(:articles_tags), :category_id, to: :tag_id
  end
end
