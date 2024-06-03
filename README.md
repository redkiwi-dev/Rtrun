# Tasksw

**Tasksw** is a task runner, design to simplify running simple and orchestrated tasks.

## installation

```sh
npm install tasksw -g
```

## getting started

After the installation, describe your tasks inside `tasks.json`:

```json
{
  "dev": "node dev.js",
  "hello": "echo \"hello\""
}
```

To run a task, enter:

```sh
tasksw hello
```
# tasksw
