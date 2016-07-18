import Koa from 'koa';
import serve from 'koa-static';

const server = new Koa();
const port = process.env.PORT || 3000;

// Response
// server.use(async (ctx) => {
//   console.log('what is context', ctx);
//   var context = JSON.stringify(ctx);
//   ctx.body = `${context}`;
// });
server.use(serve('client/'))

server.listen(port, () => console.log('Server started on port ', port));

export default server;