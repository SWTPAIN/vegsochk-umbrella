# Script for populating the database. You can run it as:
#
#     mix run priv/repo/seeds.exs
#
# Inside the script, you can read and write to any of your
# repositories directly:
#
#     Vegsochk.Repo.insert!(%Vegsochk.SomeSchema{})
#
# We recommend using the bang functions (`insert!`, `update!`
# and so on) as they will fail if something goes wrong.
alias Vegsochk.Account
alias Vegsochk.CMS

IO.puts "~~~~ INITIALIZING VegsocHK SEEDS ~~~~"

IO.puts "-- CREATING USES --"

IO.puts "---- Author ----"
{:ok, admin} =
  Account.register_user(%{
    avatar_url: "http://www.pi-cube.com/wp-content/uploads/2015/04/team-placeholder.jpg",
    email: "admin@vegsochk.org",
    name: "admin",
    password: "password"
  })
{:ok, _} = CMS.add_author(admin, %{bio: "Vegsochk Admin", role: "admin"})

IO.puts "---- Admin ----"
{:ok, _} = Account.add_admin(admin)

