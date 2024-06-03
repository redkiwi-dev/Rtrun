#!/usr/bin/env node
import fs from "fs";
import { program } from "commander";
import ora from "ora";
import { spawn } from "child_process";
program.name("taskw").description("Powerful task runner").version("0.1.0");
async function getTasks() {
  return new Promise((resolve, reject) => {
    fs.readFile("./tasks.json", "utf8", (err, data) => {
      if (!fs.existsSync("./tasks.json")) {
        console.log("task file not found");
        reject(new Error("Task file not found"));
      }
      if (err) {
        console.error("error reading task.json:", err);
        reject(err);
      } else {
        resolve(JSON.parse(data));
      }
    });
  });
}
program.argument("<task>", "run the task").action(async (arg) => {
  try {
    const tasks = await getTasks();
    if (!tasks[arg]) {
      console.error(`Invalid task: ${arg}`);
      return;
    }
    const start = ora(`Executing (${arg}): ${tasks[arg]}`).start();
    const taskArr = tasks[arg].split(" ");
    const first = taskArr[0];
    const cmd_args = taskArr.slice(1);
    const esbuildProcess = spawn(
      first,
      cmd_args.filter((a) => a.trim())
    );
    esbuildProcess.stdout.on("data", (data) => {
      console.log(data.toString());
    });
    esbuildProcess.stderr.on("data", (data) => {
      console.log("\n\n", data.toString());
    });
    esbuildProcess.on("close", (code) => {
      if (code !== 0) {
        start.fail("Failed");
      } else {
        start.succeed("Successfully executed");
      }
      start.stop();
    });
  } catch (error) {
    console.error(error);
  }
});
program.parse();
