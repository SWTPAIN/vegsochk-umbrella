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
  end

  scope "/authors", VegsochkWeb.Admin do
    pipe_through :browser

    resources "/sessions", SessionController, only: [:new, :create, :delete]
    get "/logout", SessionController, :delete
  end

  scope "/", VegsochkWeb do
    pipe_through :browser # Use the default browser stack

    get "/", PageController, :index
  end

  # Other scopes may use custom stacks.
  # scope "/api", VegsochkWeb do
  #   pipe_through :api
  # end
end
