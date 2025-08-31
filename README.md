# REST Client ⚡

## General Overview 🌐

Welcome to **REST Client**, a lightweight, modern alternative to Postman — designed to help developers explore, test, and analyze RESTful APIs with ease.
Think of it as a sleek and minimal API testing tool built right into your browser.

With REST Client, you can:

* Build and send HTTP requests effortlessly.
* Inspect responses in a clean, structured UI.
* Store and manage variables for flexible requests.
* Keep track of your API history and analytics.
* Authenticate securely and manage your own workspace.

This project is part of the **[RS School React course](https://rs.school/courses/reactjs)**.

## Our Mission 🎯

The mission of REST Client is to make working with APIs simple, accessible, and enjoyable. Instead of relying on heavy desktop apps, our client runs in the browser, offering a **streamlined developer experience** while still covering all essential features like authentication, history tracking, analytics, and generated code snippets.

Whether you’re debugging, learning APIs, or building full-stack apps, REST Client will be your lightweight companion.

## Key Features 🗝️

* 🔐 **Authentication & Authorization** – Secure access with Firebase/Supabase/Convex (email & password).
* 📝 **RESTful Client** – Method selector, URL input, request body editor (JSON/Text), headers editor, and response viewer
* 📜 **Generated Code** – Instantly generate `curl`, `JavaScript`, `Python`, `Java`, `C#`, and `Go` snippets.
* 📊 **History & Analytics** – View request logs with latency, status codes, sizes, timestamps, and error details.
* 💾 **Variables** – Store and inject variables (`{{variableName}}`) into URLs, headers, and request bodies.
* 🌍 **Internationalization (i18n)** – At least 2 languages supported with a language switcher in the header.
* 🎨 **Modern UI/UX** – Smooth animations, sticky header, responsive design, Chakra UI + Tailwind for styling.
* 🧩 **Error Handling** – Clear and user-friendly error messages (network issues vs HTTP response codes).

## Technical Stack 💻

*in our project we used the following technologies:*

[![Next][Next]][Next-url]
[![React][React]][React-url]
[![TypeScript][TypeScript]][TypeScript-url]
[![Chakra UI][Chakra]][Chakra-url]
[![TailwindCSS][Tailwind]][Tailwind-url]
[![Convex][Convex]][Convex-url]
[![Biome][Biome]][Biome-url]
[![Husky][Husky]][Husky-url]
[![Vitest][Vitest]][Vitest-url]
[![React Testing Library][RTL]][RTL-url]

## Available Scripts 📑

### Using **Bun**

```sh
bun run dev                # Start the development server.
bun run build              # Build the production-ready app.
bun run start              # Preview the production build locally.
bun run lint               # Run Biome linter check.
bun run lint:fix           # Run Biome linter fix.
bun run format             # Run Biome formatter check.
bun run format:fix         # Run Biome formatter fix.
bun run biome:ci           # Run Biome linter and formatter checks.
bun run biome              # Run Biome linter and formatter fixes.
bun run test               # Run Vitest tests in watch mode.
bun run coverage           # Run Vitest tests with coverage report.
bun run typecheck          # Run TypeScript type check.
bun run prepare            # Setup Husky hooks.
```

### Using **npm**

```sh
npm run dev                # Start the development server.
npm run build              # Build the production-ready app.
npm run start              # Preview the production build locally.
npm run lint               # Run Biome linter check.
npm run lint:fix           # Run Biome linter fix.
npm run format             # Run Biome formatter check.
npm run format:fix         # Run Biome formatter fix.
npm run biome:ci           # Run Biome linter and formatter checks.
npm run biome              # Run Biome linter and formatter fixes.
npm run test               # Run Vitest tests in watch mode.
npm run coverage           # Run Vitest tests with coverage report.
npm run typecheck          # Run TypeScript type check.
npm run prepare            # Setup Husky hooks.
```

## Contact us 📩

* 🪼 **Team Lead**: [Margarita Golubeva](https://github.com/stardustmeg)
* 🐡 **Developer**: [Mikhail Zubenko](https://github.com/ripetchor)
* 🐟 **Developer**: [Daria Melnikova](https://github.com/zagorky)

---

<!-- Tech stack links -->

[React]: https://img.shields.io/badge/react-61DAFB.svg?style=for-the-badge&logo=react&logoColor=white&logoSize=large
[React-url]: https://react.dev/
[TypeScript]: https://img.shields.io/badge/TypeScript-3178C6.svg?style=for-the-badge&logo=typescript&logoColor=white
[TypeScript-url]: https://www.typescriptlang.org/
[Next]: https://img.shields.io/badge/next_js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white
[Next-url]: https://next.com/
[Tailwind]: https://img.shields.io/badge/tailwindcss-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white
[Tailwind-url]: https://tailwindcss.com/
[Chakra]: https://img.shields.io/badge/chakra_ui-319795?style=for-the-badge&logo=chakraui&logoColor=white
[Chakra-url]: https://chakra-ui.com/
[Convex]: https://img.shields.io/badge/convex-FF6B6B?style=for-the-badge&logo=databricks&logoColor=white
[Convex-url]: https://convex.dev/
[Biome]: https://img.shields.io/badge/biome-60A5FA?style=for-the-badge&logo=biome&logoColor=white
[Biome-url]: https://biomejs.dev/
[Husky]: https://img.shields.io/badge/Husky-F05032?style=for-the-badge&logo=furrynetwork&logoColor=white
[Husky-url]: https://typicode.github.io/husky/
[Vitest]: https://img.shields.io/badge/vitest-6E9F18?style=for-the-badge&logo=vitest&logoColor=white
[Vitest-url]: https://vitest.dev/
[RTL]: https://img.shields.io/badge/react_testing_library-E33332.svg?style=for-the-badge&logo=testinglibrary&logoColor=white
[RTL-url]: https://testing-library.com/docs/react-testing-library/intro/
