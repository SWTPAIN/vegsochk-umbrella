defmodule Vegsochk.Data do
  defmacro __using__(_opts) do
    quote do
      use Ecto.Schema

      import Ecto
      import Ecto.Changeset
      import EctoEnum, only: [defenum: 2]

      alias Vegsochk.Repo
    end
  end
end
