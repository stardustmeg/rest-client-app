module.exports = {
  errorMsg: 'Please use correct branch name',
  pattern: /^(ci|chore|docs|feat|fix|perf|refactor|style|test)\/\d+\.\d+\/[a-z-]+\/[a-z-]+$/,
};

// Branch Name Examples:
// "feat/1.0/custom-scope/add-login-form"
// "fix/2.3/main-scope/fix-login-form"

// more info here https://www.conventionalcommits.org/en/v1.0.0/

// ci: Changes to our CI configuration files and scripts (example scopes: Travis, Circle, BrowserStack, SauceLabs)
// chore: Changes that affect the build system or external dependencies (example scopes: gulp, broccoli, npm)
// docs: Documentation only changes
// feat: A new feature
// fix: A bug fix
// perf: A code change that improves performance
// refactor: A code change that neither fixes a bug nor adds a feature
// style: Changes that do not affect the meaning of the code (white-space, formatting, missing semi-colons, etc)
// test: Adding missing tests or correcting existing tests
