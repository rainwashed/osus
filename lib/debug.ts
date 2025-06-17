import store from "store2";

const debugState: boolean | undefined = (window as any)?.ENABLE_DEBUG || store.get("debugEnabled") || false;
const originalConsole = console.log;
const originalWarn = console.warn;
const originalError = console.error;

console.log = (...args) => {
    if (debugState) {
        originalConsole.apply(console, args);
    }
};

console.warn = (...args) => {
    if (debugState) {
        originalWarn.apply(console, args);
    }
};

console.error = (...args) => {
    if (debugState) {
        originalError.apply(console, args);
    }
};
