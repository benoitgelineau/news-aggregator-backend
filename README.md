# News Aggregator Backend

An API to handle user login & save user's favorite articles.

Environment variables:

- `JWT_ISSUER`: Issuer reference to create the JWT token with
- `NEWS_API_KEY`: Api key from [News API](https://newsapi.org)
- `NODE_ENV`: 'development' | 'production'
- `PRIVATE_KEY`: Path to the private RSA key
- `PUBLIC_FOLDER`: Path to the static files to serve
- `PUBLIC_KEY`: Path to the public RSA key
- `PUBLIC_URL`: URL of the website

Hint: Use the flag `--env-file` from the Docker command to include your `.env` file.

You need to generate the public & private RSA keys before building the Docker image.

Hint: you can create both keys from this command `openssl req -nodes -new -x509 -keyout private-key.pem -out public-key.pem`
