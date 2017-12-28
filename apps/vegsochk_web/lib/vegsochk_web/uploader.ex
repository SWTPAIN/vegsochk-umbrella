defmodule VegsochkWeb.Uploader do

  def upload_image!(%Plug.Upload{content_type: content_type, filename: filename, path: path}) do
		unique_filename = "#{UUID.uuid4(:hex)}-#{filename}"
		{:ok, image_binary} = File.read(path)
		bucket_name = System.get_env("BUCKET_NAME")
		image = 
			ExAws.S3.put_object(bucket_name, unique_filename, image_binary)          
			|> ExAws.request!
    "https://#{bucket_name}.s3.amazonaws.com/#{unique_filename}"
  end
end
