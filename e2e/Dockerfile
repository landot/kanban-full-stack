FROM mcr.microsoft.com/playwright:v1.46.0-jammy

WORKDIR /app

COPY package.json .

RUN npm install

RUN npx playwright install --with-deps

COPY . .

CMD ["npm", "run", "e2e"]
