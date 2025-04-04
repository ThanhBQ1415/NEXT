import { FastifyInstance, FastifyPluginOptions } from 'fastify';

export default async function testRoutes(fastify: FastifyInstance, options: FastifyPluginOptions) {
  fastify.get('/', async (request, reply) => {
    reply.send({
      message: '11111111111111 !'
    });
  });

  fastify.get('/thanh', async (request, reply) => {
    reply.send({
      message: 'Thanh đẹp trai!'
    });
  });
}
