// index.test.ts
import { parseOrg } from "../src/index";
import { readFile } from "fs/promises";
import { join } from "path";

async function main() {
  const filePath = join(__dirname, "daily.org");
  const content = await readFile(filePath, "utf-8");

  console.log(JSON.stringify(parseOrg(content), null, 2));
}

main();
