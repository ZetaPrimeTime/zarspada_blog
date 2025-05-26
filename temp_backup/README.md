# Zarspada Blog

A modern, responsive blog platform with dark/light mode support and a Tron-inspired design.

## Core Requirements

### Blog Features
- [x] Latest blog posts displayed first
- [x] Blog cards with:
  - Title
  - Content preview
  - Timestamp
  - Rounded corners
  - Background image support
- [x] Article page for full blog content
- [x] Responsive design (desktop/mobile)
- [x] Dark/Light mode support
  - Light mode: White background, black text
  - Dark mode: Black background, light blue neon text (#10d0ef)
  - Dark mode card glow effect
  - Smooth transition between modes (300ms)

### Admin Features
- [x] Protected admin interface for single author
- [x] Rich text editor for content creation
- [x] Image upload functionality
- [x] Post preview before publishing
- [x] Draft saving functionality
- [x] Edit existing posts
- [x] Secure login system

### Technical Requirements
- [x] Next.js frontend
- [x] PostgreSQL database
- [x] Hostinger compatibility
- [x] Orbitron font throughout the site
- [x] SEO Optimization
  - Meta tags implementation
  - Open Graph tags for social media sharing
  - Structured data for better search results

### Analytics Options
- [x] Google Analytics 4
- [x] Plausible Analytics (privacy-focused)
- [x] Umami (open-source, self-hosted)
- [x] Fathom Analytics (privacy-focused)

## Questions for Clarification

1. **Performance:**
   - What's the expected number of blog posts?
   - Do you need pagination or infinite scroll for the blog list?

2. **Analytics:**
   - Which analytics tool would you prefer to implement?
   - Should we track specific user interactions beyond page views?

## Technical Stack (Proposed)

- **Frontend:**
  - Next.js 14
  - TypeScript
  - Tailwind CSS
  - Prisma (for database ORM)
  - PostgreSQL (database)
  - Rich Text Editor (TinyMCE or CKEditor)
  - NextAuth.js (for admin authentication)
  - next-seo (for SEO optimization)
  - next-themes (for theme management)

- **Development Tools:**
  - ESLint
  - Prettier
  - Husky (for git hooks)

## Deployment Considerations

- Hostinger Node.js environment setup
- PostgreSQL database configuration
- Environment variables management
- Build and deployment process

## Next Steps

1. Set up project structure
2. Implement basic layout and theme switching
3. Create blog card component
4. Set up database schema
5. Implement blog listing and article pages
6. Add responsive design features
7. Implement dark/light mode with smooth transitions
8. Create admin interface with authentication
9. Add SEO optimization and Open Graph tags
10. Integrate chosen analytics tool
11. Add testing functionality
12. Deploy to Hostinger

Please provide feedback on the remaining questions above and any additional requirements or modifications needed. 