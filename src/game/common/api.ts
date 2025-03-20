/* tslint:disable */
/* eslint-disable */
/**
 * FastAPI
 * No description provided (generated by Openapi Generator https://github.com/openapitools/openapi-generator)
 *
 * The version of the OpenAPI document: 0.1.0
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
 * @interface HeroSelect
 */
export interface HeroSelect {
    /**
     * 
     * @type {number}
     * @memberof HeroSelect
     */
    'hero_id': number;
    /**
     * 
     * @type {number}
     * @memberof HeroSelect
     */
    'user_id': number;
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
 * DefaultApi - axios parameter creator
 * @export
 */
export const DefaultApiAxiosParamCreator = function (configuration?: Configuration) {
    return {
        /**
         * 
         * @summary Generate Keypair
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        generateKeypairGenerateKeypairGet: async (options: RawAxiosRequestConfig = {}): Promise<RequestArgs> => {
            const localVarPath = `/generate_keypair`;
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
         * @summary Hero Select
         * @param {HeroSelect} heroSelect 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        heroSelectHeroSelectPost: async (heroSelect: HeroSelect, options: RawAxiosRequestConfig = {}): Promise<RequestArgs> => {
            // verify required parameter 'heroSelect' is not null or undefined
            assertParamExists('heroSelectHeroSelectPost', 'heroSelect', heroSelect)
            const localVarPath = `/hero_select`;
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
            localVarRequestOptions.data = serializeDataIfNeeded(heroSelect, localVarRequestOptions, configuration)

            return {
                url: toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        /**
         * 
         * @summary Login
         * @param {string} publicKey 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        loginLoginGet: async (publicKey: string, options: RawAxiosRequestConfig = {}): Promise<RequestArgs> => {
            // verify required parameter 'publicKey' is not null or undefined
            assertParamExists('loginLoginGet', 'publicKey', publicKey)
            const localVarPath = `/login`;
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }

            const localVarRequestOptions = { method: 'GET', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;

            if (publicKey !== undefined) {
                localVarQueryParameter['public_key'] = publicKey;
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
 * DefaultApi - functional programming interface
 * @export
 */
export const DefaultApiFp = function(configuration?: Configuration) {
    const localVarAxiosParamCreator = DefaultApiAxiosParamCreator(configuration)
    return {
        /**
         * 
         * @summary Generate Keypair
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async generateKeypairGenerateKeypairGet(options?: RawAxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<any>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.generateKeypairGenerateKeypairGet(options);
            const localVarOperationServerIndex = configuration?.serverIndex ?? 0;
            const localVarOperationServerBasePath = operationServerMap['DefaultApi.generateKeypairGenerateKeypairGet']?.[localVarOperationServerIndex]?.url;
            return (axios, basePath) => createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration)(axios, localVarOperationServerBasePath || basePath);
        },
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
         * @summary Hero Select
         * @param {HeroSelect} heroSelect 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async heroSelectHeroSelectPost(heroSelect: HeroSelect, options?: RawAxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<any>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.heroSelectHeroSelectPost(heroSelect, options);
            const localVarOperationServerIndex = configuration?.serverIndex ?? 0;
            const localVarOperationServerBasePath = operationServerMap['DefaultApi.heroSelectHeroSelectPost']?.[localVarOperationServerIndex]?.url;
            return (axios, basePath) => createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration)(axios, localVarOperationServerBasePath || basePath);
        },
        /**
         * 
         * @summary Login
         * @param {string} publicKey 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async loginLoginGet(publicKey: string, options?: RawAxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<any>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.loginLoginGet(publicKey, options);
            const localVarOperationServerIndex = configuration?.serverIndex ?? 0;
            const localVarOperationServerBasePath = operationServerMap['DefaultApi.loginLoginGet']?.[localVarOperationServerIndex]?.url;
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
         * @summary Generate Keypair
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        generateKeypairGenerateKeypairGet(options?: RawAxiosRequestConfig): AxiosPromise<any> {
            return localVarFp.generateKeypairGenerateKeypairGet(options).then((request) => request(axios, basePath));
        },
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
         * @summary Hero Select
         * @param {HeroSelect} heroSelect 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        heroSelectHeroSelectPost(heroSelect: HeroSelect, options?: RawAxiosRequestConfig): AxiosPromise<any> {
            return localVarFp.heroSelectHeroSelectPost(heroSelect, options).then((request) => request(axios, basePath));
        },
        /**
         * 
         * @summary Login
         * @param {string} publicKey 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        loginLoginGet(publicKey: string, options?: RawAxiosRequestConfig): AxiosPromise<any> {
            return localVarFp.loginLoginGet(publicKey, options).then((request) => request(axios, basePath));
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
     * @summary Generate Keypair
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof DefaultApi
     */
    public generateKeypairGenerateKeypairGet(options?: RawAxiosRequestConfig) {
        return DefaultApiFp(this.configuration).generateKeypairGenerateKeypairGet(options).then((request) => request(this.axios, this.basePath));
    }

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
     * @summary Hero Select
     * @param {HeroSelect} heroSelect 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof DefaultApi
     */
    public heroSelectHeroSelectPost(heroSelect: HeroSelect, options?: RawAxiosRequestConfig) {
        return DefaultApiFp(this.configuration).heroSelectHeroSelectPost(heroSelect, options).then((request) => request(this.axios, this.basePath));
    }

    /**
     * 
     * @summary Login
     * @param {string} publicKey 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof DefaultApi
     */
    public loginLoginGet(publicKey: string, options?: RawAxiosRequestConfig) {
        return DefaultApiFp(this.configuration).loginLoginGet(publicKey, options).then((request) => request(this.axios, this.basePath));
    }
}



