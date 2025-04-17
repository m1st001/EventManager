# EventManager Frontend Development Guidelines

This document provides specific information for developers working on the EventManager frontend project.

## Build and Configuration

### Prerequisites
- Node.js (latest LTS version recommended)
- npm (comes with Node.js)

### Environment Setup
The project uses environment variables for configuration:
- `.env.development` - Configuration for development environment
- `.env.production` - Configuration for production environment

Key environment variables:
- `VITE_API_URL` - The URL of the backend API

### Development Server
```bash
# Install dependencies
npm install

# Start development server
npm run dev
# or
npm start
```

The development server will be available at http://localhost:5173 by default.

### Building for Production
```bash
# Build the project
npm run build
```

The build output will be in the `dist` directory, configured with a base URL of `/EventManager/`.

### API Client Generation
The project uses Swagger to generate TypeScript API clients:

```bash
# Generate API clients from Swagger
npm run swaggergen
```

This command generates TypeScript API clients in the `src/api` directory based on the Swagger documentation at `http://localhost:5237/swagger/v1/swagger.json`.

## Testing

### Testing Framework
The project uses Vitest as the testing framework, along with React Testing Library for component testing.

### Running Tests
```bash
# Run tests once
npm test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test:coverage
```

### Test Structure
- Tests are located alongside the components they test
- Test files use the naming convention `*.test.tsx` or `*.spec.tsx`
- The test setup is in `src/test/setup.ts`

### Writing Tests
Example of a simple component test:

```tsx
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import YourComponent from './YourComponent';

describe('YourComponent', () => {
  it('renders correctly', () => {
    render(<YourComponent />);
    expect(screen.getByText('Expected Text')).toBeInTheDocument();
  });
});
```

For components that depend on Redux, you'll need to wrap them in a provider:

```tsx
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import YourComponent from './YourComponent';
import yourReducer from '../store/slices/yourSlice';

describe('YourComponent with Redux', () => {
  it('renders with Redux state', () => {
    const store = configureStore({
      reducer: {
        yourFeature: yourReducer,
      },
    });

    render(
      <Provider store={store}>
        <YourComponent />
      </Provider>
    );
    
    expect(screen.getByText('Expected Text')).toBeInTheDocument();
  });
});
```

## Code Style and Development Practices

### TypeScript Configuration
The project uses TypeScript with strict type checking. The configuration is split into:
- `tsconfig.json` - References the app and node configurations
- `tsconfig.app.json` - Configuration for the application code
- `tsconfig.node.json` - Configuration for Node.js-specific code (like build scripts)

### ESLint Configuration
The project uses ESLint for code linting with the following configuration:
- TypeScript ESLint recommended rules
- React Hooks ESLint plugin
- React Refresh ESLint plugin

Run linting with:
```bash
npm run lint
```

### Project Structure
- `src/api` - API client code generated from Swagger
- `src/assets` - Static assets
- `src/components` - React components
- `src/pages` - Page-level components
- `src/store` - Redux store configuration, slices, and thunks
- `src/styles` - CSS or other styling files
- `src/test` - Test setup and utilities

### State Management
The project uses Redux Toolkit for state management:
- Store configuration is in `src/store/store.ts`
- Feature slices are in `src/store/slices/`
- Async thunks are in `src/store/thunks/`

### UI Components
The project uses Material UI for components and Tailwind CSS for styling.

### Form Handling
The project uses Formik for form handling and Yup for form validation.

### Date and Time Handling
The project uses Luxon and Day.js for date and time handling.