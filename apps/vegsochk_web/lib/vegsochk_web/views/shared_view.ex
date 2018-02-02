defmodule VegsochkWeb.SharedView do
  use VegsochkWeb, :view
  
  def is_first_page_active?(%Scrivener.Page{page_number: page_number}) do
    page_number == 1
  end

  def is_last_page_active?(%Scrivener.Page{page_number: page_number, total_pages: total_pages}) do
    total_pages == page_number
  end

  def previous_page_url(%Scrivener.Page{page_number: page_number}) do
    ("?" <> Plug.Conn.Query.encode(page: page_number - 1))
  end

  def next_page_url(%Scrivener.Page{page_number: page_number}) do
    ("?" <> Plug.Conn.Query.encode(page: page_number + 1))
  end

end
