use Mix.Config

config :vegsochk, ecto_repos: [Vegsochk.Repo]

import_config "#{Mix.env}.exs"
