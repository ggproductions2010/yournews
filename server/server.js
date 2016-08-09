import Koa from 'koa';
import serve from 'koa-static';

import parseHackerNews from './parser/hacker-news-parser';

const server = new Koa();
const port = process.env.PORT || 3000;

// Response
server.use(async (ctx, next) => {
  let items = await parseHackerNews();
  ctx.body = {
    items: items,
  }
});

server.use(serve('client/'))

server.listen(port, () => console.log('Server started on port ', port));

export default server;