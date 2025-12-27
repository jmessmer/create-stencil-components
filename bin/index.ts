#!/usr/bin/env node

import { cli } from '../src/cli.js';

try {
  await cli();
} catch (error: unknown) {
  if (error instanceof Error) {
    console.error(`Exception while doing something: ${error.message}`);
  }
  process.exit(1);
}