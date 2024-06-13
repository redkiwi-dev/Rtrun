import { spawn } from "child_process";
import ora, { Ora } from "ora";
import { checkCommandAvailability } from "./helpers/checkCmdAvi";
import { cmdOutput } from "./helpers/cmdOut";
import { exit } from "process";
import { watch } from "fs";

export async function executeCommand(
  command: Task | string,
  arg: string
): Promise<void> {
  const start = ora(`Executing (${arg}): ${command}`).start();

  try {
    if (typeof command === "string") {
      await executeStringCommand(command, arg, start);
    } else if (typeof command === "object" && command.task) {
      await executeObjectCommand(command as TaskOptions, start);
    } else {
      throw new Error("Invalid command type");
    }
  } catch (error) {
    start.fail(`Error executing command: ${error.message}`);
    start.stop();
    exit(1);
  } finally {
    start.stop();
  }
}

async function executeStringCommand(command: string, arg: string, start: Ora) {
  const taskArr: string[] = command.split(" ");
  const first: string = taskArr[0];
  const cmd_args: string[] = taskArr.slice(1);

  await checkCommandAvailability(first).catch((err) => {
    start.fail(`command \x1b[31m${first}\x1b[0m not found: \n ${err}`);
    exit(1);
  });

  const esbuildProcess = spawn(
    first,
    cmd_args.filter((a) => a.trim())
  );
  cmdOutput(esbuildProcess, {});
}

async function executeObjectCommand(options: TaskOptions, start: Ora) {
  const { task, silent, directory, watch: Watch, bench, interval } = options;

  await checkCommandAvailability(task).catch((err) => {
    start.fail(`command \x1b[31m${task}\x1b[0m not found: \n ${err}`);
    exit(1);
  });

  const esbuildProcess = spawn(task, [], { cwd: directory });

  if (typeof interval === "number" && interval) {
    setTimeout(() => {
      cmdOutput(esbuildProcess, {
        isSilent: silent,
        isBench: bench,
        start,
        startTime: Date.now(),
      });
    }, interval);
  } else {
    cmdOutput(esbuildProcess, {
      isSilent: silent,
      isBench: bench,
      start,
      startTime: Date.now(),
    });
  }

  if (Watch) {
    const watchDirectory = directory ? directory : process.cwd();
    watch(watchDirectory, { recursive: true }, (eventType, filename) => {
      console.log(`${filename} was ${eventType}.`);
      esbuildProcess.kill();
      executeObjectCommand({ ...options, task }, start);
    }).on("error", (err) => {
      console.error(`Error watching ${directory}:`, err);
    });
  }
}
