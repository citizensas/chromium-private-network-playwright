import test, { expect } from "@playwright/test";

const fetchUrl = "http://127.0.0.1:8080/file.js";

test("fetches file.js without problem when no page.route is defined", async ({
  page,
}) => {
  await testJourney(page);
});

test("fetching file.js does not hang when routes are defined", async ({
  page,
  browserName,
}) => {
  test.fail(
    browserName === "chromium",
    "Test fails when any kind of route is registered."
  );
  await page.route("**", (route) => route.continue());

  await testJourney(page);
});

async function testJourney(page) {
  await page.goto("http://private-network-access-test.glitch.me/", {
    waitUntil: "networkidle",
  });
  await page.locator("#fetch-input-box").fill(fetchUrl);
  const result = page.locator("#fetch-results-list");
  await Promise.all([
    page.click('button:has-text("Fetch!")'),
    expect(result).toContainText(`${fetchUrl}: response received`),
  ]);
}
