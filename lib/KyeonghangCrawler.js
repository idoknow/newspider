const NewsCrawler = require('./NewsCrawler');
const cheerio = require('cheerio');
const axios = require('axios');

const KyeonghangCrawler = function(option) {
	if(!(this instanceof KyeonghangCrawler)) return new KyeonghangCrawler(option);

	NewsCrawler.apply(this, arguments);
	if(!this.isOptionValid(option)) throw new Error('option is not valid');

	this.option = option;
	this.pageUrlBuffer = [];
}

KyeonghangCrawler.prototype = Object.create(NewsCrawler.prototype);

KyeonghangCrawler.prototype.constructor = KyeonghangCrawler;

KyeonghangCrawler.prototype.genListUrl =  function(kind, page) {
	return this.option.baseUrl+'/kh_news/khan_art_list.html?code='+kind+'&page='+page;
}

KyeonghangCrawler.prototype.loadPageUrls = function(kind, curListIdx, selector) {
	const crawler = this;

	if(this.pageUrlBuffer.length === 0) {
		const listUrl = this.getNextListUrl(kind, curListIdx);

		return axios.get(listUrl)
			.then(response => {
				const $ = cheerio.load(response.data);
				const elements = $(selector);

				let pageUrls = elements.map(function(i, element) {
					return element.children[1].attribs['href'].split(crawler.option.baseUrl)[1];
				}).get();

				pageUrls = pageUrls.reverse();
				this.pageUrlBuffer = pageUrls.slice();
			})
			.catch(err => {
				throw new Error(err.message);
			});
	}
}

KyeonghangCrawler.prototype.parseFromHtml = function(html) {
	const $ = cheerio.load(html);
	const head = $('#article_title').text();
	const body = $('.art_body').text();

	return {
		head: head,
		body: body
	};
}

module.exports = KyeonghangCrawler;