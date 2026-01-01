# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Persian (Farsi) personal blog and portfolio site built with Next.js 15, featuring MDX blog posts and interactive multiplayer games (Avalon, Dowr, Spy). The entire UI is right-to-left (RTL) with Persian text.

## Development Commands

```bash
# Development server (runs on port 3002)
npm run dev

# Build for production
npm build

# Start production server
npm start

# Lint code
npm run lint

# Open Prisma Studio (database GUI)
npm run db:studio

# Generate Prisma client (runs automatically on npm install)
npx prisma generate

# Create and apply database migrations
npx prisma migrate dev --name <migration-name>

# Reset database (WARNING: deletes all data)
npx prisma migrate reset
```

## Architecture

### Framework & Routing
- **Next.js 15.1.6** with App Router
- **TypeScript 5** with strict mode
- File-based routing with route groups and dynamic routes
- Uses `@/*` path alias for imports (maps to `./src/*`)

### Key Directories

**src/app/** - Next.js App Router pages and API routes
- **(home)/** - Route group for landing page
- **auth/** - Login and sign-up pages
- **blog/** - MDX blog listing and `[slug]` dynamic routes
- **games/** - Avalon, Dowr, Spy games with React Query provider
- **api/** - REST API routes (auth, games, utilities)

**src/components/** - Reusable UI components
- **ui/** - Shared components (Navbar, Alert, etc.)
- **error/** - Error handling components

**src/lib/** - Library code and utilities
- `prisma.ts` - Prisma client singleton (prevents multiple instances in dev)
- `reactQueryFunctions.ts` - React Query helpers (`serverCall`, `getRequest`)

**src/shared/** - Shared business logic
- `actions.ts` - Server actions (auth, user management)
- `menus.ts` - Navigation configuration
- `saltAndHashPassword.ts` - Password hashing utilities

**src/types/** - TypeScript type definitions
- `actions.d.ts` - `ActionResponse<T>` type for server actions
- `server.d.ts` - Server call types
- `markdown.d.ts` - Blog frontmatter types
- `menu.d.ts` - Menu types

**src/blog/** - MDX blog post files with frontmatter

### Component Organization Pattern
Collocated files are prefixed with underscore:
- `_components/` - Route-specific components
- `_actions/` - Route-specific server actions
- `_hooks/` - Route-specific custom hooks
- `_providers/` - Route-specific context providers
- `_types/` - Route-specific TypeScript types

### Database (Prisma + PostgreSQL)

**Schema location**: `prisma/schema.prisma`

**Models**:
- **NextAuth models**: User, Account, Session, VerificationToken, Authenticator
- **Game models**:
  - `SpyGameWordCategory` / `SpyGameWord` - For Spy game
  - `GameWordCategory` / `GameWord` - Generic game words with `Difficulty` enum (easy, medium, hard)

**Important**: Always run `npx prisma generate` after schema changes. The Prisma client is a global singleton in [src/lib/prisma.ts](src/lib/prisma.ts).

### Authentication (NextAuth.js v5 Beta)

**Config**: [src/auth.ts](src/auth.ts)

- JWT-based sessions with PrismaAdapter
- Credentials provider (username/password with bcryptjs)
- GitHub OAuth (configured but check implementation)
- Custom callbacks add `userId` to JWT and session
- Middleware: [src/middleware.ts](src/middleware.ts)

**Server actions**: [src/shared/actions.ts](src/shared/actions.ts)
- `signUp()` - User registration
- `credentialsLogin()` - Login with credentials
- `getUserByUsernameFromDb()` - User lookup

### Server Actions Pattern

Server actions return typed `ActionResponse<T>`:
```typescript
type ActionResponse<T = unknown> = {
  success: boolean;
  errors?: string[];
  data?: T;
};
```

**Best practices**:
- Mark functions with `"use server"`
- Validate inputs with Zod schemas
- Use `revalidatePath()` after mutations
- Handle errors gracefully with try/catch
- Return consistent ActionResponse format

**Example**: [src/app/games/settings/_actions/gameWord.ts](src/app/games/settings/_actions/gameWord.ts)

### React Query Integration

- QueryClientProvider in [src/app/games/layout.tsx](src/app/games/layout.tsx)
- DevTools enabled in development
- Helper functions:
  - `serverCall()` - Generic mutation function for API calls
  - `getRequest()` - Query function using queryKey as URL path
- Used primarily in game features for real-time updates

### MDX Blog System

**Implementation**: Uses `next-mdx-remote`

**Blog listing**: [src/app/blog/page.tsx](src/app/blog/page.tsx)
- Reads all `.mdx` files from [src/blog/](src/blog/)
- Compiles frontmatter at build time
- Displays as grid with preview images

**Blog posts**: [src/app/blog/[slug]/page.tsx](src/app/blog/[slug]/page.tsx)
- Dynamic route based on filename
- Runtime MDX compilation

**Frontmatter schema** (see [src/types/markdown.d.ts](src/types/markdown.d.ts)):
```typescript
{
  title: string;
  date: string;
  tags?: BlogTags[];
  categories?: LearningCategory[];
  description: string;
  preview?: string;
  Auther?: string;
  AutherImg?: string;
}
```

### Game Features

**Avalon** ([src/app/games/avalon/](src/app/games/avalon/))
- Complex party game with roles (Merlin, Morgana, Percival, Assassin, etc.)
- State management via `AvalonProvider` context
- Game phases: choose-players → show-roles → in-game → guess-role → show-result
- Mission-based gameplay with voting mechanics

**Dowr** ([src/app/games/dowr/](src/app/games/dowr/))
- Word guessing game
- Uses `GameWord` database with difficulty levels
- State via `dowrGameProvider`
- Game steps: choose players → in game → show result

**Spy** ([src/app/games/spy/](src/app/games/spy/))
- Category and word management
- CRUD operations for spy game words
- Uses `SpyGameWordCategory` and `SpyGameWord` tables

**Game Settings** ([src/app/games/settings/](src/app/games/settings/))
- Centralized CRUD for game words and categories
- Server actions with Zod validation
- Supports difficulty levels (easy, medium, hard)

### Styling

- **Tailwind CSS 3.4.1** with custom theme
- **DaisyUI 4.12.23** component library
- **RTL layout** (`dir="rtl"` in root layout)
- **Vazirmatn font** for Persian text support
- Custom color palette defined in [tailwind.config.ts](tailwind.config.ts)

### Forms & Validation

- **React Hook Form 7.54.2** for form state
- **Zod 3.24.2** for schema validation
- Integration via `@hookform/resolvers`
- Consistent pattern across auth and game features

### Icons & Notifications

- **Lucide React** for icons
- **React Toastify 11.0.5** for toast notifications

## Important Notes

### Language & Localization
- All UI text is in Persian (Farsi)
- RTL layout is applied globally
- When adding new features, maintain Persian language consistency

### Environment Variables
Required in `.env`:
- `DATABASE_URL` - PostgreSQL connection string
- `DIRECT_URL` - Direct PostgreSQL connection (for Prisma migrations)
- `AUTH_SECRET` - NextAuth.js secret
- `GITHUB_CLIENT_ID` / `GITHUB_CLIENT_SECRET` - For GitHub OAuth (if enabled)

### ESLint Configuration
- Uses Next.js core-web-vitals and TypeScript presets
- Note: Some hooks have ESLint disabled (see recent commit history)

### Development Notes
- Server runs on port 3002 (not default 3000)
- Prisma client regenerates automatically on `npm install`
- Use Prisma Studio for visual database management

### Common Patterns

**API Route Structure**:
```typescript
export async function GET(request: NextRequest) {
  // Use checkIsAuthenticated for protected routes
  const response = await fetch(...);
  return NextResponse.json(data);
}
```

**Server Action Structure**:
```typescript
"use server";

export async function myAction(formData: FormData): Promise<ActionResponse<T>> {
  try {
    // Validate with Zod
    // Perform operation
    revalidatePath("/path");
    return { success: true, data: result };
  } catch (error) {
    return { success: false, errors: [error.message] };
  }
}
```

**Context Provider Pattern** (see game providers):
```typescript
type GameContextType = { /* state */ };
const GameContext = createContext<GameContextType | undefined>(undefined);

export const GameProvider = ({ children }) => {
  const [state, setState] = useState(/* initial */);
  return <GameContext.Provider value={/* value */}>{children}</GameContext.Provider>;
};

export const useGame = () => {
  const context = useContext(GameContext);
  if (!context) throw new Error("useGame must be used within GameProvider");
  return context;
};
```
