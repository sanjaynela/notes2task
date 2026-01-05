# notes2task

A simple CLI tool that extracts tasks from Markdown files and exports them as JSON.

## What it does

- Reads a Markdown file
- Extracts unchecked tasks (lines matching `- [ ] ...`)
- Supports tags like `#backend` or `#docs`
- Supports due dates like `due:2026-01-15`
- Exports to a clean JSON file

## Installation

```bash
npm install
```

## Usage

```bash
npm run notes2task -- -i examples/notes.md --pretty
```

Or use it directly:

```bash
node src/index.js -i examples/notes.md -o tasks.json --pretty
```

## Options

- `-i, --input <file>` - Input Markdown file (required)
- `-o, --output <file>` - Output JSON file (default: `tasks.json`)
- `--pretty` - Pretty-print JSON output

## Example

Input (`notes.md`):
```markdown
- [ ] Buy a domain #ops due:2026-01-12
- [ ] Add a clean README #docs
- [ ] Implement retry + backoff #backend due:2026-01-15
```

Output (`tasks.json`):
```json
{
  "generatedAt": "2026-01-10T12:00:00.000Z",
  "input": "notes.md",
  "count": 3,
  "tasks": [
    {
      "id": "t_1",
      "title": "Buy a domain",
      "tags": ["ops"],
      "due": "2026-01-12",
      "sourceLine": 1
    },
    {
      "id": "t_2",
      "title": "Add a clean README",
      "tags": ["docs"],
      "due": null,
      "sourceLine": 2
    },
    {
      "id": "t_3",
      "title": "Implement retry + backoff",
      "tags": ["backend"],
      "due": "2026-01-15",
      "sourceLine": 3
    }
  ]
}
```

## Task Format

A task line should match:
```
- [ ] Task title #tag1 #tag2 due:YYYY-MM-DD
```

- Tasks must start with `- [ ]` (unchecked checkbox)
- Tags are optional and start with `#`
- Due dates are optional and use format `due:YYYY-MM-DD`
- Completed tasks (`- [x]`) are ignored

## License

MIT
