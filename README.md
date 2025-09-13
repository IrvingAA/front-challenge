# front-challenge (Quasar template)

One command to start the project:

```bash
# Development (recommended): runs Quasar dev inside a container and exposes it on http://localhost:3000
docker compose up --build dev

# Production build + serve with nginx on http://localhost:3000
docker compose up --build web
```

Notes:

- The dev service mounts the project into the container and runs `quasar dev` (hot reload).
- The web service builds the app using Node 22 and serves the static output with nginx.
- If you prefer local dev without Docker, run `npm install` and `quasar dev` (requires Node >= 22).

```

```
