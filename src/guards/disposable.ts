import { disposed } from "mailify";

/**
 * Module to check if a email is disposable
 * @module checkDisposable
 * @param {string} email - Email to check
 * @returns {boolean} - Returns true if the email is disposable
 * @example checkDisposable(" [email protected] ")
 */
export async function checkDisposable(email: string) {
  const check = await disposed(email);
  if (check.disposable) return true;
  return false;
}
