import { writeFile } from "fs/promises";

export async function initTasks() {
  const taskData = {
    hi: 'echo "hi"',
    hello: {
      task: 'echo "hello"',
      silent: false,
      directory: ".",
      watch: false,
      bench: false,
      interval: null,
    },
  };

  try {
    await writeFile("./tasks.json", JSON.stringify(taskData, null, 2));
    console.log("tasks.json created successfully.");
  } catch (err) {
    console.error("Failed to create tasks.json:", err);
  }
}
