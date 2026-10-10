import { chromium } from "playwright";
import path from "path";
import fs from "fs";

const PROFILE_DIR = "/home/angsuman/.local/share/flow-mcp/profiles/flow-user";
const PROJECT_DIR = "/home/angsuman/extra_spac/Insta_Angsumi/projects/bioinformatics-intro";

async function run() {
  console.log("Launching Chrome window for Google Flow...");
  const context = await chromium.launchPersistentContext(PROFILE_DIR, {
    headless: false,
    executablePath: "/usr/bin/google-chrome",
    args: ["--no-first-run", "--no-default-browser-check"]
  });

  const page = context.pages()[0] || await context.newPage();
  await page.goto("https://labs.google/fx/tools/flow", { waitUntil: "domcontentloaded" });

  console.log("Waiting for user to sign in and open Google Flow workspace...");
  console.log("Please sign in or select your Google account in the browser window.");

  // Wait until user is inside a Flow project or workspace
  while (true) {
    const url = page.url();
    const hasProject = url.includes("/tools/flow/project/") || (await page.locator('button:has-text("New project"), a:has-text("New project")').count()) > 0;
    if (hasProject) {
      console.log("Flow workspace detected!");
      break;
    }
    await page.waitForTimeout(2000);
  }

  // If on dashboard, click 'New project'
  if (!page.url().includes("/tools/flow/project/")) {
    const newProjBtn = page.locator('button:has-text("New project"), [aria-label*="New project" i]').first();
    if (await newProjBtn.isVisible()) {
      await newProjBtn.click();
      await page.waitForTimeout(3000);
    }
  }

  console.log("Inside Flow project: " + page.url());
  console.log("Ready to automate Veo 3.1 generations!");

  // Keep open for automation
}

run().catch(console.error);
