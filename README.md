# To-do CLI

A dependency-free task manager for Node.js 22 or later.

```sh
npm start -- add "Buy groceries"
npm start -- list
npm start -- done 1
npm start -- remove 1
npm start -- help
```

Tasks persist in `.todo.json` in the current working directory. Each task has a
numeric ID; completed tasks appear with `[x]` when listed.

Run `npm test` to verify the CLI.
