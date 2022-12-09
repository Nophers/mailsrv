import { customChecks } from "dotenvguard";
import { DotenvOptions } from "../types";

/**
 * Module to check the environment variables
 * @module DotenvOptions
 * @returns {void}
 */
export function DotenvOptions() {
  customChecks(["EMAIL", "TOKEN"]);
}
