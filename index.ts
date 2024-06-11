#!/usr/bin/env node
import fs from "fs";
import { program } from "commander";
import ora from "ora";
import { exec, spawn } from "child_process";
import { exit } from "process";

program.name("rtrun").description("Powerful task runner").version("1.0.0");

async function getTasks(): Promise<any> {
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

const checkCommandAvailability = async (command: string): Promise<boolean> => {
  return new Promise((resolve, reject) => {
    exec(`which ${command}`, (error, stdout, stderr) => {
      if (error || stderr) {
        reject(false);
      } else {
        resolve(true);
      }
    });
  });
};

async function executeCommand(command: Task, arg: string) {
  const start = ora(
    `Executing (${arg}): ${
      typeof command === "string"
        ? command
        : Array.isArray(command)
        ? command[0]
        : command.task
    } \n`
  );
  start.start();

  if (typeof command === "string") {
    const taskArr: string[] = command.split(" ");
    const first: string = taskArr[0];
    const cmd_args: string[] = taskArr.slice(1);

    await checkCommandAvailability(first).catch((err) => {
      start.fail(`command \x1b[31m${first}\x1b[0m not found: \n ${err}`);
      start.stop();

      exit(0);
    });

    const esbuildProcess = spawn(
      first,
      cmd_args.filter((a) => a.trim())
    );
    esbuildProcess.stdout.on("data", (data) => {
      console.log("\n", data.toString());
    });

    esbuildProcess.stderr.on("data", (data) => {
      console.log("\n", data.toString());
    });

    esbuildProcess.on("close", (code) => {
      if (code !== 0) {
        start.fail("Failed");
      } else {
        start.succeed("Successfully executed");
      }
      start.stop();
    });
  } else if (Array.isArray(command)) {
    // TODO: add concurrent execution for each item
    command.forEach((cmd) => executeCommand(cmd, arg));
  } else if (typeof command === "object" && !!command.task) {
    const options: TaskOptions = {
      task: command.task,
      silent: command.silent || false,
      directory: command.directory || process.cwd(),
      watch: command.watch || false,
      bench: command.bench || false,
      // condition: command.condition || null,
      // allowConditions: command.allowConditions || true,
      // interval: command.interval || null,
    };

    const taskArr: string[] = options.task.split(" ");
    const first: string = taskArr[0];
    const cmd_args: string[] = taskArr.slice(1);

    await checkCommandAvailability(first).catch((err) => {
      start.fail(`command \x1b[31m${first}\x1b[0m not found: \n ${err}`);
      start.stop();

      exit(0);
    });

    function spawnProccesses() {
      const startTime = performance.now();
      const esbuildProcess = spawn(
        first,
        cmd_args.filter((a) => a.trim()),
        { cwd: options.directory }
      );

      if (!options.silent) {
        esbuildProcess.stdout.on("data", (data) => {
          console.log("\n", data.toString());
        });

        esbuildProcess.stderr.on("data", (data) => {
          console.log("\n", data.toString());
        });
      }

      esbuildProcess.on("close", (code) => {
        const endTime = performance.now();
        const duration = Math.round(endTime - startTime);
        options.bench && console.log(`${duration}ms`);
        console.log(".");
        if (code !== 0) {
          start.fail("Failed");
        } else {
          start.succeed("Successfully executed");
        }
        start.stop();
      });
    }

    if (options.watch === true) {
      const watchDirectory = process.cwd();

      console.log(`Watching ${watchDirectory} for changes...`);

      fs.watch(watchDirectory, { recursive: true }, (eventType, filename) => {
        console.log(`${filename} was ${eventType}.`);
        spawnProccesses();
      }).on("error", (err) => {
        console.error(`Error watching ${watchDirectory}:`, err);
      });
    } else {
      spawnProccesses();
    }
  } else {
    console.error("invalid task type");
    return;
  }
}

async function initTasks() {
  const taskData = {
    hi: 'echo "hi"',
    hello: {
      task: 'echo "hello"',
      silent: false,
      directory: ".",
      watch: false,
      bench: false,
    },
  };

  fs.writeFile("./tasks.json", JSON.stringify(taskData, null, 2), (err) => {
    if (err) {
      console.error("error creating tasks.json:", err);
    } else {
      console.log("tasks.json created successfully.");
    }
  });
}

program.argument("<task>", "run the task").action(async (arg) => {
  if (arg === "init") {
    initTasks();
  } else {
    try {
      const tasks: Task[] = await getTasks();
      if (!tasks[arg]) {
        console.log(`invalid task: ${arg}`);
        return;
      }
      await executeCommand(tasks[arg], arg);
    } catch (error) {
      console.error(error);
    }
  }
});

program.parse();
