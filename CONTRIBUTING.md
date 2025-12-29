# Contributing

First off, thank you for considering contributing! It is people like you who make this a great tool for the community.

## Forking the Repository

To contribute to `create-stencils-components`, you need to fork the repository and clone it locally.  Follow these steps:

1. Go to the GitHub page for `create-stencils-components`.
2. Click the "Fork" button in the upper right corner of the page.
3. Once the repository is forked to your account, clone it to your local machine using:

   ```bash
   git clone https://github.com/your-username/create-stencils-components.git
   cd create-stencils-components
   npm install
   ```

4. **Build the Project**: Build the project to ensure everything is set up correctly:

   ```bash
   npm run build
   ```

## Making Changes

1. **Create a New Branch**: Before making any changes, create a new branch for your feature or bug fix:

   ```bash
   git checkout -b feature/your-feature-name
   ```

   or

   ```bash
   git checkout -b bugfix/your-bug-fix-name
   ```

2. **Implement Your Changes**: Make your desired changes to the codebase.

3. **Test Your Changes**: If you're adding new features or fixing bugs, please add appropriate tests to cover your changes. You can run tests using:

   ```bash
   npm test
   ```

4. **Lint Your Code**: Ensure your code adheres to the project's coding standards by running the linter:

   ```bash
   npm run lint
   ```

## Submitting a Pull Request

Once you've made and tested your changes, you can submit a pull request:

1. **Commit Your Changes**: Commit your changes with a clear and descriptive commit message:

   ```bash
   git commit -m "feat: Add new amazing feature"
   ```

   or

   ```bash
   git commit -m "fix: Resolve critical bug"
   ```

2. **Push to Your Fork**: Push your changes to your forked repository on GitHub:

   ```bash
   git push origin feature/your-feature-name
    ```
