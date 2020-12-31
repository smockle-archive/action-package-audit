#!/usr/bin/env node --es-module-specifier-resolution=node
// @ts-check

import { exec } from "child_process";
import { promisify } from "util";
const execAsync = promisify(exec);

/**
 * @typedef {Object} Result
 * @property {string} stdout Content written to the `stdout` buffer
 * @property {string} stderr Content written to the `stderr` buffer
 */

/**
 * Run the given shell command using `child_process.exec` and handle the result.
 * @param command A shell command
 * @returns {Promise<Result>}
 */
export async function run(command) {
  console.log(`Running '${command}'`)
  let stdout, stderr;
  try {
    ({ stdout, stderr } = await execAsync(command));
  } catch (error) {
    // Exit if there was an error
    console.error(error);
    process.exit(1);
  }
  // Don’t swallow errors from the `exec`’d command
  if (stderr) {
    console.error(stderr);
  }
  return { stdout, stderr };
}
