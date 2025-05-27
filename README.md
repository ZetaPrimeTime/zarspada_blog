# Zarspada Blog

A modern blog platform built with Next.js 14, TypeScript, and PostgreSQL.

## Project Status

### Completed
- ✅ Next.js 14 project setup with TypeScript
- ✅ Tailwind CSS integration
- ✅ ESLint configuration
- ✅ Core dependencies installation:
  - @prisma/client
  - next-auth
  - next-seo
  - next-themes
  - @tinymce/tinymce-react
- ✅ Prisma initialization
- ✅ Theme customization (Dark/Light mode)
- ✅ Responsive design
- ✅ Search functionality
- ✅ Basic SEO optimization
- ✅ Social media integration
- ✅ GridGate authentication system
- ✅ Database setup and configuration

### In Progress
- 🔄 Blog post management system
- 🔄 Image upload and management
- 🔄 Session management and authentication persistence
- 🔄 Cloudinary integration for image storage

### Pending
- [ ] Comment system
- [ ] Rich text editor integration
- [ ] Deployment configuration

## Known Issues

### UI/UX
- Light/Dark mode icon functionality
  - Status: In Progress
  - Impact: Theme switching not working properly
  - Solution: Implement proper theme toggle with background color changes

### Authentication
- Session persistence for authenticated routes
  - Status: In Progress
  - Impact: Users cannot access protected routes like /posts/new and /posts/edit
  - Solution: Implement proper session management and token persistence

## Features Status

### Completed
- ✅ Dark/Light theme support
- ✅ Responsive design
- ✅ Search functionality
- ✅ Social media links
- ✅ Basic SEO setup
- ✅ GridGate authentication
- ✅ Database schema and migrations

### In Progress
- 🔄 Blog post management
- 🔄 Image handling
- 🔄 Session management

### Pending
- [ ] Rich text editor integration
- [ ] Comment system
- [ ] Advanced SEO features

## Getting Started

### Prerequisites
- Node.js 18.17 or later
- PostgreSQL database
- npm or yarn package manager

### Environment Setup

1. Create a `.env` file in the root directory with the following variables:
```env
# Database Configuration
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/zarspada_blog"

# NextAuth Configuration
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-secret-key-here" # Change this to a secure random string

# GridGate Authentication
ADMINUSER="your-admin-username"     # Username for GridGate authentication
GRIDGATEKEY="your-admin-password"   # Password for GridGate authentication

# Environment
NODE_ENV="development"
```

2. Update the database connection string in `.env` with your PostgreSQL credentials.
3. Set your desired GridGate authentication credentials (ADMINUSER and GRIDGATEKEY).

### Development

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

### Database Setup

1. Ensure PostgreSQL is running and create a new database:
```sql
CREATE DATABASE zarspada_blog;
```

2. Run Prisma migrations:
```bash
npx prisma migrate dev
```

3. Generate Prisma Client:
```bash
npx prisma generate
```

## Project Structure

```
src/
├── app/              # Next.js 14 app directory
├── components/       # React components
├── lib/             # Utility functions and configurations
├── styles/          # Global styles and Tailwind configuration
└── types/           # TypeScript type definitions
```

## Features

- [x] User authentication and authorization (GridGate)
- [ ] Blog post creation and management
- [ ] Rich text editor integration
- [ ] SEO optimization
- [ ] Dark/Light theme support
- [ ] Responsive design
- [ ] Image upload and management
- [ ] Comment system
- [ ] Search functionality

## Tech Stack

- Next.js 14
- TypeScript
- Tailwind CSS
- PostgreSQL
- Prisma ORM
- NextAuth.js
- TinyMCE
- Next SEO

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
