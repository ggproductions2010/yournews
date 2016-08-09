import Koa from 'koa';
import route from 'koa-route';
import serve from 'koa-static';

import parsers from './controllers/parsers'

const server = new Koa();
const port = process.env.PORT || 3000;

server.use(serve('client/'))

server.use(route.get('/hacker-news/', parsers.hackerNews));
server.use(route.get('/designer-news/', parsers.designerNews));

server.listen(port, () => console.log('Server started on port ', port));

export default server;