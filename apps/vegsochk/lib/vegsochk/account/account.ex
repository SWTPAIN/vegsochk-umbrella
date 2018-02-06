defmodule Vegsochk.Account do
  @moduledoc """
  The Account context.
  """

  import Ecto.Query, warn: false
  import Comeonin.Bcrypt, only: [checkpw: 2, dummy_checkpw: 0]
  alias Vegsochk.Repo
  alias Vegsochk.CMS

  alias Vegsochk.Account.{User, Admin, Session}

  def update_author(%User{} = author, attrs) do
    author
    |> User.changeset(attrs)
    |> Repo.update()
  end

  def delete_author(%User{} = author) do
    Repo.delete(author)
  end

  def login_user(%{email: email, password: password}) do
    case get_user_by_email(email) do
      nil ->
        {:error, :unauthorized}
      user ->
        case checkpw(password, user.password_digest) do
          true ->
            {:ok, session} = create_session(user.id)
            {:ok, {user, session}}
          _ ->
            dummy_checkpw()
            {:error, :unauthorized}
        end
    end
  end

  def login_author(%{email: email, password: password} = login_info) do
    case get_user_by_email(email) do
      nil ->
        {:error, :unauthorized}
      user ->
        case checkpw(password, user.password_digest) do
          true ->
            case CMS.get_author(user) do
              nil ->
                {:error, :unauthorized}
              admin ->
                {:ok, session} = create_session(user.id)
                {:ok, {admin, session}}
            end
          _ ->
            dummy_checkpw()
            {:error, :unauthorized}
        end
    end
  end

  def login_admin(%{email: email, password: password} = login_info) do
    case get_user_by_email(email) do
      nil ->
        {:error, :unauthorized}
      user ->
        case checkpw(password, user.password_digest) do
          true ->
            case get_admin(user) do
              nil ->
                {:error, :unauthorized}
              admin ->
                {:ok, session} = create_session(admin.id)
                {:ok, {admin, session}}
            end
          _ ->
            dummy_checkpw()
            {:error, :unauthorized}
        end
    end
  end

  def delete_session(token) do
    Repo.get_by!(Session, %{token: token}) 
    |> Repo.delete
  end

  defp create_session(user_id) do
    Session.registration_changeset(%Session{}, %{user_id: user_id})
    |> Repo.insert()
  end

  def register_user(attrs) do
    %User{}
    |> User.registration_changeset(attrs)
    |> Repo.insert()
  end

  def get_user_by_email(email), do: Repo.get_by(User, %{email: email})

  def get_user_by_id(id), do: Repo.get(User, id)

  def get_user_by_api_token(token) do
    if session = Repo.get_by(Session, %{token: token}) |> Repo.preload(:user) do
      session.user
    end
  end

  def change_user(user) do
    User.changeset(user, %{})
  end

  def update_user_password(%User{} = user, existing_password, new_password) do
    case checkpw(existing_password, user.password_digest) do
      true ->
        user
        |> User.registration_changeset(%{password: new_password})
        |> Repo.update
      _ ->
        dummy_checkpw()
        {:error, :incorrect_password}
    end
  end

  def get_admin!(id), do: Repo.get!(Author, id)

  def get_admin(%User{} = user) do
    Admin.find_one_by(%{user_id: user.id})
    |> Repo.preload([:user])
  end

  def add_admin(%User{} = user) do
    %Admin{user_id: user.id}
    |> Admin.changeset(%{})
    |> Repo.insert()
  end

end
