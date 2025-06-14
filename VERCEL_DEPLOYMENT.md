# Deploying to Vercel with Custom Domain

This guide will walk you through deploying your website to Vercel and configuring your custom domain (aligunes.dev).

## Deployment Steps

### 1. Create a Git Repository

First, push your code to a Git repository (GitHub, GitLab, or Bitbucket):

```bash
# Initialize Git repository (if not already done)
git init

# Add all files
git add .

# Commit the changes
git commit -m "Initial commit"

# Add your remote repository (replace with your actual repository URL)
git remote add origin <your-repository-url>

# Push to the repository
git push -u origin main
```

### 2. Deploy to Vercel

1. Sign up or log in to [Vercel](https://vercel.com/)
2. Click "New Project"
3. Import your Git repository
4. Configure the project:
   - Framework Preset: Other
   - Root Directory: ./
   - Build Command: npm run build
   - Output Directory: ./
5. Click "Deploy"

### 3. Configure Custom Domain (aligunes.dev)

1. Go to your project dashboard in Vercel
2. Navigate to "Settings" > "Domains"
3. Add your domain: `aligunes.dev`
4. Follow Vercel's instructions to configure your DNS settings:

#### Option 1: Using Vercel as your nameserver
   - Update your domain registrar to use Vercel's nameservers

#### Option 2: Adding DNS records at your current registrar
   - Add an A record pointing to Vercel's IP addresses
   - Add a CNAME record for the www subdomain

### 4. SSL/TLS Certificate

Vercel automatically provisions SSL certificates for your domain. Once DNS propagation is complete (can take up to 48 hours), your site will be available over HTTPS.

## Verifying Deployment

After deployment, your website should be accessible at both:
- https://aligunes.dev
- https://your-project-name.vercel.app

## Troubleshooting

If you encounter any issues:
1. Check DNS propagation using a tool like [dnschecker.org](https://dnschecker.org/)
2. Verify your DNS settings match Vercel's recommendations
3. Check the Vercel deployment logs for any errors 