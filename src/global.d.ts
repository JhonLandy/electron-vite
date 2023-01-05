type IpcRenderer = import("electron").IpcRenderer;
interface AppIpcRenderer extends IpcRenderer {
    changeWindow: (value: "small") => void;
}
declare interface Window {
    ipcRenderer: AppIpcRenderer;
    loadTitlebar: () => void;
}
declare module "*.vue" {
    import type { DefineComponent } from "vue";
    const component: DefineComponent;
    export default component;
}
