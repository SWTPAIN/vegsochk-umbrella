use Mix.Config

# Configure your database
config :vegsochk, Vegsochk.Repo,
  adapter: Ecto.Adapters.Postgres,
  username: "postgres",
  password: "postgres",
  database: "vegsochk_dev",
  hostname: "localhost",
  pool_size: 10
