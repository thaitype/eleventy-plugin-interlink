import { test, expect, it, describe } from "bun:test";
import { pathResolver } from "./path-resolver.js";
import type { EleventyContent } from "./eleventy-types.js";



// describe("pathResolver", () => {
//   const mockPages = [
//     { filePathStem: "/index", url: "/", fileSlug: "" },
//     { filePathStem: "/posts/react", url: "/posts/react/", fileSlug: "react" },
//     { filePathStem: "/posts/advanced", url: "/posts/advanced/", fileSlug: "advanced" },
//     { filePathStem: "/docs/react", url: "/docs/react/", fileSlug: "react" },
//     { filePathStem: "/docs/demo/react", url: "/docs/demo/react/", fileSlug: "react" },
//   ] as EleventyContent[]
  
//   const currentPage = mockPages.find(page => page.filePathStem === "/docs/demo/react");
//   if (!currentPage) throw new Error("Current page not found");

//   it("resolves a valid linkId in the same directory", () => {
//     expect(pathResolver("react", currentPage, mockPages)).toBe("/docs/demo/react/");
//   });

//   // it("resolves to the root directory", () => {
//   //   expect(pathResolver("index", currentPage, mockPages)).toBe("/");
//   // });

//   // it("returns `/not-found` for invalid links", () => {
//   //   expect(pathResolver("notfound", currentPage, mockPages)).toBe("/not-found");
//   // });


// });


