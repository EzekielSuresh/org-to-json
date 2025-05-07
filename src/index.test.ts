import { describe, it, expect } from "vitest";
import { parseOrg } from "../src/index";

describe("parseOrg", () => {
  it("parses a basic heading", () => {
    const input = `* TODO Learn Vitest`;
    const result = parseOrg(input);

    expect(result.nodes).toHaveLength(1);
    expect(result.nodes[0].title).toBe("Learn Vitest");
    expect(result.nodes[0].status).toBe("TODO");
  });

  it("parses file-level properties", () => {
    const input = `#+AUTHOR: Ezekiel\n* Heading`;
    const result = parseOrg(input);

    expect(result.properties.author).toBe("Ezekiel");
  });
});
