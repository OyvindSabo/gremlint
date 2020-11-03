![Gremlint Github Header 1920x1024](https://user-images.githubusercontent.com/25663729/88488788-d5a73700-cf8f-11ea-9adb-03d62c77c1b7.png)

### What is Gremlint?

Gremlint is a code formatter which parses Gremlin queries and rewrites them to adhere to certain styling rules. It does so by parsing the query to an abstract syntax tree, and reprinting it from scratch.

### But why?

- To make Gremlin queries more readable
- To make your queries more beautiful
- To act as a "living" style guide

### How do I use it?

The easiest way to use Gremlint is via the official website (https://gremlint.com). It can also be installed as a package.
![Gremlint V2 Screenshot](https://user-images.githubusercontent.com/25663729/88488518-f078ac00-cf8d-11ea-9e1c-01edec285751.png)

## For developers

### Run linter

`npm run lint`

### Format source files

`npm run format`

### Run tests

`npm test`

### Compile the TypeScript source code

`npm run build`

### Bump version

`npm version [major | minor | patch]`
