defmodule Vegsochk.Data do
  defmacro __using__(opts) do
    opts = Keyword.merge([default_sort: :inserted_at], opts)

    quote do
      use Ecto.Schema

      import Ecto
      import Ecto.{Query, Changeset}
      import EctoEnum, only: [defenum: 2]

      alias Vegsochk.Repo

      def newest_first(query \\ __MODULE__, field \\ unquote(opts[:default_sort])), do: from(q in query, order_by: [desc: ^field])
      def newest_last(query \\ __MODULE__, field \\ unquote(opts[:default_sort])), do: from(q in query, order_by: [asc: ^field])
    end
  end
end
