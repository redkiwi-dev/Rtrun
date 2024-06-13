import { executeCommand } from "./exeCmd";
import { getTasks } from "./getTasks";

export async function runCommand(arg: string): Promise<void> {
  try {
    const tasks: Record<string, Task> = await getTasks();
    if (!(arg in tasks)) {
      throw new Error(`Invalid task: ${arg}`);
    }
    await executeCommand(tasks[arg], arg);
  } catch (error) {
    console.error(`Error running command "${arg}":`, error);
    throw error;
  }
}
