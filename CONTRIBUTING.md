# How to contribute

- You can send a pull request resolving an issue by following these rules:
  - Write everything in English.
  - Use the present tense imperative when writing commit messages.
  - Do TDD (Test-Driven Development) if possible (write a test, then implement, then refactor).
  - Follow this example workflow:

1. **Choose an Issue**: Select an issue from this repository.
2. **Create a Branch**: Create a new branch in your local repository to work on the task:

   ```bash
   git checkout -b add-form-validation
   ```

3. **Make Commits**: As you progress, make commits with messages referencing the issue:

   ```bash
   git commit -m "Add basic form validation #10"
   ```

4. **Complete the Task**: Once the task is finished, make a final commit that closes the issue:

   ```bash
   git commit -m "Complete form validation, closes #10"
   ```

5. **Run Unit Tests**: Run all unit tests to ensure nothing is broken.
6. **Create a Pull Request**: Create a pull request for your branch.
