# Stage 2: Production image
FROM node:22-alpine AS runner
WORKDIR /app

COPY --from=builder /app/package*.json ./
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/next.config.js ./next.config.js

ENV NODE_ENV=production
ENV MONGO_URI="mongodb+srv://sheelukushwaha7:jempc4Orfcm7QL0N@clustersk.oyuxzux.mongodb.net/nimbus"
ENV PORT=3000

EXPOSE 3000
CMD ["npm", "start"]