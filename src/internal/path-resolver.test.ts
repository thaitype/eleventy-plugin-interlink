import { test, expect, it, describe } from "bun:test";
import { pathResolver } from "./path-resolver.js";
import type { EleventyContent } from "./eleventy-types.js";


describe("pathResolver", () => {

  const mockPages = [
    { filePathStem: "/React", url: "/React/", fileSlug: "React" },
    { filePathStem: "/demo/React", url: "/demo/React/", fileSlug: "React" },
    { filePathStem: "/test/post/React", url: "/test/post/React/", fileSlug: "React" },
    { filePathStem: "/aaa/React", url: "/aaa/React/", fileSlug: "React" },
    { filePathStem: "/bbb/React", url: "/bbb/React/", fileSlug: "React" },
    { filePathStem: "/posts/advanced", url: "/posts/advanced/", fileSlug: "advanced" },
  ] as EleventyContent[];


  const currentPage = mockPages.find(page => page.filePathStem === "/posts/advanced");
  if (!currentPage) throw new Error("Current page not found");

  it("resolves linkId as a direct path", () => {
    expect(pathResolver("/React", currentPage, mockPages)).toBe("/React/");
  });

  it("resolves relative path ending with linkId", () => {
    expect(pathResolver("post/React", currentPage, mockPages)).toBe("/test/post/React/");
  });

  // Test later
  // it("resolves linkId in the same directory", () => {
  //   expect(pathResolver("React", currentPage, mockPages)).toBe("/aaa/React/");
  // });

  it("returns null for invalid linkId", () => {
    expect(pathResolver("NotFound", currentPage, mockPages)).toBe(null);
  });
});