// client/src/utils/storage.js
// LocalStorage abstraction with safe fallback

export function getStoredData(key, fallback) {
    try {
        const item = localStorage.getItem(`medivault_${key}`);
        return item ? JSON.parse(item) : fallback;
    } catch (e) {
        console.warn(`Error reading ${key} from storage:`, e);
        return fallback;
    }
}

export function setStoredData(key, data) {
    try {
        localStorage.setItem(`medivault_${key}`, JSON.stringify(data));
    } catch (e) {
        console.warn(`Error writing ${key} to storage:`, e);
    }
}

export function clearStoredData(key) {
    try {
        localStorage.removeItem(`medivault_${key}`);
    } catch (e) {
        console.warn(`Error clearing ${key} from storage:`, e);
    }
}
