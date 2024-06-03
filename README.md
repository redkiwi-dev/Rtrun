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

for the full list of commands, enter:

```sh
taskw --help
```

## examples

### running normal task

```json
// tasks.json
{
  "hello": "echo \"hello\""
}
```

```sh
tasksw hello
```

```sh
# output
⠋ Executing (hello): echo "hello"

 "hello"

✔ Successfully executed
```

### running sequental tasks

```json
// tasks.json
{
  "hello": "echo \"hello\" ; echo \"world\""
}
```

```sh
tasksw hello
```

```sh
# output
⠋ Executing (hello): echo "world"
⠋ Executing (hello): echo "hello"

 "hello"
✔ Successfully executed

 "world"
✔ Successfully executed
```

To ignore `tasksw` messages you could use `--ignore` flag:

```sh
tasksw hello -i
```

```sh
# output
 "hello"

 "world"
```
