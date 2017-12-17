defmodule Vegsochk.AccountTest do
  use Vegsochk.DataCase

  alias Vegsochk.Account

  describe "authors" do
    alias Vegsochk.Account.Author

    @valid_attrs %{avatar_url: "some avatar_url", emai: "some emai", name: "some name", password_digest: "some password_digest", intro: "fake intro"}
    @update_attrs %{avatar_url: "some updated avatar_url", emai: "some updated emai", name: "some updated name", password_digest: "some updated password_digest", intro: "fake intro"}
    @invalid_attrs %{avatar_url: nil, emai: nil, name: nil, password_digest: nil}

    def author_fixture(attrs \\ %{}) do
      {:ok, author} =
        attrs
        |> Enum.into(@valid_attrs)
        |> Account.create_author()

      author
    end

    test "list_authors/0 returns all authors" do
      author = author_fixture()
      assert Account.list_authors() == [author]
    end

    test "get_author!/1 returns the author with given id" do
      author = author_fixture()
      assert Account.get_author!(author.id) == author
    end

    test "create_author/1 with valid data creates a author" do
      assert {:ok, %Author{} = author} = Account.create_author(@valid_attrs)
      assert author.avatar_url == "some avatar_url"
      assert author.emai == "some emai"
      assert author.name == "some name"
      assert author.password_digest == "some password_digest"
    end

    test "create_author/1 with invalid data returns error changeset" do
      assert {:error, %Ecto.Changeset{}} = Account.create_author(@invalid_attrs)
    end

    test "update_author/2 with valid data updates the author" do
      author = author_fixture()
      assert {:ok, author} = Account.update_author(author, @update_attrs)
      assert %Author{} = author
      assert author.avatar_url == "some updated avatar_url"
      assert author.emai == "some updated emai"
      assert author.name == "some updated name"
      assert author.password_digest == "some updated password_digest"
    end

    test "update_author/2 with invalid data returns error changeset" do
      author = author_fixture()
      assert {:error, %Ecto.Changeset{}} = Account.update_author(author, @invalid_attrs)
      assert author == Account.get_author!(author.id)
    end

    test "delete_author/1 deletes the author" do
      author = author_fixture()
      assert {:ok, %Author{}} = Account.delete_author(author)
      assert_raise Ecto.NoResultsError, fn -> Account.get_author!(author.id) end
    end

    test "change_author/1 returns a author changeset" do
      author = author_fixture()
      assert %Ecto.Changeset{} = Account.change_author(author)
    end
  end
end
