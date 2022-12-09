import { FastifyInstance, FastifyPluginOptions } from "fastify";

/**
 * Small middleware for the routes
 * @param server
 * @returns {Promise<void>}
 */
export interface RoutesOptions extends FastifyPluginOptions {
  server: FastifyInstance;
}

export interface DotenvOptions {
  EMAIL: string;  // Email address for the SMTP server
  TOKEN: string; // Mail token
}

export interface EmailBody {
  email: string;
  message: string;
}
