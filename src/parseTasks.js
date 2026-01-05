// src/parseTasks.js

/**
 * Parse Markdown lines that look like:
 * - [ ] Add retry + backoff #backend due:2026-01-15
 */
function parseTasks(markdown) {
  const lines = markdown.split(/\r?\n/);
  const tasks = [];
  // A simple matcher for unchecked tasks
  const taskRegex = /^\s*-\s*\[\s\]\s+(.*)$/;
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const match = line.match(taskRegex);
    if (!match) continue;
    const raw = match[1].trim();
    // Extract tags like #backend #docs
    const tags = Array.from(raw.matchAll(/(^|\s)(#[a-zA-Z0-9_-]+)/g)).map(m => m[2].slice(1));
    // Extract due date token like due:YYYY-MM-DD
    const dueMatch = raw.match(/\bdue:(\d{4}-\d{2}-\d{2})\b/);
    const due = dueMatch ? dueMatch[1] : null;
    // Clean title by removing tags and due token
    const title = raw
      .replace(/(^|\s)#[a-zA-Z0-9_-]+/g, " ")
      .replace(/\bdue:\d{4}-\d{2}-\d{2}\b/g, " ")
      .replace(/\s+/g, " ")
      .trim();
    tasks.push({
      id: `t_${i + 1}`,
      title,
      tags,
      due,
      sourceLine: i + 1
    });
  }
  return tasks;
}

module.exports = { parseTasks };
