FROM node:12.20.0-alpine3.12

ARG DATE_CREATED
ARG VERSION

LABEL org.opencontainers.image.created=$DATE_CREATED
LABEL org.opencontainers.image.version=$VERSION
LABEL org.opencontainers.image.authors="blacky"
LABEL org.opencontainers.image.vendor="blacky"
LABEL org.opencontainers.image.title="Alina"
LABEL org.opencontainers.image.description="Alina a powerful Discord bot that includes Utility, Fun, Music, Moderation, and much more! (Beta) - brblacky/Alina"
LABEL org.opencontainers.image.source="https://github.com/brblacky/Alina"


WORKDIR /opt/app

COPY package*.json ./

RUN npm ci --only=prod

# These are added here as a way to define which env variables will be used.
ENV DISCORD_TOKEN ""
ENV MONGO_URI ""

COPY . .

VOLUME /opt/app/config.js

CMD ["npm", "start"]
