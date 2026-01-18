This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

## Deploy to GitHub Pages

This project is configured for static export and can be deployed to GitHub Pages automatically.

### Setup Instructions:

1. **Push your code to GitHub:**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
   git push -u origin main
   ```

2. **Enable GitHub Pages:**
   - Go to your repository on GitHub
   - Click **Settings** → **Pages**
   - Under **Source**, select **GitHub Actions**
   - The workflow will automatically deploy on every push to `main`

3. **Configure basePath (if needed):**
   - If deploying to `username.github.io/repo-name` (subdirectory), update `next.config.ts`:
     ```typescript
     const nextConfig: NextConfig = {
       output: 'export',
       basePath: '/repo-name',  // Replace with your actual repo name
       images: {
         unoptimized: true,
       },
     };
     ```
   - If deploying to `username.github.io` (root domain), no basePath is needed (current config is correct)

4. **Your site will be available at:**
   - `https://YOUR_USERNAME.github.io/YOUR_REPO_NAME` (if using subdirectory)
   - `https://YOUR_USERNAME.github.io` (if using root domain)

The GitHub Actions workflow (`.github/workflows/deploy.yml`) will automatically build and deploy your site on every push to the `main` branch.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!
