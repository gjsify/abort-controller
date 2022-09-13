import { AbortController as GjsifyAbortController, AbortSignal as GjsifyAbortSignal } from './abort-controller.js';

export const AbortController = globalThis.AbortController || GjsifyAbortController;
export const AbortSignal = globalThis.AbortSignal || GjsifyAbortSignal;