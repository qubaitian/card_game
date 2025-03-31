/* tslint:disable */
/* eslint-disable */
/**
 * FastAPI
 * No description provided (generated by Openapi Generator https://github.com/openapitools/openapi-generator)
 *
 * The version of the OpenAPI document: 0.1.1
 * 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */


import type { Configuration } from './configuration';
import type { AxiosPromise, AxiosInstance, RawAxiosRequestConfig } from 'axios';
import globalAxios from 'axios';
// Some imports not used depending on template conditions
// @ts-ignore
import { DUMMY_BASE_URL, assertParamExists, setApiKeyToObject, setBasicAuthToObject, setBearerAuthToObject, setOAuthToObject, setSearchParams, serializeDataIfNeeded, toPathString, createRequestFunction } from './common';
import type { RequestArgs } from './base';
// @ts-ignore
import { BASE_PATH, COLLECTION_FORMATS, BaseAPI, RequiredError, operationServerMap } from './base';

/**
 * 
 * @export
 * @interface CardData
 */
export interface CardData {
    /**
     * 
     * @type {string}
     * @memberof CardData
     */
    'id': string;
    /**
     * 
     * @type {Array<string>}
     * @memberof CardData
     */
    'tag': Array<string>;
    /**
     * 
     * @type {{ [key: string]: CardText; }}
     * @memberof CardData
     */
    'text': { [key: string]: CardText; };
    /**
     * 
     * @type {number}
     * @memberof CardData
     */
    'level'?: number;
    /**
     * 
     * @type {Array<LevelData>}
     * @memberof CardData
     */
    'level_data'?: Array<LevelData>;
    /**
     * 
     * @type {Array<string>}
     * @memberof CardData
     */
    'data'?: Array<string> | null;
}
/**
 * 
 * @export
 * @interface CardText
 */
export interface CardText {
    /**
     * 
     * @type {string}
     * @memberof CardText
     */
    'title': string;
    /**
     * 
     * @type {string}
     * @memberof CardText
     */
    'content': string;
}
/**
 * 
 * @export
 * @enum {string}
 */

export const Color = {
    Red: 'red',
    Blue: 'blue',
    Green: 'green',
    Yellow: 'yellow',
    Purple: 'purple'
} as const;

export type Color = typeof Color[keyof typeof Color];


/**
 * 
 * @export
 * @interface CurrentSceneModel
 */
export interface CurrentSceneModel {
    /**
     * 
     * @type {Player}
     * @memberof CurrentSceneModel
     */
    'player'?: Player;
    /**
     * 
     * @type {Event}
     * @memberof CurrentSceneModel
     */
    'event'?: Event;
    /**
     * 
     * @type {Array<CardData>}
     * @memberof CurrentSceneModel
     */
    'loot_card_list'?: Array<CardData>;
}


/**
 * 
 * @export
 * @enum {string}
 */

export const Event = {
    Battle: 'battle',
    LootOne: 'loot_one',
    LootAny: 'loot_any',
    Path: 'path'
} as const;

export type Event = typeof Event[keyof typeof Event];


/**
 * 
 * @export
 * @interface HTTPValidationError
 */
export interface HTTPValidationError {
    /**
     * 
     * @type {Array<ValidationError>}
     * @memberof HTTPValidationError
     */
    'detail'?: Array<ValidationError>;
}
/**
 * 
 * @export
 * @interface Keypair
 */
export interface Keypair {
    /**
     * 
     * @type {string}
     * @memberof Keypair
     */
    'public_key': string;
    /**
     * 
     * @type {string}
     * @memberof Keypair
     */
    'private_key': string;
}
/**
 * 
 * @export
 * @interface LevelData
 */
export interface LevelData {
    /**
     * 
     * @type {number}
     * @memberof LevelData
     */
    'damage'?: number;
    /**
     * 
     * @type {number}
     * @memberof LevelData
     */
    'vulnerable'?: number;
    /**
     * 
     * @type {number}
     * @memberof LevelData
     */
    'draw'?: number;
}
/**
 * 
 * @export
 * @interface LoginRequest
 */
export interface LoginRequest {
    /**
     * 
     * @type {string}
     * @memberof LoginRequest
     */
    'private_key': string;
}
/**
 * 
 * @export
 * @interface LoginResponse
 */
