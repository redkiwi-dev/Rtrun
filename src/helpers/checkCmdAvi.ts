import { exec } from "child_process";

export const checkCommandAvailability = async (
  command: string
): Promise<boolean> => {
  return new Promise((resolve, reject) => {
    exec(`which ${command}`, (error, stdout, stderr) => {
      if (error || !stdout) {
        console.error(`Error checking command availability: ${error}`);
        console.error(`Stderr: ${stderr}`);
        reject(false);
      } else {
        resolve(true);
      }
    });
  });
};
