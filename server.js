import Koa from 'koa';

const server = new Koa();
const port = process.env.PORT || 3000;

// Response
server.use(async (ctx) => {
  ctx.body = 'Hello World';
});

server.listen(port, () => console.log('Server started on port ', port));

export default server;