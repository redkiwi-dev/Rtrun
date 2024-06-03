#!/usr/bin/env node
import fs from "fs";
import { program } from "commander";
import ora from "ora";
import { exec, spawn } from "child_process";
import { exit } from "process";

program.name("taskw").description("Powerful task runner").version("0.2.0");

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

async function executeCommand(command: string, arg: string, config: Config) {
  const start = ora(`Executing (${arg}): ${command} \n`);
  if (!config.ignore) {
    start.start();
  }
  const taskArr: string[] = command.split(" ");
  const first: string = taskArr[0];
  const cmd_args: string[] = taskArr.slice(1);

  await checkCommandAvailability(first).catch((cmd) => {
    if (!config.ignore) {
      start.fail(`command \x1b[31m${first}\x1b[0m not found`);
      start.stop();
    }
    exit(0);
  });

  const esbuildProcess = spawn(
    first,
    cmd_args.filter((a) => a.trim())
  );

  esbuildProcess.stdout.on("data", (data) => {
    !config.silent && console.log(config.ignore ? "" : "\n", data.toString());
  });

  esbuildProcess.stderr.on("data", (data) => {
    !config.silent && console.log(config.ignore ? "" : "\n", data.toString());
  });

  esbuildProcess.on("close", (code) => {
    if (code !== 0) {
      !config.ignore && start.fail("Failed");
    } else {
      !config.ignore && start.succeed("Successfully executed");
    }
    start.stop();
  });
}

interface Config {
  silent: boolean;
  ignore: boolean;
}

program
  .argument("<task>", "run the task")
  .option("-s, --silent", "silence output message")
  .option("-i, --ignore", "ignore tasksw messages")
  .action(async (arg, flags) => {
    const config: Config = {
      silent: !!flags.silent,
      ignore: !!flags.ignore,
    };

    try {
      const tasks: string[] = await getTasks();
      if (!tasks[arg]) {
        console.log(`invalid task: ${arg}`);
        return;
      }

      if (tasks[arg].includes(";")) {
        const commands = tasks[arg]
          .split(";")
          .map((cmd) => cmd.trimEnd().trimStart());

        commands.reverse().forEach(async (cmd) => {
          await executeCommand(cmd, arg, config);
        });
      } else {
        await executeCommand(tasks[arg], arg, config);
      }
    } catch (error) {
      console.error(error);
    }
  });

program.parse();
