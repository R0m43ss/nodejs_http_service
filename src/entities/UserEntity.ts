import { host, port } from "../app.ts";
import { Entity } from "./Entity.ts";

export class UserEntity implements Entity {
    constructor() {}

    async getAll(): Promise<any> {
        try {
            return await fetch(`http://${host}:${port}/users`)
                .then(response => response.json())
                .then(json => console.log(json));
        } catch (error: any) {
            console.log(`UserEntity.ts:getAll: ${error.message}`);
        }
    }

    async getById(id: number): Promise<any> {
        try {
            return await fetch(`http://${host}:${port}/users/${id}`)
                .then(response => response.json())
                .then(json => console.log(json));
        } catch (error: any) {
            console.log(`UserEntity.ts:getById: ${error.message}`);
        }
    }
}