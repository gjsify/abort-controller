
import { run } from '@gjsify/unit';

import { AbortControllerTest } from './abort-controller.spec.js';
import { AbortSignalTest } from './abort-signal.spec.js';

run({AbortControllerTest, AbortSignalTest});