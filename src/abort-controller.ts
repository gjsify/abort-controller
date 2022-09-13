import AbortSignal, { abortSignal, createAbortSignal } from "./abort-signal.js";

/**
 * The AbortController.
 * @see https://dom.spec.whatwg.org/#abortcontroller
 */
export default class GjsifyAbortController implements AbortController {
    /**
     * Initialize this controller.
     */
    public constructor() {
        signals.set(this, createAbortSignal())
    }

    /**
     * Returns the `AbortSignal` object associated with this object.
     */
    public get signal(): AbortSignal {
        return getSignal(this)
    }

    /**
     * Abort and signal to any observers that the associated activity is to be aborted.
     */
    public abort(): void {
        abortSignal(getSignal(this))
    }
}

/**
 * Associated signals.
 */
const signals = new WeakMap<GjsifyAbortController, AbortSignal>()

/**
 * Get the associated signal of a given controller.
 */
function getSignal(controller: GjsifyAbortController): AbortSignal {
    const signal = signals.get(controller)
    if (signal == null) {
        throw new TypeError(
            `Expected 'this' to be an 'AbortController' object, but got ${
                controller === null ? "null" : typeof controller
            }`,
        )
    }
    return signal
}

// Properties should be enumerable.
Object.defineProperties(GjsifyAbortController.prototype, {
    signal: { enumerable: true },
    abort: { enumerable: true },
})

if (typeof Symbol === "function" && typeof Symbol.toStringTag === "symbol") {
    Object.defineProperty(GjsifyAbortController.prototype, Symbol.toStringTag, {
        configurable: true,
        value: "AbortController",
    })
}

export { GjsifyAbortController as AbortController, AbortSignal }
