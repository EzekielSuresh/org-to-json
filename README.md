# org-to-json

> `org-to-json` is a lightweight Typescript library that parses Org files into clean, structured JSON. It is ideal for building editors, visualizers and automation tools around Org Mode content.

## Why use org-to-json?

- **tree-structure**: outputs a hierarchical JSON preserving original structure
- **accurate**: supports nested headings with correct level of depth
- **todo-keywords**: captures `TODO`, `DONE` and 7 other keywords
- **timestamps**: extracts both `SCHEDULED` and `DEADLINE` timestamps
- **type-safe**: written in Typescript with full type definitions for easy integration

## Install

Install with npm:
```sh
npm install org-to-json
```

## Usage

```typescript
import { parseOrg } from "org-to-json";
import { readFile } from "fs/promises";

// Read your .org file
const orgText = await readFile("example.org", "utf8");

// Parse to JSON
const parsed = parseOrg(orgText);

console.log(JSON.stringify(parsed, null, 2));
```

### JSON Output Structure

```json
{
  "properties": {
    "title": "Project Plan",
    "author": "Ezekiel"
  },
  "nodes": [
    {
      "level": 1,
      "title": "Setup project",
      "status": "TODO",
      "deadline": "2025-05-20 Tue",
      "content": ["Some initial project setup tasks."],
      "children": []
    },
    {
      "level": 1,
      "title": "Initial research",
      "status": "DONE",
      "scheduled": "2025-05-18 Sun",
      "content": [
        "- Reviewed existing tools",
        "- Took notes"
      ],
      "children": []
    }
  ]
}
```

Nested headings will look like this:

```json
{
      "level": 1,
      "title": "Setup project",
      "status": "TODO",
      "deadline": "2025-05-20 Tue",
      "content": ["Some initial project setup tasks."],
      "children": [
        {
          "level": 2,
          "title": "Install dependencies",
          "status": "TODO",
          "content": [
            "- Install TypeScript",
            "- Setup tsup"
          ],
          "children": []
        }
      ]
},
```

## Node

Each returned node (heading) will be represented with the following properties:

- `level` (`number`): depth level of the heading
- `title` (`string`): text of the heading 
- `status` (`string?`): task keyword (e.g. TODO, DONE)
- `deadline` (`string?`): deadline timestamp
- `scheduled` (`string?`): scheduled timestamp
- `content` (`string[]?`): lines of content under the heading
- `children` (`OrgNode[]?`): nested subheadings under the current node

> `?` indicates an optional property in Typescript

## Contributing

Contributions are welcome! If you have suggestions for improvements, bug fixes, or new features, feel free to open an [issue](https://github.com/EzekielSuresh/org-to-json/issues).

## License

MIT License © [Ezekiel Suresh Murali](https://github.com/EzekielSuresh)
