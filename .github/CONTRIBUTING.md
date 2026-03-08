# Contributing to nuxt-feather-icons

Thank you for your interest in contributing to **nuxt-feather-icons**! 🙌  
Before submitting Pull Requests, please read this guide to contribute effectively.

---

## How to Contribute

There are several ways to contribute to the project:

1. **Report Bugs**  
   If you encounter a bug, open an **Issue** describing:
    - Expected behavior
    - Actual behavior
    - Steps to reproduce the issue
    - Logs or screenshots, if applicable

2. **Request Features**  
   If you have an idea to improve the library, open an **Issue** detailing:
    - The problem you want to solve
    - How the new feature would help
    - Usage examples, if possible

3. **Submit Pull Requests**  
   Follow these steps to contribute code:

   ### Step 1: Fork and Clone
   ```bash
   git clone https://github.com/your-username/nuxt-feather-icons.git
   cd nuxt-feather-icons
   ```

### Step 2: Install Dependencies

```bash
pnpm install
```

### Step 3: Create a Branch

Always create a branch from main:

```bash
git checkout -b my-feature
```

### Step 4: Make Changes

Follow the project’s coding standards (TypeScript + Vue 3 + Nuxt )

Use PascalCase for component names

Keep file names and imports consistent

### Step 5: Test

Run tests with Vitest:

```bash
pnpm test
```

Make sure all tests pass before submitting a PR.

### Step 6: Commit

Use Conventional Commits:

```text
feat(HomeIcon): add support for dynamic props
fix(HomeIcon): fix rendering when class changes
docs: update README with usage instructions
```

- feat → new feature
- fix → bug fix
- docs → documentation
- chore → maintenance tasks

### Step 7: Pull Request

- Open the PR against the main branch of the main repository
- Describe your changes in detail
- Reference related issues, if any

---

## Coding Standards

Language: TypeScript

- Framework: Nuxt + Vue 3
- Formatting: Prettier + ESLint
- Icon Imports: Always use PascalCase and the prefix defined in runtime config

Example:

```typescript[vuejs]
<template>
  <HomeIcon class="w-6 h-6 text-gray-600" />
</template>
```

## Testing

- All components should have unit tests with Vitest
- Snapshot tests are recommended for SVGs

To run tests:
```bash
pnpm test
```

## Clean Code & Review

- Avoid complex functions inside Vue templates
- Prefer composables for reusable logic
- Comment complex code to make reviews easier