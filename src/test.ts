
import { run } from '@gjsify/unit';

import testAbortController from './abort-controller.spec.js';
import testAbortSignal from './abort-signal.spec.js';

run({testAbortController, testAbortSignal});