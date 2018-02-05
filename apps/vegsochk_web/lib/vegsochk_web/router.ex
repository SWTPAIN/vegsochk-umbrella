defmodule VegsochkWeb.Router do
  use VegsochkWeb, :router

  pipeline :browser do
    plug :accepts, ["html"]
    plug :fetch_session
    plug :fetch_flash
    plug :protect_from_forgery
    plug :put_secure_browser_headers
    plug VegsochkWeb.Plugs.CurrentUser
  end

  pipeline :api do
    plug :accepts, ["json"]
    plug VegsochkWeb.Plugs.ApiCurrentUser
  end

  pipeline :admin_layout do
    plug :put_layout, {VegsochkWeb.LayoutView, :admin}
  end

  pipeline :author_layout do
    plug :put_layout, {VegsochkWeb.LayoutView, :author}
  end

  pipeline :author do
    plug VegsochkWeb.Plugs.CurrentAuthor
  end

  pipeline :admin do
    plug VegsochkWeb.Plugs.CurrentAdmin
  end

  pipeline :api do
    plug :accepts, ["json"]
  end

	scope "/admin", VegsochkWeb.Admin, as: :admin do
    pipe_through [:browser, :admin_layout]

    resources "/sessions", SessionController, only: [:create]
    get "/login", SessionController, :new

    pipe_through :admin

    get "/", PageController, :index
    get "/logout", SessionController, :delete
    resources "/restaurants", RestaurantController
    resources "/tags", TagController
    resources "/authors", AuthorController
    post "/authors/:id/suspend", AuthorController, :suspend
    resources "/news_items", NewsItemController
	end

  scope "/author", VegsochkWeb.Author, as: :author do
    pipe_through [:browser, :author_layout]

    resources "/sessions", SessionController, only: [:create]
    get "/login", SessionController, :new

    pipe_through :author

    get "/", PageController, :index
    get "/logout", SessionController, :delete

    resources "/profile", ProfileController, singleton: true, only: [:edit, :update]
    resources "/password", PasswordController, singleton: true, only: [:edit, :update]
    resources "/articles", ArticleController, only: [:new, :index, :edit, :delete]
    resources "/images", ImageController
  end

  scope "/api/v1", VegsochkWeb.Api.V1, as: :api_v1 do
    pipe_through :api

    resources "/restaurants", RestaurantController, only: [:index]
    resources "/tags", TagController, only: [:index]

    pipe_through :author

    resources "/articles", ArticleController, only: [:create, :show, :update]
  end

  scope "/", VegsochkWeb do
    pipe_through :browser # Use the default browser stack

    get "/", PageController, :index
    get "/logout_success", PageController, :logout_success
    resources "articles", ArticleController, only: [:show]
    resources "tags", TagController, only: [:show]
    resources "authors", AuthorController, only: [:show]
     # static pages
    get "/animals", PageController, :animals
    get "/health", PageController, :health
    get "/about-us", PageController, :about_us
    get "/donation", PageController, :donation
    get "/environment-and-justice", PageController, :environment_and_justice
    get "/vegan-tips", PageController, :vegan_tips
    get "/why-vegan", PageController, :why_vegan
  end

end

defimpl Phoenix.Param, for: Vegsochk.CMS.Restaurant do
  def to_param(%{id: id}) do
    to_string id
  end
end

defimpl Phoenix.Param, for: Vegsochk.CMS.Article do
  def to_param(%{slug: slug}) do
    "#{slug}"
  end
end

defimpl Phoenix.Param, for: Vegsochk.CMS.Tag do
  def to_param(%{name: name}) do
    name
  end
end

defimpl Phoenix.Param, for: Vegsochk.CMS.Author do
  def to_param(%{user: %{name: name}}) do
    name
  end
end


