const SeoulIlboCrawler = require('../lib/SeoulIlboCrawler');
const KyeonghangCrawler = require('../lib/KyeonghangCrawler');
const DongaCrawler = require('../lib/DongaCrawler');
const ChoongangIlboCrawler = require('../lib/ChoongangIlboCrawler');
const Config = require('../lib/Config');
const newsConfig = Config['news'];

const sOption = {
	baseUrl: newsConfig['seoul']['baseUrl'],
	kind: newsConfig['seoul']['kind']['economy'],
	pageUrlSelector: newsConfig['seoul']['pageUrlSelector'],
	processResult: function(result) {
		console.log(result);
	},
	shouldStopCrawl: function() {
		return false;
	}
}

const cOption = {
	baseUrl: newsConfig['choongang']['baseUrl'],
	kind: newsConfig['choongang']['kind']['economy'],
	pageUrlSelector: newsConfig['choongang']['pageUrlSelector'],
	processResult: function(result) {
		console.log(result);
	},
	shouldStopCrawl: function() {
		return false;
	}
}

const kOption = {
	baseUrl: newsConfig['kyeonghang']['baseUrl'],
	kind: newsConfig['kyeonghang']['kind']['society'],
	pageUrlSelector: newsConfig['kyeonghang']['pageUrlSelector'],
	processResult: function(result) {
		console.log(result);
	},
	shouldStopCrawl: function() {
		return false;
	}
}

const dOption = {
	baseUrl: newsConfig['donga']['baseUrl'],
	kind: newsConfig['donga']['kind']['event'],
	pageUrlSelector: newsConfig['donga']['pageUrlSelector'],
	processResult: function(result) {
		console.log(result);
	},
	shouldStopCrawl: function() {
		return false;
	}
}

// const testCrawler = SeoulIlboCrawler(sOption);
const testCrawler = DongaCrawler(dOption);
testCrawler.startCrawl();