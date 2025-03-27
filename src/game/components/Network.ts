import { Configuration, DefaultApiFactory } from "../server_api";
import { KeypairApiFactory } from "../server_api";

const API_BASE_URL = import.meta.env.VITE_SERVER_API_BASE_URL || 'http://localhost:8000';   

export const token_config = new Configuration({
    basePath: API_BASE_URL,
    baseOptions: {
        headers: {
            'Content-Type': 'application/json',
        }
    }
});

export const keypair_api = KeypairApiFactory(token_config);
export const login_api = DefaultApiFactory(token_config);