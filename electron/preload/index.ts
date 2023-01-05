/* eslint-disable @typescript-eslint/ban-ts-comment */
import { Color, Titlebar } from "custom-electron-titlebar";
import { contextBridge, ipcRenderer } from "electron";

// Expose ipcRenderer to the client
contextBridge.exposeInMainWorld("ipcRenderer", {
    // @ts-ignore
    send: (...args) => ipcRenderer.send(...args),
    // @ts-ignore
    on: (...args) => ipcRenderer.on(...args),
    changeWindow: (type: string) => ipcRenderer.send("changeWindow", type),
});

window.addEventListener("DOMContentLoaded", () => {
    // Title bar implemenation
    new Titlebar({
        backgroundColor: Color.BLACK,
    });
});
