import { execSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import { beforeAll, describe, expect, it } from "vitest";
import { menuLinks, siteConfig } from "../src/site.config";

describe("Site Configuration & Metadata", () => {
	it("should have correct site metadata defined", () => {
		expect(siteConfig.title).toBe("Strawhat XYZ");
		expect(siteConfig.url).toBe("https://strawhat.xyz/");
		expect(siteConfig.description).toContain("Strawhat XYZ");
		expect(siteConfig.lang).toBe("en-GB");
		expect(siteConfig.ogLocale).toBe("en_GB");
		expect(siteConfig.showLogo).toBe(true);
	});

	it("should export menuLinks array", () => {
		expect(Array.isArray(menuLinks)).toBe(true);
	});
});

describe("Build Artifacts Verification", () => {
	const distDir = path.resolve(__dirname, "../dist");

	beforeAll(() => {
		if (!fs.existsSync(path.join(distDir, "index.html"))) {
			execSync("pnpm build && pnpm postbuild", {
				cwd: path.resolve(__dirname, ".."),
				stdio: "ignore",
			});
		}
	});

	it("should have generated static HTML entrypoints", () => {
		expect(fs.existsSync(path.join(distDir, "index.html"))).toBe(true);
		expect(fs.existsSync(path.join(distDir, "about/index.html"))).toBe(true);
		expect(fs.existsSync(path.join(distDir, "404.html"))).toBe(true);
	});

	it("should have generated sitemap, robots, and manifest", () => {
		expect(fs.existsSync(path.join(distDir, "sitemap-index.xml"))).toBe(true);
		expect(fs.existsSync(path.join(distDir, "robots.txt"))).toBe(true);
		expect(fs.existsSync(path.join(distDir, "manifest.webmanifest"))).toBe(true);
	});

	it("should have generated the Pagefind search index", () => {
		expect(fs.existsSync(path.join(distDir, "pagefind"))).toBe(true);
	});
});
