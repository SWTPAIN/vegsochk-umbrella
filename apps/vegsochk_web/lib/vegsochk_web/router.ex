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

  pipeline :author do
    plug VegsochkWeb.Plugs.CurrentAuthor
  end

  pipeline :api do
    plug :accepts, ["json"]
  end

  scope "/authors", VegsochkWeb.Author do
    pipe_through [:browser, :admin_layout]

    resources "/sessions", SessionController, only: [:create]
    get "/login", SessionController, :new

    pipe_through :author

    get "/", PageController, :index
    get "/logout", SessionController, :delete
    resources "/articles", ArticleController, only: [:new, :index, :edit, :delete]
    resources "/images", ImageController
  end

  scope "/", VegsochkWeb do
    pipe_through :browser # Use the default browser stack

    get "/", PageController, :index
  end

  scope "/api/v1", VegsochkWeb.Api.V1 do
    pipe_through :api
    pipe_through :author

    resources "/articles", ArticleController, only: [:create, :show, :update]
  end
end
