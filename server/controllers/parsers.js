import parseHackerNews from '../parsers/hacker-news-parser';
import parseDesignerNews from '../parsers/designer-news-parser';

const hackerNews = function* (next) {
  if ('GET' != this.method) {
    return yield next;
  }
  this.body = yield parseHackerNews()
};

const designerNews = function* (next) {
  if ('GET' != this.method) {
    return yield next;
  }
  this.body = yield parseDesignerNews()
};

// Async Await
// const hackerNews = async function (next) {
//   if ('GET' != this.method) {
//     return await next;
//   }
//   this.body = await parseHackerNews()
// };

// const designerNews = async function (next) {
//   if ('GET' != this.method) {
//     return await next;
//   }
//   this.body = await parseDesignerNews()
// };

module.exports.hackerNews = hackerNews;

module.exports.designerNews = designerNews;