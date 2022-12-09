import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { EmailBody, RoutesOptions } from "../types";
import { checkDisposable } from "../guards/disposable";

import nodemailer from "nodemailer";

/**
 * POST for sending an email
 * @class EmailRoute
 * @constructor
 * @param {FastifyInstance} server - Fastify instance
 * @param {FastifyRequest} request - Fastify request
 * @param {FastifyReply} reply - Fastify reply
 * @param {Email} body - Email body
 * @param {Message} message - Email message
 * @returns {void}
 */

class EmailRoute {
  private server: FastifyInstance;

  constructor(opts: RoutesOptions) {
    this.server = opts.server;
  }

  public email(): void {
    this.server.post(
      "/email",
      {
        schema: {
          body: {
            type: "object",
            properties: {
              email: { type: "string" },
              message: { type: "string" },
            },
          },
        },
      },
      async (request: FastifyRequest, reply: FastifyReply) => {
        const body = request.body as EmailBody;
        const { email, message } = body;
        if (!email || !message)
          return reply
            .code(400)
            .send({ InvalidEmail: "Email or Message must be set" });

        const disposable = await checkDisposable(email);
        if (disposable)
          return reply
            .code(400)
            .send({ EmailError: "Please use a different email address." });

        await sendEmail(email, message);
        reply.send({ EmailSuccess: "Successfully sent email." });
      }
    );
  }
}

async function sendEmail(email: string, content: string) {
  let transporter = nodemailer.createTransport({
    host: process.env.HOST || "smtp.gmail.com",
    secure: true,
    auth: {
      user: process.env.EMAIL,
      pass: process.env.TOKEN,
    },
  });

  let info = await transporter.sendMail({
    from: "Mail Srv",
    to: email,
    subject: "Mail Srv Message",
    text: content,
  });

  try {
    await transporter.sendMail(info);
  } catch (error) {
    console.log(error);
  }
}

export async function emailRoute(server: FastifyInstance): Promise<void> {
  const email = new EmailRoute({ server });
  await email.email();
}
