import { test, expect, it, describe } from "bun:test";
import { pathResolver } from "./path-resolver.js";
import type { EleventyContent } from "./eleventy-types.js";

const mockEleventyContent = [
  {
    fileSlug: "",
    filePathStem: "/index",
    url: "/",
  },
  {
    fileSlug: "React",
    filePathStem: "/posts/react",
    url: "/posts/react/",
  },
] as EleventyContent[];

describe("pathResolver", () => {
  it("resolves a valid linkId to the correct URL", () => {
    const result = pathResolver("React", mockEleventyContent);
    expect(result).toBe("/posts/react/");
  });

  it("handles case-insensitive matching", () => {
    const result = pathResolver("react", mockEleventyContent);
    expect(result).toBe("/posts/react/");
  });

  it("handles spaces in linkId", () => {
    const result = pathResolver("React ", mockEleventyContent);
    expect(result).toBe("/posts/react/");
  });

  it("returns an empty string for an invalid linkId", () => {
    const result = pathResolver("InvalidLink", mockEleventyContent);
    expect(result).toBe("/not-found");
  });
});
