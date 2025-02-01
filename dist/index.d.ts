interface Window {
    name?: string;
    ownerName: string;
    [key: string]: any;
}
interface GetWindowsOptions {
    onScreenOnly?: boolean;
    showAllWindows?: boolean;
}
declare function activateWindow(windowName: string): Promise<void>;
export declare const getWindowsList: (opts?: GetWindowsOptions) => Promise<Window[]>;
export { activateWindow };
