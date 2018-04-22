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

  def ga_tag do
    raw """
    <!-- Global site tag (gtag.js) - Google Analytics -->
    <script async src="https://www.googletagmanager.com/gtag/js?id=UA-117938479-1"></script>
    <script>
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
    
      gtag('config', 'UA-117938479-1');
    </script>
    """
  end

end
