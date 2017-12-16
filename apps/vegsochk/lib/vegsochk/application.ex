defmodule Vegsochk.Application do
  @moduledoc """
  The Vegsochk Application Service.

  The vegsochk system business domain lives in this application.

  Exposes API to clients such as the `VegsochkWeb` application
  for use in channels, controllers, and elsewhere.
  """
  use Application

  def start(_type, _args) do
    import Supervisor.Spec, warn: false

    Supervisor.start_link([
      supervisor(Vegsochk.Repo, []),
    ], strategy: :one_for_one, name: Vegsochk.Supervisor)
  end
end
