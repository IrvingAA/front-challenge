### Build stage
FROM node:22-alpine AS builder
WORKDIR /app
COPY package.json package-lock.json* ./
# Install deps but ignore lifecycle scripts; we'll run project scripts after copying full source
RUN if [ -f package-lock.json ]; then npm ci --ignore-scripts; else npm install --ignore-scripts; fi
COPY . .
# Run postinstall / quasar prepare and then build
RUN npm run postinstall || true
RUN npm run build

### Production stage
FROM nginx:stable-alpine
COPY --from=builder /app/dist/spa /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
