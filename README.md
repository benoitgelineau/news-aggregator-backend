# News Aggregator Backend

An API to handle user login & save user's favorite articles.

Environment variables:

- `JWT_ISSUER`: Issuer reference to create the JWT token with
- `NODE_ENV`: 'development' | 'production'
- `PUBLIC_FOLDER`: Path to the static files to serve
- `PUBLIC_URL`: URL of the website

Hint: Use the flag `--env-file` from the Docker command to include your `.env` file.

Use of RSA keys, to be generated at the root of the project, before building the Docker image:

- `./public-key.pem`
- `./private-key.pem`

Hint: you can create both keys from this command `openssl req -nodes -new -x509 -keyout private-key.pem -out public-key.pem`
