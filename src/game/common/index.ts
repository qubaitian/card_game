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

import { DefaultApiFactory } from "./api";
import { Configuration } from "./configuration";

let res = await DefaultApiFactory(new Configuration({
    basePath: "http://0.0.0.0:8000"
})).generateKeypairGenerateKeypairGet();

export const api = DefaultApiFactory(new Configuration({
    basePath: "http://0.0.0.0:8000",
    baseOptions: {
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
            "Authorization": res.data.access_token,
        }
    }
}));
