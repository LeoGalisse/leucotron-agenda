## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Then, run the prisma studio:

```bash
npx prisma studio
```

And, run the docker file:

```bash
docker compose up
```

Set the following environment variables
```bash
DATABASE_URL="mysql://root:docker@localhost:3306/leucotron-agenda"

# Google OAuth
GOOGLE_CLIENT_ID=YOUR_CLIENT_ID
GOOGLE_CLIENT_SECRET=YOUR_CLIENT_SECRET
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.
