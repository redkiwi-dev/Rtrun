import { ChildProcessWithoutNullStreams } from "child_process";
import { Ora } from "ora";

export function cmdOutput(
  process: ChildProcessWithoutNullStreams,
  {
    isSilent = false,
    isBench = false,
    start,
    startTime,
  }: { isSilent?: boolean; isBench?: boolean; start?: Ora; startTime?: number }
) {
  const logHandler = (stream: NodeJS.ReadableStream) => {
    stream.on("data", (data) => {
      if (!isSilent) {
        console.log("\n", data.toString());
      }
    });
  };

  logHandler(process.stdout);
  logHandler(process.stderr);

  if (isBench) {
    process.on("close", (code) => {
      const endTime = performance.now();
      const duration = Math.round(endTime - startTime!);
      console.log(`${duration}ms`);
      console.log(".");
      if (code !== 0) {
        start!.fail("Failed");
      } else {
        start!.succeed("Successfully executed");
      }
      start!.stop();
    });
  }

  process.on("close", (code) => {
    if (code !== 0) {
      start?.fail("Failed");
    } else {
      start?.succeed("Successfully executed");
    }
    start?.stop();
  });
}
