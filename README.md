<!--
Licensed to the Apache Software Foundation (ASF) under one
or more contributor license agreements.  See the NOTICE file
distributed with this work for additional information
regarding copyright ownership.  The ASF licenses this file
to you under the Apache License, Version 2.0 (the
"License"); you may not use this file except in compliance
with the License.  You may obtain a copy of the License at

http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing,
software distributed under the License is distributed on an
"AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
KIND, either express or implied.  See the License for the
specific language governing permissions and limitations
under the License.
-->

![Gremlint Github Header 1920x1024](https://user-images.githubusercontent.com/25663729/88488788-d5a73700-cf8f-11ea-9adb-03d62c77c1b7.png)

### What is Gremlint?

Gremlint is a code formatter which parses Gremlin queries and rewrites them to adhere to certain styling rules. It does so by parsing the query to an abstract syntax tree, and reprinting it from scratch.

### But why?

- To make Gremlin queries more readable
- To make your queries more beautiful
- To act as a "living" style guide

### How do I use it?

The easiest way to use Gremlint is via the official website (https://gremlint.com). Since Gremlint is just a standalone HTML document, you can easily download it and run it locally if you wish (you can find it in `dist/index.html`).
![Gremlint V2 Screenshot](https://user-images.githubusercontent.com/25663729/88488518-f078ac00-cf8d-11ea-9e1c-01edec285751.png)

## For developers

### Compile to single HTML file

The compiled HTML file will end up in `dist/index.html`.

```
$ node build
```

### Continuously compile to single HTML file while editing

The compiled HTML file will end up in `dist/index.html`.

```
$ node watch
```

### Run an individual file

```
$ node run src/someFile.js
```

### Run tests

```
$ node test
```
