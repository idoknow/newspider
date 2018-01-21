const NewsCrawler = require('./NewsCrawler');
const cheerio = require('cheerio');
const axios = require('axios');

const ChoongangIlboCrawler = function(option) {
	if(!(this instanceof ChoongangIlboCrawler)) return new ChoongangIlboCrawler(option);

	NewsCrawler.apply(this, arguments);
	if(!this.isOptionValid(option)) throw new Error('option is not valid');

	this.option = option;
	this.pageUrlBuffer = [];
}


ChoongangIlboCrawler.prototype = Object.create(NewsCrawler.prototype);

ChoongangIlboCrawler.prototype.constructor = ChoongangIlboCrawler;

ChoongangIlboCrawler.prototype.genListUrl =  function(kind, page) {
	return this.option.baseUrl+kind+'/list?page='+page;
}

ChoongangIlboCrawler.prototype.loadPageUrls = function(kind, curListIdx, selector) {
	if(this.pageUrlBuffer.length === 0) {
		const listUrl = this.getNextListUrl(kind, curListIdx);
		return axios.get(listUrl)
			.then(response => {
				const $ = cheerio.load(response.data);
				const elements = $(selector);

				let pageUrls = elements.map(function(i, element) {
					return element.children[1].attribs['href'];
				}).get();

				pageUrls = pageUrls.reverse();
				this.pageUrlBuffer = pageUrls.slice();
			})
			.catch(err => {
				throw new Error(err.message);
			});
	}
}

ChoongangIlboCrawler.prototype.parseFromHtml = function(html) {
	const $ = cheerio.load(html);
	const head = $('#article_title').text();
	const body = $('#article_body').text();

	return {
		head: head,
		body: body
	};
}

module.exports = ChoongangIlboCrawler;