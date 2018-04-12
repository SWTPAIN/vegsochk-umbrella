defmodule VegsochkWeb.LayoutView do
  use VegsochkWeb, :view

	def ogtags(%{og_tags: og_tags}) do
		if og_tags do
			for {key, value} <- og_tags do
        raw("\t<meta property=\"#{key}\" content=\"#{value}\">\n")
			end
		end
	end

	def ogtags(_), do: nil

end
