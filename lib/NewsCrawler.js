const axios = require('axios');
const cheerio = require('cheerio');
const fs = require('fs');

const NewsCrawler = function() {
	if(this.constructor === NewsCrawler) throw new Error('NewsCrawler is an abstract class');
}

NewsCrawler.prototype.option = undefined;

NewsCrawler.prototype.isOptionValid = function(option) {
	/*
		option should be like this

		option: {
			baseUrl: xxxxxx,
			kind: xxxx,
			pageUrlSelector: xxxx
		}
	*/
	if(!('baseUrl' in option)) return false;
	if(!('kind' in option)) return false;
	if(!('pageUrlSelector' in option)) return false;

	return true;
}

NewsCrawler.prototype.curListIdx = 0;

NewsCrawler.prototype.genListUrl = function(kind, page) {
	return new Error('Not Implemented');
};

NewsCrawler.prototype.getNextListUrl = function(kind, curListIdx) {
	return this.genListUrl(kind, curListIdx+1);
}

NewsCrawler.prototype.pageUrlBuffer = [];

NewsCrawler.prototype.loadPageUrls = function(kind, curListIdx, selector) {
	throw new Error('Not Implemented');
} 

NewsCrawler.prototype.getNextPageUrl = function() {
	return this.pageUrlBuffer.pop();
}

NewsCrawler.prototype.parseFromHtml = function(html) {
	throw new Error('Not Implemented');
}

NewsCrawler.prototype.startCrawl = async function() {
	const kind = this.option.kind;
	const pageUrlSelector = this.option.pageUrlSelector;
	let response;

	while(!this.shouldStopCrawl()){
		if(this.pageUrlBuffer.length === 0){
			try {
				await this.loadPageUrls(kind ,this.curListIdx++, pageUrlSelector);
			} catch(err) {
				console.error(err);
			}
		}

		let pageUrl = this.getNextPageUrl();
		console.log('crawling '+pageUrl+'in '+this.curListIdx+'pg...');

		try{
			let config = {
				baseURL: this.option.baseUrl,
				responseType: 'arraybuffer'
			};

			console.log(pageUrl);
			response = await axios.get(pageUrl, config);

		    let rawResult = response.data;
			
			// convert euc kr to utr 8
			const $ = cheerio.load(response.data);
		    let charset = $('meta[http-equiv="Content-Type"]').attr('content') || 'UTF-8';

			if(charset && charset.toUpperCase().indexOf('EUC-KR') > -1){
				const Iconv = require('iconv').Iconv;
			    const iconv = new Iconv('euc-kr', 'utf-8//translit//ignore');
				
				rawResult = iconv.convert(rawResult);
			}

			const parsedResult = this.parseFromHtml(rawResult);
			this.processResult(parsedResult);

			console.log('crawling done');
		} catch(err) {
			console.error(err);
		}
	}
}

NewsCrawler.prototype.processResult = function(result) {
	throw new Error('Please Implement Crawler.prototype.processResult');
}

NewsCrawler.prototype.shouldStopCrawl = function() {
	throw new Error('Please Implement Crawler.prototype.shouldStopCrawl')
}

module.exports = NewsCrawler;