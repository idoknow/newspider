const NewsCrawler = require('./NewsCrawler');
const cheerio = require('cheerio');
const axios = require('axios');

const SeoulIlboCrawler = function(option) {
	if(!(this instanceof SeoulIlboCrawler)) return new SeoulIlboCrawler(option);

	NewsCrawler.apply(this, arguments);
	if(!this.isOptionValid(option)) throw new Error('option is not valid');

	this.option = option;
	this.pageUrlBuffer = [];
}

SeoulIlboCrawler.prototype = Object.create(NewsCrawler.prototype);

SeoulIlboCrawler.prototype.constructor = SeoulIlboCrawler;

SeoulIlboCrawler.prototype.genListUrl =  function(kind, page) {
	return this.option.baseUrl+'/articleList.html?sc_sub_section_code='+kind+'&page='+page;
}

SeoulIlboCrawler.prototype.loadPageUrls = function(kind, curListIdx, selector) {
	if(this.pageUrlBuffer.length === 0) {
		const listUrl = this.getNextListUrl(kind, curListIdx);
		return axios.get(listUrl)
			.then(response => {
				const $ = cheerio.load(response.data);
				const elements = $(selector);

				let pageUrls = elements.map(function(i, element) {
					return element.children[0].attribs['href'];
				}).get();

				pageUrls = pageUrls.reverse();
				this.pageUrlBuffer = pageUrls.slice();
			})
			.catch(err => {
				throw new Error(err.message);
			});
	}
}

SeoulIlboCrawler.prototype.parseFromHtml = function(html) {
	const $ = cheerio.load(html);
	const head = $('.headline-title').text();
	const body = $('#articleBody').text();

	return {
		head: head,
		body: body
	};
}

module.exports = SeoulIlboCrawler;