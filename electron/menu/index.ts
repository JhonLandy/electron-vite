import { attachTitlebarToWindow, setupTitlebar } from "custom-electron-titlebar/main";
import type { BrowserWindow, MenuItemConstructorOptions } from "electron";
import { Menu } from "electron";

Menu.setApplicationMenu(null);

const template: Array<MenuItemConstructorOptions> = [
    {
        label: "菜单demo",
        submenu: [{ label: "demo" }],
    },
    {
        label: "看看",
        submenu: [{ label: "demo1" }, { label: "demo2" }, { label: "demo3" }, { label: "demo4" }],
    },
];

/**
 * @description 在主线程设置应用顶部菜单
 */
export function setApplicationMenu() {
    const menu = Menu.buildFromTemplate(template);
    Menu.setApplicationMenu(menu);
}
export function attchMenuEvent(callback: () => BrowserWindow) {
    setupTitlebar();
    return () => {
        const browserWindow = callback();
        if (browserWindow) {
            attachTitlebarToWindow(browserWindow);
        }
    };
}
setApplicationMenu();
