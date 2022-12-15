// @ts-ignore
import { app, BrowserWindow, dialog } from 'electron'
// @ts-ignore
import { installDevTools } from './utils'
// @ts-ignore
// 保持一个对于 window 对象的全局引用，如果你不这样做，
// 当 JavaScript 对象被垃圾回收， window 会被自动地关闭
let win

// 打开主窗口
function createWindow() {
    // 创建浏览器窗口
    win = new BrowserWindow({ width: 800, height: 600 })
    // 加载应用的 index.html
    if (app.isPackaged) {
        win.loadFile("dist-app/index.html");
    } else {
        win.loadURL(process.env.VITE_DEV_SERVER_URL);
    }
    // 当 window 被关闭，这个事件会被触发
    win.on('closed', () => {
        // 取消引用 window 对象
        win = null
    })
}

// Electron 会在创建浏览器窗口时调用这个函数。
app.on('ready', async () => {
    try {
        await installDevTools()
    }catch (e) {
        dialog.showErrorBox("加载devtools发生错误", e)
    } finally {
        createWindow()
    }
});

// 当全部窗口关闭时退出
app.on('window-all-closed', () => {
    // 在 macOS 上，除非用户用 Cmd + Q 确定地退出
    // 否则绝大部分应用会保持激活
    if (process.platform !== 'darwin') {
        app.quit()
    }
})