export interface LoginResponse {
    /**
     * 
     * @type {string}
     * @memberof LoginResponse
     */
    'access_token': string;
}
/**
 * 
 * @export
 * @interface Player
 */
export interface Player {
    /**
     * 
     * @type {number}
     * @memberof Player
     */
    'life'?: number;
    /**
     * 
     * @type {number}
     * @memberof Player
     */
    'damage'?: number;
    /**
     * 
     * @type {number}
     * @memberof Player
     */
    'vulnerable'?: number;
    /**
     * 
     * @type {Array<string>}
     * @memberof Player
     */
    'event'?: Array<string>;
    /**
     * 
     * @type {Array<string>}
     * @memberof Player
     */
    'deck'?: Array<string>;
    /**
     * 
     * @type {Array<string>}
     * @memberof Player
     */
    'choice'?: Array<string>;
    /**
     * 
     * @type {Array<Color>}
     * @memberof Player
     */
    'color'?: Array<Color>;
}
/**
 * 
 * @export
 * @interface UserResponse
 */
export interface UserResponse {
    /**
     * 
     * @type {number}
     * @memberof UserResponse
     */
    'id': number;
    /**
     * 
     * @type {string}
     * @memberof UserResponse
     */
    'public_key': string;
    /**
     * 
     * @type {number}
     * @memberof UserResponse
     */
    'login_time': number;
}
/**
 * 
 * @export
 * @interface ValidationError
 */
export interface ValidationError {
    /**
     * 
     * @type {Array<ValidationErrorLocInner>}
     * @memberof ValidationError
     */
    'loc': Array<ValidationErrorLocInner>;
    /**
     * 
     * @type {string}
     * @memberof ValidationError
     */
    'msg': string;
    /**
     * 
     * @type {string}
     * @memberof ValidationError
     */
    'type': string;
}
/**
 * 
 * @export
 * @interface ValidationErrorLocInner
 */
export interface ValidationErrorLocInner {
}

/**
 * CardApi - axios parameter creator
 * @export
 */
