import { DefaultApiFactory, SceneApiFactory, } from "../src/game/server_api/api";
import { Configuration } from "../src/game/server_api/configuration";

const configuration = new Configuration({
    basePath: "http://localhost:8000",
})

const login_api = DefaultApiFactory(configuration);
const scene_api = SceneApiFactory(configuration);

describe('Network tests', () => {
    beforeAll(async () => {
        const response = await login_api.loginLoginPost({
            private_key: "2ff44da770473f99a51f9413cadc0b369088422f15529566782d7dba00b523ce",
        });
        const access_token = response.data.access_token;
        configuration.baseOptions.headers.Authorization = access_token;
    });

    test("select card should work correctly", async () => {
        const response = await scene_api.currentSceneCurrentPost();
        expect(response.data.loot_card_list?.length).toEqual(3);
    });
});

