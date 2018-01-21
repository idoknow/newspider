const SeoulIlboCrawler = require('./SeoulIlboCrawler');
const ChoongangIlboCrawler = require('./ChoongangIlboCrawler');

const sOption = {
	baseUrl: 'http://www.seoulilbo.com/news',
	kind: 'S2N22',
	pageUrlSelector: '.list-titles'
}

const cOption = {
	baseUrl: 'http://news.joins.com',
	kind: '/politics/diplomacy',
	pageUrlSelector: '.headline'
}

// const testCrawler = SeoulIlboCrawler(option);
const testCrawler = ChoongangIlboCrawler(cOption);
testCrawler.startCrawl();