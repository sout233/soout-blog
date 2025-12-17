export type ToastLevel = 'info' | 'success' | 'warning' | 'error' | 'wtf';

export interface ToastItem {
    id: string;
    message: string;
    level: ToastLevel;
    duration: number;
}

class ToastManager {
    toasts = $state<ToastItem[]>([]);

    add(message: string, level: ToastLevel = 'info', duration = 3000) {
        const id = crypto.randomUUID();
        
        this.toasts.push({ id, message, level, duration });

        if (duration > 0) {
            setTimeout(() => {
                this.remove(id);
            }, duration);
        }
    }

    remove(id: string) {
        this.toasts = this.toasts.filter((t) => t.id !== id);
    }

    success(msg: string, duration = 3000) { this.add(msg, 'success', duration); }
    error(msg: string, duration = 4000) { this.add(msg, 'error', duration); }
    warning(msg: string, duration = 3000) { this.add(msg, 'warning', duration); }
    info(msg: string, duration = 3000) { this.add(msg, 'info', duration); }
    wtf(msg: string, duration = 5000) { this.add(msg, 'wtf', duration); }
}

export const toast = new ToastManager();