export const CardApiAxiosParamCreator = function (configuration?: Configuration) {
    return {
        /**
         * 
         * @summary Get
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        getCardCardMapGet: async (options: RawAxiosRequestConfig = {}): Promise<RequestArgs> => {
            const localVarPath = `/card/card_map`;
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }

            const localVarRequestOptions = { method: 'GET', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;


    
            setSearchParams(localVarUrlObj, localVarQueryParameter);
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};

            return {
                url: toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
    }
};

/**
 * CardApi - functional programming interface
 * @export
 */
export const CardApiFp = function(configuration?: Configuration) {
    const localVarAxiosParamCreator = CardApiAxiosParamCreator(configuration)
    return {
        /**
         * 
         * @summary Get
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async getCardCardMapGet(options?: RawAxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<{ [key: string]: CardData; }>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.getCardCardMapGet(options);
            const localVarOperationServerIndex = configuration?.serverIndex ?? 0;
            const localVarOperationServerBasePath = operationServerMap['CardApi.getCardCardMapGet']?.[localVarOperationServerIndex]?.url;
            return (axios, basePath) => createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration)(axios, localVarOperationServerBasePath || basePath);
        },
    }
};

/**
 * CardApi - factory interface
 * @export
 */
export const CardApiFactory = function (configuration?: Configuration, basePath?: string, axios?: AxiosInstance) {
    const localVarFp = CardApiFp(configuration)
    return {
        /**
         * 
         * @summary Get
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        getCardCardMapGet(options?: RawAxiosRequestConfig): AxiosPromise<{ [key: string]: CardData; }> {
            return localVarFp.getCardCardMapGet(options).then((request) => request(axios, basePath));
        },
    };
};

/**
 * CardApi - object-oriented interface
 * @export
 * @class CardApi
 * @extends {BaseAPI}
 */
export class CardApi extends BaseAPI {
    /**
     * 
     * @summary Get
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof CardApi
     */
    public getCardCardMapGet(options?: RawAxiosRequestConfig) {
        return CardApiFp(this.configuration).getCardCardMapGet(options).then((request) => request(this.axios, this.basePath));
    }
}



/**
 * DefaultApi - axios parameter creator
 * @export
 */
export const DefaultApiAxiosParamCreator = function (configuration?: Configuration) {
    return {
        /**
         * 
         * @summary Get Users
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        getUsersUsersGet: async (options: RawAxiosRequestConfig = {}): Promise<RequestArgs> => {
            const localVarPath = `/users`;
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }

            const localVarRequestOptions = { method: 'GET', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;


    
            setSearchParams(localVarUrlObj, localVarQueryParameter);
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};

            return {
                url: toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        /**
         * 
         * @summary Login
         * @param {LoginRequest} loginRequest 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        loginLoginPost: async (loginRequest: LoginRequest, options: RawAxiosRequestConfig = {}): Promise<RequestArgs> => {
            // verify required parameter 'loginRequest' is not null or undefined
            assertParamExists('loginLoginPost', 'loginRequest', loginRequest)
            const localVarPath = `/login`;
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }

            const localVarRequestOptions = { method: 'POST', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;


    
            localVarHeaderParameter['Content-Type'] = 'application/json';

            setSearchParams(localVarUrlObj, localVarQueryParameter);
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};
            localVarRequestOptions.data = serializeDataIfNeeded(loginRequest, localVarRequestOptions, configuration)

            return {
                url: toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
    }
};

/**
 * DefaultApi - functional programming interface
 * @export
 */
export const DefaultApiFp = function(configuration?: Configuration) {
    const localVarAxiosParamCreator = DefaultApiAxiosParamCreator(configuration)
    return {
        /**
         * 
         * @summary Get Users
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async getUsersUsersGet(options?: RawAxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<Array<UserResponse>>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.getUsersUsersGet(options);
            const localVarOperationServerIndex = configuration?.serverIndex ?? 0;
            const localVarOperationServerBasePath = operationServerMap['DefaultApi.getUsersUsersGet']?.[localVarOperationServerIndex]?.url;
            return (axios, basePath) => createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration)(axios, localVarOperationServerBasePath || basePath);
        },
        /**
         * 
         * @summary Login
         * @param {LoginRequest} loginRequest 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async loginLoginPost(loginRequest: LoginRequest, options?: RawAxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<LoginResponse>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.loginLoginPost(loginRequest, options);
            const localVarOperationServerIndex = configuration?.serverIndex ?? 0;
            const localVarOperationServerBasePath = operationServerMap['DefaultApi.loginLoginPost']?.[localVarOperationServerIndex]?.url;
            return (axios, basePath) => createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration)(axios, localVarOperationServerBasePath || basePath);
        },
    }
};

/**
 * DefaultApi - factory interface
 * @export
 */
export const DefaultApiFactory = function (configuration?: Configuration, basePath?: string, axios?: AxiosInstance) {
    const localVarFp = DefaultApiFp(configuration)
    return {
        /**
         * 
         * @summary Get Users
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        getUsersUsersGet(options?: RawAxiosRequestConfig): AxiosPromise<Array<UserResponse>> {
            return localVarFp.getUsersUsersGet(options).then((request) => request(axios, basePath));
        },
        /**
         * 
         * @summary Login
         * @param {LoginRequest} loginRequest 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        loginLoginPost(loginRequest: LoginRequest, options?: RawAxiosRequestConfig): AxiosPromise<LoginResponse> {
            return localVarFp.loginLoginPost(loginRequest, options).then((request) => request(axios, basePath));
        },
    };
};

/**
 * DefaultApi - object-oriented interface
 * @export
 * @class DefaultApi
 * @extends {BaseAPI}
 */
export class DefaultApi extends BaseAPI {
    /**
     * 
     * @summary Get Users
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof DefaultApi
     */
    public getUsersUsersGet(options?: RawAxiosRequestConfig) {
        return DefaultApiFp(this.configuration).getUsersUsersGet(options).then((request) => request(this.axios, this.basePath));
    }

    /**
     * 
     * @summary Login
     * @param {LoginRequest} loginRequest 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof DefaultApi
     */
    public loginLoginPost(loginRequest: LoginRequest, options?: RawAxiosRequestConfig) {
        return DefaultApiFp(this.configuration).loginLoginPost(loginRequest, options).then((request) => request(this.axios, this.basePath));
    }
}



/**
 * KeypairApi - axios parameter creator
 * @export
 */
export const KeypairApiAxiosParamCreator = function (configuration?: Configuration) {
    return {
        /**
         * 
         * @summary Get
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        getKeypairGet: async (options: RawAxiosRequestConfig = {}): Promise<RequestArgs> => {
            const localVarPath = `/keypair`;
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }

            const localVarRequestOptions = { method: 'GET', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;


    
            setSearchParams(localVarUrlObj, localVarQueryParameter);
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};

            return {
                url: toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
    }
};

/**
 * KeypairApi - functional programming interface
 * @export
 */
export const KeypairApiFp = function(configuration?: Configuration) {
    const localVarAxiosParamCreator = KeypairApiAxiosParamCreator(configuration)
    return {
        /**
         * 
         * @summary Get
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async getKeypairGet(options?: RawAxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<Keypair>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.getKeypairGet(options);
            const localVarOperationServerIndex = configuration?.serverIndex ?? 0;
            const localVarOperationServerBasePath = operationServerMap['KeypairApi.getKeypairGet']?.[localVarOperationServerIndex]?.url;
            return (axios, basePath) => createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration)(axios, localVarOperationServerBasePath || basePath);
        },
    }
};

/**
 * KeypairApi - factory interface
 * @export
 */
export const KeypairApiFactory = function (configuration?: Configuration, basePath?: string, axios?: AxiosInstance) {
    const localVarFp = KeypairApiFp(configuration)
    return {
        /**
         * 
         * @summary Get
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        getKeypairGet(options?: RawAxiosRequestConfig): AxiosPromise<Keypair> {
            return localVarFp.getKeypairGet(options).then((request) => request(axios, basePath));
        },
    };
};

/**
 * KeypairApi - object-oriented interface
 * @export
 * @class KeypairApi
 * @extends {BaseAPI}
 */
export class KeypairApi extends BaseAPI {
    /**
     * 
     * @summary Get
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof KeypairApi
     */
    public getKeypairGet(options?: RawAxiosRequestConfig) {
        return KeypairApiFp(this.configuration).getKeypairGet(options).then((request) => request(this.axios, this.basePath));
    }
}



/**
 * SceneApi - axios parameter creator
 * @export
 */
export const SceneApiAxiosParamCreator = function (configuration?: Configuration) {
    return {
        /**
         * 
         * @summary Current
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        currentSceneCurrentPost: async (options: RawAxiosRequestConfig = {}): Promise<RequestArgs> => {
            const localVarPath = `/scene/current`;
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }

            const localVarRequestOptions = { method: 'POST', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;


    
            setSearchParams(localVarUrlObj, localVarQueryParameter);
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};

            return {
                url: toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        /**
         * 
         * @summary Loot Any
         * @param {Array<number>} requestBody 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        lootAnySceneLootAnyPost: async (requestBody: Array<number>, options: RawAxiosRequestConfig = {}): Promise<RequestArgs> => {
            // verify required parameter 'requestBody' is not null or undefined
            assertParamExists('lootAnySceneLootAnyPost', 'requestBody', requestBody)
            const localVarPath = `/scene/loot_any`;
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }

            const localVarRequestOptions = { method: 'POST', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;


    
            localVarHeaderParameter['Content-Type'] = 'application/json';

            setSearchParams(localVarUrlObj, localVarQueryParameter);
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};
            localVarRequestOptions.data = serializeDataIfNeeded(requestBody, localVarRequestOptions, configuration)

            return {
                url: toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        /**
         * 
         * @summary Loot One
         * @param {number} lootId 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        lootOneSceneLootOnePost: async (lootId: number, options: RawAxiosRequestConfig = {}): Promise<RequestArgs> => {
            // verify required parameter 'lootId' is not null or undefined
            assertParamExists('lootOneSceneLootOnePost', 'lootId', lootId)
            const localVarPath = `/scene/loot_one`;
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }

            const localVarRequestOptions = { method: 'POST', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;

            if (lootId !== undefined) {
                localVarQueryParameter['loot_id'] = lootId;
            }


    
            setSearchParams(localVarUrlObj, localVarQueryParameter);
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};

            return {
                url: toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
    }
};

/**
 * SceneApi - functional programming interface
 * @export
 */
export const SceneApiFp = function(configuration?: Configuration) {
    const localVarAxiosParamCreator = SceneApiAxiosParamCreator(configuration)
    return {
        /**
         * 
         * @summary Current
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async currentSceneCurrentPost(options?: RawAxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<CurrentSceneModel>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.currentSceneCurrentPost(options);
            const localVarOperationServerIndex = configuration?.serverIndex ?? 0;
            const localVarOperationServerBasePath = operationServerMap['SceneApi.currentSceneCurrentPost']?.[localVarOperationServerIndex]?.url;
            return (axios, basePath) => createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration)(axios, localVarOperationServerBasePath || basePath);
        },
        /**
         * 
         * @summary Loot Any
         * @param {Array<number>} requestBody 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async lootAnySceneLootAnyPost(requestBody: Array<number>, options?: RawAxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<CurrentSceneModel>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.lootAnySceneLootAnyPost(requestBody, options);
            const localVarOperationServerIndex = configuration?.serverIndex ?? 0;
            const localVarOperationServerBasePath = operationServerMap['SceneApi.lootAnySceneLootAnyPost']?.[localVarOperationServerIndex]?.url;
            return (axios, basePath) => createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration)(axios, localVarOperationServerBasePath || basePath);
        },
        /**
         * 
         * @summary Loot One
         * @param {number} lootId 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async lootOneSceneLootOnePost(lootId: number, options?: RawAxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<CurrentSceneModel>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.lootOneSceneLootOnePost(lootId, options);
            const localVarOperationServerIndex = configuration?.serverIndex ?? 0;
            const localVarOperationServerBasePath = operationServerMap['SceneApi.lootOneSceneLootOnePost']?.[localVarOperationServerIndex]?.url;
            return (axios, basePath) => createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration)(axios, localVarOperationServerBasePath || basePath);
        },
    }
};

/**
 * SceneApi - factory interface
 * @export
 */
export const SceneApiFactory = function (configuration?: Configuration, basePath?: string, axios?: AxiosInstance) {
    const localVarFp = SceneApiFp(configuration)
    return {
        /**
         * 
         * @summary Current
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        currentSceneCurrentPost(options?: RawAxiosRequestConfig): AxiosPromise<CurrentSceneModel> {
            return localVarFp.currentSceneCurrentPost(options).then((request) => request(axios, basePath));
        },
        /**
         * 
         * @summary Loot Any
         * @param {Array<number>} requestBody 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        lootAnySceneLootAnyPost(requestBody: Array<number>, options?: RawAxiosRequestConfig): AxiosPromise<CurrentSceneModel> {
            return localVarFp.lootAnySceneLootAnyPost(requestBody, options).then((request) => request(axios, basePath));
        },
        /**
         * 
         * @summary Loot One
         * @param {number} lootId 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        lootOneSceneLootOnePost(lootId: number, options?: RawAxiosRequestConfig): AxiosPromise<CurrentSceneModel> {
            return localVarFp.lootOneSceneLootOnePost(lootId, options).then((request) => request(axios, basePath));
        },
    };
};

/**
 * SceneApi - object-oriented interface
 * @export
 * @class SceneApi
 * @extends {BaseAPI}
 */
export class SceneApi extends BaseAPI {
    /**
     * 
     * @summary Current
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof SceneApi
     */
    public currentSceneCurrentPost(options?: RawAxiosRequestConfig) {
        return SceneApiFp(this.configuration).currentSceneCurrentPost(options).then((request) => request(this.axios, this.basePath));
    }

    /**
     * 
     * @summary Loot Any
     * @param {Array<number>} requestBody 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof SceneApi
     */
    public lootAnySceneLootAnyPost(requestBody: Array<number>, options?: RawAxiosRequestConfig) {
        return SceneApiFp(this.configuration).lootAnySceneLootAnyPost(requestBody, options).then((request) => request(this.axios, this.basePath));
    }

    /**
     * 
     * @summary Loot One
     * @param {number} lootId 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof SceneApi
     */
    public lootOneSceneLootOnePost(lootId: number, options?: RawAxiosRequestConfig) {
        return SceneApiFp(this.configuration).lootOneSceneLootOnePost(lootId, options).then((request) => request(this.axios, this.basePath));
    }
}



