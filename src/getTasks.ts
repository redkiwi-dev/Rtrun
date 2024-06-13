import { existsSync, promises as fsPromises } from "fs";

export async function getTasks(): Promise<any> {
  if (!existsSync("./tasks.json")) {
    console.log("tasks.json file not found.");
    throw new Error("Task file not found");
  }

  try {
    const data = await fsPromises.readFile("./tasks.json", "utf8");
    return JSON.parse(data);
  } catch (err) {
    console.error("Error reading tasks.json:", err);
    throw err;
  }
}
