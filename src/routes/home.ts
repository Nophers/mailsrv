import { FastifyInstance, FastifyRequest } from "fastify";
import { RoutesOptions } from "../types";

class HomeRoute {
  private server: FastifyInstance;

  constructor(opts: RoutesOptions) {
    this.server = opts.server;
  }

  public home(): void {
    this.server.get("/", async (request: FastifyRequest) => {
      return { message: "Welcome!" };
    });
  }
}

export async function homeRoute(server: FastifyInstance): Promise<void> {
  const home = new HomeRoute({ server });
  await home.home();
}
