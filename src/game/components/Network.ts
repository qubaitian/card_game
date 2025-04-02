import { Configuration, DefaultApiFactory } from "../server_api";
import { KeypairApiFactory } from "../server_api";
import { CardApiFactory } from "../server_api";
import { SceneApiFactory } from "../server_api";
const API_BASE_URL = import.meta.env.VITE_PYTHON_BASE_URL;

console.log(import.meta.env);
console.log(API_BASE_URL);
export const token_config = new Configuration({
    basePath: 'http://' + API_BASE_URL,
    baseOptions: {
        headers: {
            'Content-Type': 'application/json',
        }
    }
});

export const keypair_api = KeypairApiFactory(token_config);
export const login_api = DefaultApiFactory(token_config);
export const card_api = CardApiFactory(token_config);
export const scene_api = SceneApiFactory(token_config);