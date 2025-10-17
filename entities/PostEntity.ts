import { host, port } from "../app.ts";
import { Entity } from "./Entity.ts";

export class PostEntity implements Entity {
    constructor() {}

    async getAll(): Promise<any> {
        try {
            return await fetch(`http://${host}:${port}/posts`)
                .then(response => response.json())
                .then(json => console.log(json));
        } catch (error: any) {
            console.log(`PostEntity.ts:getAll: ${error.message}`);
        }
    }

    async getById(id: number): Promise<any> {
        try {
            return await fetch(`http://${host}:${port}/posts/${id}`)
                .then(response => response.json())
                .then(json => console.log(json));
        } catch (error: any) {
            console.log(`PostEntity.ts:getById: ${error.message}`);
        }
    }
}
