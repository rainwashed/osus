// plugins/event-bus.ts
import mitt from 'mitt'

type Events = {
    [key: string]: any
}

export default defineNuxtPlugin(() => {
    const emitter = mitt<Events>()

    // Make it available globally via `useNuxtApp().$bus`
    return {
        provide: {
            bus: emitter
        }
    }
})
