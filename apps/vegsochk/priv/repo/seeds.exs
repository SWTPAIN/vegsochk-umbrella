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

IO.puts "---- Restaurant ----"
{:ok, _} = CMS.create_restaurant(%{
  image: "http://via.placeholder.com/350x250",
  name: "LN FORTUNATE COFFEE",
  description: "一間純素咖啡店，地方寬敞、服務用心，是週末消磨悠閒下午的好地方。",
  address: "西環西營盤第二街118號地舖",
  territory: 0, 
  telephone_number: "2858 3898"
})

