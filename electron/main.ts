import { BrowserWindow, app, dialog } from "electron";
import path from "node:path";
import { installDevTools } from "./utils";
let win: BrowserWindow;
let timeId: NodeJS.Timer | undefined;
function getCpuUsage() {
    if (win) {
        win.webContents.on("did-finish-load", () => {
            timeId = setInterval(() => {
                win!.webContents.send("usage", process.getCPUUsage().percentCPUUsage);
            }, 2000);
        });
    }
}
// 打开主窗口
function createWindow() {
    // 创建浏览器窗口
    win = new BrowserWindow({
        width: 100,
        height: 100,
        frame: false, //要创建无边框窗口
        type: "toolbar", //创建的窗口类型为工具栏窗口
        hasShadow: false, //不显示阴影
        transparent: true, //设置透明
        webPreferences: {
            devTools: false, //关闭调试工具
            nodeIntegration: !!process.env.ELECTRON_NODE_INTEGRATION,
            contextIsolation: !process.env.ELECTRON_NODE_INTEGRATION,
            preload: path.resolve(__dirname, "../src/preload.js"),
        },
    });
    // 加载应用的 index.html
    if (app.isPackaged) {
        win.loadFile("dist-app/index.html");
    } else {
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        win.loadURL(process.env.VITE_DEV_SERVER_URL!);
    }
    getCpuUsage();

    // 当 window 被关闭，这个事件会被触发
    win.on("closed", () => {
        // 取消引用 window 对象
        win = null;
        clearInterval(timeId);
    });
}

let winBall;
async function createSmallBallWindow() {
    winBall = new BrowserWindow({
        width: 60, //悬浮窗口的宽度 比实际DIV的宽度要多2px 因为有1px的边框
        height: 60, //悬浮窗口的高度 比实际DIV的高度要多2px 因为有1px的边框
        type: "toolbar", //创建的窗口类型为工具栏窗口
        frame: false, //要创建无边框窗口
        resizable: false, //禁止窗口大小缩放
        show: false, //先不让窗口显示
        webPreferences: {
            devTools: false, //关闭调试工具
        },
        transparent: true, //设置透明
        hasShadow: false, //不显示阴影
        alwaysOnTop: true, //窗口是否总是显示在其他窗口之前
        // backgroundColor: '#eee',
        // webPreferences: {
        //     // Use pluginOptions.nodeIntegration, leave this alone
        //     // See nklayman.github.io/vue-cli-plugin-electron-builder/guide/security.html#node-integration for more info
        //     nodeIntegration: process.env.ELECTRON_NODE_INTEGRATION,
        //     contextIsolation: !process.env.ELECTRON_NODE_INTEGRATION,
        //     // preload: path.join(__dirname, 'preload.js'),
        // },
    });
}
// Electron 会在创建浏览器窗口时调用这个函数。
app.on("ready", async () => {
    try {
        await installDevTools(["vue3-devtools"]);
    } catch (e) {
        dialog.showErrorBox("发生错误", "加载devtools发生错误");
    } finally {
        createWindow();
    }
});
// 当全部窗口关闭时退出
app.on("window-all-closed", () => {
    // 在 macOS 上，除非用户用 Cmd + Q 确定地退出
    // 否则绝大部分应用会保持激活
    if (process.platform !== "darwin") {
        app.quit();
    }
});
