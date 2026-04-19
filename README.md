# Frontend

Frontend admin application for the customer help desk system.

## Stack

- Vite 8
- React 19
- TypeScript
- React Router 7
- TanStack Query
- Tailwind CSS 4
- Vitest

## Scripts

- `npm run dev`: start the Vite development server
- `npm run build`: type-check and build production assets
- `npm run preview`: preview the production build locally
- `npm run test`: run the Vitest suite
- `npm run coverage`: run tests with coverage reporting

## Source Layout

- `src/App.tsx`: application providers and route tree
- `src/pages`: route-level screens
- `src/components`: shared UI and layout components
- `src/auth`: authentication context and route protection
- `src/hooks`: React Query and UI hooks
- `src/services`: API client wrappers for backend resources
- `src/lib`: shared utilities, HTTP client, and navigation config
- `src/types`: DTO and shared TypeScript contracts
- `src/tests/services`: service-layer unit tests

## Conventions

- Use the `@` alias for imports from `src`
- Keep API calls in `src/services`, not inside components
- Keep route screens in `src/pages` and shared UI in `src/components`
- Add or update service tests in `src/tests/services`

## Development Notes

- API requests are proxied through Vite via `/api` during local development
- Theme handling is provided by `next-themes`
- The app shell is built around a protected layout with sidebar navigation

## Testing

Service tests use Vitest with mocked `httpClient` calls. When adding a new backend resource, keep the matching test beside the other service tests in `src/tests/services`.
