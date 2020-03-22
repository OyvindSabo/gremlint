![Gremlint logo 1920x360.png](https://cdn.steemitimages.com/DQmVTNMgZkxa2wxJVVLr4yihneNkB9amcYyoH4fVdXdZ3vm/Gremlint%20logo%201920x360.png)

### What is Gremlint?

Gremlint is a code formatter which parses Gremlin queries and rewrites them to adhere to certain styling rules.

### But why?

- To make Gremlin queries more readable
- To make your queries more beautiful
- Because I have never found a good Gremlin style guide

### How do I use it?

The easiest way to use Gremlint is via the official website (https://gremlint.com). Since Gremlint is just a standalone HTML document, you can easily download it and run it locally if you wish.
![Gremlint.png](https://cdn.steemitimages.com/DQmWnS7cztfduGmCWWMyjfGmMzmdAtmR2w3rmBggfdVAenE/Gremlint.png)

### Build single HTML file

```
$ node build
```

## For developers

### Compile to single HTML file

The compiled HTML file will end up in `dist/index.html`.

```
node build
```

### Continuously compile to single HTML file while editing

The compiled HTML file will end up in `dist/index.html`.

```
node watch
```

### Run an individual file

```
$ node run src/someFile.js
```

### Run tests

```
$ node test
```