describe("pathResolver real data", () => {
  const mockPages = 
  [
    {
      "filePathStem": "/demo/developer/draft-blog/2021-08-03-how-to-choose-proper-component-ui-react/readme",
      "url": "/demo/developer/draft-blog/2021-08-03-how-to-choose-proper-component-ui-react/readme/",
      "fileSlug": "readme"
    },
    {
      "filePathStem": "/demo/developer/draft-blog/react-best-practice-checklist",
      "url": "/demo/developer/draft-blog/2021-08-19-react-best-practice-checklist/",
      "fileSlug": "react-best-practice-checklist"
    },
    {
      "filePathStem": "/demo/developer/draft-blog/react-dark-mode",
      "url": "/demo/developer/draft-blog/2021-08-19-react-dark-mode/",
      "fileSlug": "react-dark-mode"
    },
    {
      "filePathStem": "/demo/developer/draft-blog/git-cookbook",
      "url": "/demo/developer/draft-blog/2021-08-22-git-cookbook/",
      "fileSlug": "git-cookbook"
    },
    {
      "filePathStem": "/demo/developer/draft-blog/git-in-action",
      "url": "/demo/developer/draft-blog/2021-08-22-git-in-action/",
      "fileSlug": "git-in-action"
    },
    {
      "filePathStem": "/demo/developer/draft-blog/security",
      "url": "/demo/developer/draft-blog/2021-08-22-security/",
      "fileSlug": "security"
    },
    {
      "filePathStem": "/demo/developer/draft-blog/webpack-multiple-entry-points",
      "url": "/demo/developer/draft-blog/2021-08-22-webpack-multiple-entry-points/",
      "fileSlug": "webpack-multiple-entry-points"
    },
    {
      "filePathStem": "/demo/developer/draft-blog/2021-08-23-gatsby-thai-font-sharing-social/readme",
      "url": "/demo/developer/draft-blog/2021-08-23-gatsby-thai-font-sharing-social/readme/",
      "fileSlug": "readme"
    },
    {
      "filePathStem": "/demo/developer/draft-blog/2021-08-23-jimp-loadfont-function-renders-non-english-thai-font-ugly-with-vowel-character/readme",
      "url": "/demo/developer/draft-blog/2021-08-23-jimp-loadfont-function-renders-non-english-thai-font-ugly-with-vowel-character/readme/",
      "fileSlug": "readme"
    },
    {
      "filePathStem": "/demo/developer/draft-blog/redux-in-2021",
      "url": "/demo/developer/draft-blog/2021-08-25-redux-in-2021/",
      "fileSlug": "redux-in-2021"
    },
    {
      "filePathStem": "/demo/developer/draft-blog/bootstrap-in-2021",
      "url": "/demo/developer/draft-blog/2021-08-26-bootstrap-in-2021/",
      "fileSlug": "bootstrap-in-2021"
    },
    {
      "filePathStem": "/demo/developer/draft-blog/setup-nodejs-typescript",
      "url": "/demo/developer/draft-blog/2021-08-27-setup-nodejs-typescript/",
      "fileSlug": "setup-nodejs-typescript"
    },
    {
      "filePathStem": "/demo/developer/draft-blog/typescript",
      "url": "/demo/developer/draft-blog/2021-08-27-typescript/",
      "fileSlug": "typescript"
    },
    {
      "filePathStem": "/demo/developer/draft-blog/css",
      "url": "/demo/developer/draft-blog/2021-08-28-css/",
      "fileSlug": "css"
    },
    {
      "filePathStem": "/demo/developer/draft-blog/2021-08-28-google-analytics/readme",
      "url": "/demo/developer/draft-blog/2021-08-28-google-analytics/readme/",
      "fileSlug": "readme"
    },
    {
      "filePathStem": "/demo/developer/draft-blog/react",
      "url": "/demo/developer/draft-blog/2021-08-28-react/",
      "fileSlug": "react"
    },
    {
      "filePathStem": "/demo/developer/draft-blog/read-private-key-env",
      "url": "/demo/developer/draft-blog/2021-08-28-read-private-key-env/",
      "fileSlug": "read-private-key-env"
    },
    {
      "filePathStem": "/demo/developer/draft-blog/2021-08-29-seo-and-social-media/readme",
      "url": "/demo/developer/draft-blog/2021-08-29-seo-and-social-media/readme/",
      "fileSlug": "readme"
    },
    {
      "filePathStem": "/demo/developer/draft-blog/shortcut-css-in-js-responsive",
      "url": "/demo/developer/draft-blog/2021-08-29-shortcut-css-in-js-responsive/",
      "fileSlug": "shortcut-css-in-js-responsive"
    },
    {
      "filePathStem": "/demo/developer/draft-blog/styled-component-typescript",
      "url": "/demo/developer/draft-blog/2021-08-29-styled-component-typescript/",
      "fileSlug": "styled-component-typescript"
    },
    {
      "filePathStem": "/demo/developer/draft-blog/c-sharp-typescript-cheatsheet",
      "url": "/demo/developer/draft-blog/2021-09-04-c-sharp-typescript-cheatsheet/",
      "fileSlug": "c-sharp-typescript-cheatsheet"
    },
    {
      "filePathStem": "/demo/developer/draft-blog/di-asp-dotnet",
      "url": "/demo/developer/draft-blog/2021-09-05-di-asp-dotnet/",
      "fileSlug": "di-asp-dotnet"
    },
    {
      "filePathStem": "/demo/developer/draft-blog/introduction-to-typescript",
      "url": "/demo/developer/draft-blog/2021-09-05-introduction-to-typescript/",
      "fileSlug": "introduction-to-typescript"
    },
    {
      "filePathStem": "/demo/developer/draft-blog/most-used-modern-javascript-react",
      "url": "/demo/developer/draft-blog/2021-09-05-most-used-modern-javascript-react/",
      "fileSlug": "most-used-modern-javascript-react"
    },
    {
      "filePathStem": "/demo/developer/draft-blog/offsetting-an-html-anchor-to-adjust-for-fixed-header",
      "url": "/demo/developer/draft-blog/2021-09-05-offsetting-an-html-anchor-to-adjust-for-fixed-header/",
      "fileSlug": "offsetting-an-html-anchor-to-adjust-for-fixed-header"
    },
    {
      "filePathStem": "/demo/developer/draft-blog/typescript-object-mapping",
      "url": "/demo/developer/draft-blog/2021-09-10-typescript-object-mapping/",
      "fileSlug": "typescript-object-mapping"
    },
    {
      "filePathStem": "/demo/developer/draft-blog/2021-10-05-aspnet-framework-build-deploy-github-action/readme",
      "url": "/demo/developer/draft-blog/2021-10-05-aspnet-framework-build-deploy-github-action/readme/",
      "fileSlug": "readme"
    },
    {
      "filePathStem": "/demo/developer/draft-blog/2021-11-21-introduction-to-github-action/readme",
      "url": "/demo/developer/draft-blog/2021-11-21-introduction-to-github-action/readme/",
      "fileSlug": "readme"
    },
    {
      "filePathStem": "/demo/developer/draft-blog/dotnet6-env",
      "url": "/demo/developer/draft-blog/2021-11-25-dotnet6-env/",
      "fileSlug": "dotnet6-env"
    },
    {
      "filePathStem": "/demo/developer/draft-blog/2021-12-11-no-type-no-life-typescript/readme",
      "url": "/demo/developer/draft-blog/2021-12-11-no-type-no-life-typescript/readme/",
      "fileSlug": "readme"
    },
    {
      "filePathStem": "/demo/developer/draft-blog/2021-12-11-nodejs-debugging-in-vs-code/readme",
      "url": "/demo/developer/draft-blog/2021-12-11-nodejs-debugging-in-vs-code/readme/",
      "fileSlug": "readme"
    },
    {
      "filePathStem": "/demo/developer/draft-blog/2021-12-11-old-aspnet-framework-web-site-project-to-github-action/readme",
      "url": "/demo/developer/draft-blog/2021-12-11-old-aspnet-framework-web-site-project-to-github-action/readme/",
      "fileSlug": "readme"
    },
    {
      "filePathStem": "/demo/developer/draft-blog/2021-12-11-site-reliability-engineer/readme",
      "url": "/demo/developer/draft-blog/2021-12-11-site-reliability-engineer/readme/",
      "fileSlug": "readme"
    },
    {
      "filePathStem": "/demo/developer/draft-blog/2022-04-07-talk-github-action/readme",
      "url": "/demo/developer/draft-blog/2022-04-07-talk-github-action/readme/",
      "fileSlug": "readme"
    },
    {
      "filePathStem": "/demo/developer/draft-blog/2022-04-10-3-things-that-you-should-do-after-install-wsl-on-windows-for-work-better-with-vs-code/README",
      "url": "/demo/developer/draft-blog/2022-04-10-3-things-that-you-should-do-after-install-wsl-on-windows-for-work-better-with-vs-code/README/",
      "fileSlug": "README"
    },
    {
      "filePathStem": "/demo/developer/draft-blog/2022-04-16-terraform-azurerm-version-3/README",
      "url": "/demo/developer/draft-blog/2022-04-16-terraform-azurerm-version-3/README/",
      "fileSlug": "README"
    },
    {
      "filePathStem": "/demo/developer/draft-blog/nodejs-esm",
      "url": "/demo/developer/draft-blog/2022-04-22-nodejs-esm/",
      "fileSlug": "nodejs-esm"
    },
    {
      "filePathStem": "/demo/developer/draft-blog/2022-10-08-ts-circular-dependency-module-in-dependency-injection/README",
      "url": "/demo/developer/draft-blog/2022-10-08-ts-circular-dependency-module-in-dependency-injection/README/",
      "fileSlug": "README"
    },
    {
      "filePathStem": "/demo/developer/draft-blog/typescript-everyday-uses",
      "url": "/demo/developer/draft-blog/2022-11-28-typescript-everyday-uses/",
      "fileSlug": "typescript-everyday-uses"
    },
    {
      "filePathStem": "/demo/developer/draft-blog/reduce-docker-image-part2",
      "url": "/demo/developer/draft-blog/2023-09-01-reduce-docker-image-part2/",
      "fileSlug": "reduce-docker-image-part2"
    },
    {
      "filePathStem": "/demo/developer/draft-blog/type-safe-builder-pattern-on-typescript",
      "url": "/demo/developer/draft-blog/2023-09-15-type-safe-builder-pattern-on-typescript/",
      "fileSlug": "type-safe-builder-pattern-on-typescript"
    },
    {
      "filePathStem": "/demo/developer/draft-blog/the-exhaustive-pattern-matching-without-runtime-overhead",
      "url": "/demo/developer/draft-blog/2023-09-18-the-exhaustive-pattern-matching-without-runtime-overhead/",
      "fileSlug": "the-exhaustive-pattern-matching-without-runtime-overhead"
    },
    {
      "filePathStem": "/demo/developer/draft-blog/2023-12-14-getting-started-with-google-sheet-app-script-using-typescript/index",
      "url": "/demo/developer/draft-blog/2023-12-14-getting-started-with-google-sheet-app-script-using-typescript/",
      "fileSlug": "getting-started-with-google-sheet-app-script-using-typescript"
    },
    {
      "filePathStem": "/index",
      "url": "/",
      "fileSlug": ""
    },
    {
      "filePathStem": "/posts/first",
      "url": "/posts/first/",
      "fileSlug": "first"
    },
    {
      "filePathStem": "/posts/second",
      "url": "/posts/second/",
      "fileSlug": "second"
    },
    {
      "filePathStem": "/api/posts",
      "url": "/api/posts.json",
      "fileSlug": "posts"
    },
    {
      "filePathStem": "/demo/developer/Best Practice Dev",
      "url": "/demo/developer/Best Practice Dev/",
      "fileSlug": "Best Practice Dev"
    },
    {
      "filePathStem": "/demo/developer/Docker",
      "url": "/demo/developer/Docker/",
      "fileSlug": "Docker"
    },
    {
      "filePathStem": "/demo/developer/Dotfiles",
      "url": "/demo/developer/Dotfiles/",
      "fileSlug": "Dotfiles"
    },
    {
      "filePathStem": "/demo/developer/Icons",
      "url": "/demo/developer/Icons/",
      "fileSlug": "Icons"
    },
    {
      "filePathStem": "/demo/developer/JWT",
      "url": "/demo/developer/JWT/",
      "fileSlug": "JWT"
    },
    {
      "filePathStem": "/demo/developer/Micro-Frontend",
      "url": "/demo/developer/Micro-Frontend/",
      "fileSlug": "Micro-Frontend"
    },
    {
      "filePathStem": "/demo/developer/Mock",
      "url": "/demo/developer/Mock/",
      "fileSlug": "Mock"
    },
    {
      "filePathStem": "/demo/developer/React/React1",
      "url": "/demo/developer/React/React1/",
      "fileSlug": "React1"
    },
    {
      "filePathStem": "/demo/developer/React/State Management",
      "url": "/demo/developer/React/State Management/",
      "fileSlug": "State Management"
    },
    {
      "filePathStem": "/demo/developer/Refresh Token",
      "url": "/demo/developer/Refresh Token/",
      "fileSlug": "Refresh Token"
    },
    {
      "filePathStem": "/demo/developer/TypeScript",
      "url": "/demo/developer/TypeScript/",
      "fileSlug": "TypeScript"
    },
    {
      "filePathStem": "/demo/developer/VS Code",
      "url": "/demo/developer/VS Code/",
      "fileSlug": "VS Code"
    },
    {
      "filePathStem": "/demo/developer/dotnet/ADO.NET",
      "url": "/demo/developer/dotnet/ADO.NET/",
      "fileSlug": "ADO.NET"
    },
    {
      "filePathStem": "/demo/developer/dotnet/ASP.NET Core 6 and authentication servers the real bait and switch is not the one you think",
      "url": "/demo/developer/dotnet/ASP.NET Core 6 and authentication servers the real bait and switch is not the one you think/",
      "fileSlug": "ASP.NET Core 6 and authentication servers the real bait and switch is not the one you think"
    },
    {
      "filePathStem": "/demo/developer/dotnet/ASP.NET Core",
      "url": "/demo/developer/dotnet/ASP.NET Core/",
      "fileSlug": "ASP.NET Core"
    },
    {
      "filePathStem": "/demo/developer/dotnet/Authentication",
      "url": "/demo/developer/dotnet/Authentication/",
      "fileSlug": "Authentication"
    },
    {
      "filePathStem": "/demo/developer/dotnet/Concurrency C Sharp",
      "url": "/demo/developer/dotnet/Concurrency C Sharp/",
      "fileSlug": "Concurrency C Sharp"
    },
    {
      "filePathStem": "/demo/developer/dotnet/DOT NET Pattern",
      "url": "/demo/developer/dotnet/DOT NET Pattern/",
      "fileSlug": "DOT NET Pattern"
    },
    {
      "filePathStem": "/demo/developer/dotnet/DOT NET",
      "url": "/demo/developer/dotnet/DOT NET/",
      "fileSlug": "DOT NET"
    },
    {
      "filePathStem": "/demo/developer/dotnet/Database",
      "url": "/demo/developer/dotnet/Database/",
      "fileSlug": "Database"
    },
    {
      "filePathStem": "/demo/developer/dotnet/Dependency Injection in .NET",
      "url": "/demo/developer/dotnet/Dependency Injection in .NET/",
      "fileSlug": "Dependency Injection in .NET"
    },
    {
      "filePathStem": "/demo/developer/dotnet/Need to Learn",
      "url": "/demo/developer/dotnet/Need to Learn/",
      "fileSlug": "Need to Learn"
    },
    {
      "filePathStem": "/demo/Book Focus 2024",
      "url": "/demo/Book Focus 2024/",
      "fileSlug": "Book Focus 2024"
    },
    {
      "filePathStem": "/demo/DevOps",
      "url": "/demo/DevOps/",
      "fileSlug": "DevOps"
    },
    {
      "filePathStem": "/demo/index",
      "url": "/demo/",
      "fileSlug": "demo"
    },
    {
      "filePathStem": "/demo/Microservice",
      "url": "/demo/Microservice/",
      "fileSlug": "Microservice"
    },
    {
      "filePathStem": "/demo/Mozilla Sops",
      "url": "/demo/Mozilla Sops/",
      "fileSlug": "Mozilla Sops"
    },
    {
      "filePathStem": "/demo/Terraform",
      "url": "/demo/Terraform/",
      "fileSlug": "Terraform"
    },
    {
      "filePathStem": "/demo/developer/React",
      "url": "/demo/developer/React/",
      "fileSlug": "React"
    },
    {
      "filePathStem": "/posts/React",
      "url": "/posts/React/",
      "fileSlug": "React"
    },
    {
      "filePathStem": "/demo/developer/Developer's Brain",
      "url": "/demo/developer/Developer's Brain/",
      "fileSlug": "Developer's Brain"
    },
    {
      "filePathStem": "/demo/React",
      "url": "/demo/React/",
      "fileSlug": "React"
    },
    {
      "filePathStem": "/aaa/React",
      "url": "/aaa/React/",
      "fileSlug": "React"
    },
    {
      "filePathStem": "/aaa/first",
      "url": "/aaa/first/",
      "fileSlug": "first"
    },
    {
      "filePathStem": "/aaa/second",
      "url": "/aaa/second/",
      "fileSlug": "second"
    },
    {
      "filePathStem": "/test/react",
      "url": "/test/react/",
      "fileSlug": "react"
    }
  ] as EleventyContent[]
  
  const currentPage = mockPages.find(page => page.filePathStem === "/demo/developer/Developer's Brain");
  if (!currentPage) throw new Error("Current page not found");

  it("resolves a valid linkId in the same directory", () => {
    expect(pathResolver("React", currentPage, mockPages)).toBe("/demo/developer/React/");
  });

});