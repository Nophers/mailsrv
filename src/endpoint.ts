import { FastifyInstance } from "fastify";

import { homeRoute } from "./routes/home";
import { statusRoute } from "./routes/status";
import { emailRoute } from "./routes/email";

export function Endpoint(fastify: FastifyInstance) {
  fastify.register(homeRoute);
  fastify.register(statusRoute);
  fastify.register(emailRoute);
}
