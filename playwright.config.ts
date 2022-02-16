import { PlaywrightTestConfig } from "@playwright/test";

const config: PlaywrightTestConfig = {
  use: {
    ignoreHTTPSErrors: true,
    launchOptions: {
      args: ["--disable-features=BlockInsecurePrivateNetworkRequests"],
    },
  },
  webServer: {
    command: 'npx http-server assets --cors',
    port: 8080,
    timeout: 120 * 1000,
  },
};

export default config;
