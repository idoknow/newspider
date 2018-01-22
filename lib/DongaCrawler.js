const NewsCrawler = require('./NewsCrawler');
const cheerio = require('cheerio');
const axios = require('axios');

const DongaCrawler = function(option) {
	if(!(this instanceof DongaCrawler)) return new DongaCrawler(option);

	NewsCrawler.apply(this, arguments);
	if(!this.isOptionValid(option)) throw new Error('option is not valid');

	this.option = option;
	this.pageUrlBuffer = [];
}

DongaCrawler.prototype = Object.create(NewsCrawler.prototype);

DongaCrawler.prototype.constructor = DongaCrawler;

DongaCrawler.prototype.genListUrl =  function(kind, page) {
	return this.option.baseUrl+'/List'+kind+'?p='+((page-1)*20+1);
}

DongaCrawler.prototype.loadPageUrls = function(kind, curListIdx, selector) {
	const crawler = this;

	if(this.pageUrlBuffer.length === 0) {
		const listUrl = this.getNextListUrl(kind, curListIdx);
		return axios.get(listUrl)
			.then(response => {
				const $ = cheerio.load(response.data);
				const elements = $(selector);

				let pageUrls = elements.map(function(i, element) {
					return element.children[0].attribs['href'].split(crawler.option.baseUrl)[1];					
				}).get();

				pageUrls = pageUrls.reverse();
				this.pageUrlBuffer = pageUrls.slice();
			})
			.catch(err => {
				throw new Error(err.message);
			});
	}
}

DongaCrawler.prototype.parseFromHtml = function(html) {
	const $ = cheerio.load(html);
	const head = $('.article_title>h2.title').text();
	const body = $('.article_txt').text();

	return {
		head: head,
		body: body
	};
}

module.exports = DongaCrawler;