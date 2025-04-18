import assert from "node:assert";
import { DefaultApiFactory } from "../src/game/server_api/api";
import { Configuration } from "../src/game/server_api/configuration";

const configuration = new Configuration({
  basePath: "http://localhost:8000",
})

const login_api = DefaultApiFactory(configuration);

describe('Network tests', () => {
  test("login should work correctly", async () => {
    const response = await login_api.loginLoginPost({
      private_key: "2ff44da770473f99a51f9413cadc0b369088422f15529566782d7dba00b523ce",
    });
    assert(response.data.access_token, JSON.stringify(response.data));
  });

  test("login should error when private key is invalid", async () => {
    const response = await login_api.loginLoginPost({
      private_key: "2ff44da770473f99a51f9413cadc0",
    });
    assert(!response.data.access_token, JSON.stringify(response.data));
  });
});