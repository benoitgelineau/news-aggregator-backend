# News Aggregator Backend

An API to handle user login & save user's favorite articles.

Environment variables:
- `NODE_ENV`: Node environment (i.e. `development` | `production`)
- `APP_URL`: URL of the site

Use of RSA keys:
- `./public-key.pem`
- `./private-key.pem`

Hint: you can create both keys from this command `openssl req -nodes -new -x509 -keyout private-key.pem -out public-key.pem`
