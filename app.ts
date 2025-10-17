import proxy from "express-http-proxy";
import { PostEntity } from "./entities/PostEntity.ts";
import { UserEntity } from "./entities/UserEntity.ts";
import express from 'express';

const app = express();

const apiUrl = 'https://jsonplaceholder.typicode.com';

export const host = 'localhost';
export const port = 3000;

await init();

async function init(): Promise<void> {
    initProxyServer();

    const posts = new PostEntity();
    const users = new UserEntity();

    await posts.getAll();
    await users.getById(1);
}

function initProxyServer(): void {
    app.use(
        '/', 
        proxy(apiUrl, {
            userResDecorator: (proxyRes, proxyResData, userReq, userRes) => {
                try {
                    const data = JSON.parse(proxyResData);
                    const proxyData = {
                        proxy: true,
                        data: data
                    };
                    return JSON.stringify(proxyData);
                } catch (error: any) {
                    console.log(`Error while parsing response as JSON: ${error.message}`);
                    return proxyResData;
                }
            },
            proxyErrorHandler: (err, res, next) => {
                console.log(`Proxy error: ${err.message}`);
                next(err.message);
            },
            proxyReqPathResolver: function (req) {
                return req.originalUrl; 
            }
        })
    );

    app.listen(port, host, () => {
        console.log(`Proxy server started: http://${host}:${port}`);
    });
}
