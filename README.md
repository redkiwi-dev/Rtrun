# Rtrun

**Rtrun** is a task runner, design to simplify running simple and orchestrated tasks.

## installation

```sh
npm install rtrun -g
```

## getting started

Locate your tasks inside `tasks.json` file:

```json
{
  "hi": "echo \"hi\"",
  "hello": {
    "task": "echo \"hello\"",
    "silent": false,
    "directory": ".",
    "bench": true,
    "watch": false
  }
}
```

And then run `rtrun hi`:

```sh
⠋ Executing (hi): echo "hi"

 "hi"
✔ Successfully executed
```

## configuration

```json
{
  "cmd": "echo \"hi\"", // execute the task
  "acmd": {
    "task": "echo \"hi\"", // execute the task
    "silent": false, // display output
    "directory": ".", // task will be execute in the directory
    "watch": false, // listen to the changes
    "bench": false // benchmark the execution time
  },
  "bcmd": ["echo \"hi\"", "echo \"hello\""] // TODO: execute commands concurrently 
}
```
