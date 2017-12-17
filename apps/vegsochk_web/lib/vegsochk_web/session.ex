defmodule VegsochkWeb.Session do
  @moduledoc """
  Some helpers for session-related things
  """
  alias FirestormWeb.Forums

  def current_user(%{assigns: %{current_user: u}}), do: u

  def current_user(_), do: nil

end
