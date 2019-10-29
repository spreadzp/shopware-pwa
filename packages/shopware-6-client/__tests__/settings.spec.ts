import { config, setup, update } from "@shopware-pwa/shopware-6-client";
import { apiService } from "../src/apiService";

const DEFAULT_ENDPOINT =
  "https://shopware-2.vuestorefront.io/sales-channel-api/v1";

describe("Settings", () => {
  beforeEach(() => {
    setup(); // we need to clean settings to default values before every test
  });

  describe("setup", () => {
    it("should have default endpoint config", () => {
      expect(config.endpoint).toEqual(DEFAULT_ENDPOINT);
    });

    it("should change default endpoint after setup invocation", () => {
      setup({
        endpoint: "https://my-new-endpoint.com"
      });
      expect(config.endpoint).toEqual("https://my-new-endpoint.com");
    });

    it("should keep default endpoint between tests", () => {
      expect(config.endpoint).toEqual(DEFAULT_ENDPOINT);
    });

    it("should clean contextToken on setup without it", () => {
      update({ contextToken: "xxx" });
      setup();

      expect(config.contextToken).toBeFalsy();
    });
  });

  describe("update", () => {
    it("should have contextToken after update", () => {
      update({ contextToken: "xxx" });

      expect(config.contextToken).toEqual("xxx");
    });

    it("should have contextToken in axios defaults after update", () => {
      update({ contextToken: "xxx" });

      expect(apiService.defaults.headers.common["sw-context-token"]).toEqual(
        "xxx"
      );
    });

    it("should clean contextToken from axios detault headers after reset", () => {
      update({ contextToken: "xxx" });
      setup();

      expect(
        apiService.defaults.headers.common["sw-context-token"]
      ).toBeUndefined();
    });

    it("should have default config with empty invocation", () => {
      update();
      expect(config.accessToken).toEqual("SWSCBVBBZET1RTFIYWY4YVLICA");
      expect(config.contextToken).toEqual("");
    });

    it("should change defaultPaginationLimit", () => {
      update({ defaultPaginationLimit: 50 });
      expect(config.accessToken).toEqual("SWSCBVBBZET1RTFIYWY4YVLICA");
      expect(config.defaultPaginationLimit).toEqual(50);
    });
  });
});