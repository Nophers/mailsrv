import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { RoutesOptions } from "../types";

class StatusRoute {
  private server: FastifyInstance;

  constructor(opts: RoutesOptions) {
    this.server = opts.server;
  }

  public status(): void {
    this.server.get(
      "/status",
      async (request: FastifyRequest, reply: FastifyReply) => {
        return serverStatus(reply);
      }
    );
  }
}

const serverStatus = (reply: FastifyReply) => {
  try {
    reply.code(200).send({ success: 200 });
  } catch (error) {
    reply.code(500).send({ error: error });
  }
};

export async function statusRoute(server: FastifyInstance): Promise<void> {
  const status = new StatusRoute({ server });
  await status.status();
}
