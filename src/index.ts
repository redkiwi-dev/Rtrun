#!/usr/bin/env node
import { program } from "commander";
import { initTasks } from "./initTasks";
import { runCommand } from "./runCmd";

const commands = {
  init: initTasks,
  run: async (task: string) => runCommand(task),
};

Object.entries(commands).forEach(([name, handler]) => {
  program
    .command(name)
    .description(`Run the "${name}" command`)
    .action(handler);
});

program.name("rtrun").description("Powerful task runner").version("1.2.0");

program.parse(process.argv);

if (!process.argv.slice(2).length) {
  program.help();
}
