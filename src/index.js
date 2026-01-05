// src/index.js

const fs = require("fs");
const path = require("path");
const { Command } = require("commander");
const { parseTasks } = require("./parseTasks");

const program = new Command();

program
  .name("notes2task")
  .description("Extract tasks from a Markdown note and export as JSON")
  .requiredOption("-i, --input <file>", "Input Markdown file")
  .option("-o, --output <file>", "Output JSON file", "tasks.json")
  .option("--pretty", "Pretty-print JSON", false);

program.parse(process.argv);

const opts = program.opts();

function main() {
  const inputPath = path.resolve(process.cwd(), opts.input);
  const outputPath = path.resolve(process.cwd(), opts.output);

  if (!fs.existsSync(inputPath)) {
    console.error(`Input file not found: ${inputPath}`);
    process.exit(1);
  }

  const markdown = fs.readFileSync(inputPath, "utf8");
  const tasks = parseTasks(markdown);

  const payload = {
    generatedAt: new Date().toISOString(),
    input: path.basename(inputPath),
    count: tasks.length,
    tasks
  };

  const json = opts.pretty ? JSON.stringify(payload, null, 2) : JSON.stringify(payload);
  fs.writeFileSync(outputPath, json, "utf8");

  console.log(`Exported ${tasks.length} tasks to ${outputPath}`);
}

main();
