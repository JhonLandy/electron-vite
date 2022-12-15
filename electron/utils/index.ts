import path from "node:path"
import url from "node:url"
// @ts-ignore
import { app, session } from "electron"

export function resolveAppPath(resource: string) {
    return url.pathToFileURL(path.join(app.getAppPath(), resource)).href
}
export function installDevTools() {
    const devtoolPaths = [
        // 安装vue-devtools
        "./vue3-devtools",
    ];
    return Promise.all(
            devtoolPaths.map(devtoolPath => {
                return session.defaultSession.loadExtension(path.join(process.cwd(), `/extensions/${devtoolPath}`))
            }))
}

