import Fastify, { FastifyInstance } from "fastify";
import cors from "@fastify/cors";

import { DotenvOptions } from "./guards/env";
import { Endpoint } from "./endpoint";

/**
 * Server class to initialize the server
 * @class Server
 * @constructor
 * @param {FastifyInstance} fastify - Fastify instance
 * @param {FastifyRequest} request - Fastify request
 * @param {FastifyReply} reply - Fastify reply
 * @param {RoutesOptions} opts - Routes options
 * @returns {void}
 */
class Server {
  private fastify: FastifyInstance;

  constructor() {
    this.fastify = Fastify({
      logger: true,
    });
  }

  public async start(): Promise<void> {
    try {
      const serverport = process.env.PORT || 1069; 
      await this.fastify.listen({ port: serverport });
      console.log(`Server is listening on Port ${serverport}`);
    } catch (err) {
      this.fastify.log.error(err);
      process.exit(1);
    }
  }

  public addCors(): void {
    this.fastify.register(cors, {
      origin: process.env.ORIGIN_URL || "http://localhost:3000",
      methods: ["GET", "POST"],
      allowedHeaders: ["Content-Type"],
    });
  }
  /*
  Registers all routes from the Endpoint (moved into its own function)
  @returns {void}
  */
  public async registerRoutes(): Promise<void> {
    Endpoint(this.fastify);
  }

  public async checkEnv(): Promise<void> {
    DotenvOptions();
  }
}

// Create a new server,
// check the environment variables,
// register the routes,
// add cors,
// start the server.
export function initServer() {
  const server = new Server();
  server.checkEnv();
  server.registerRoutes();
  server.addCors();
  server.start();
}
