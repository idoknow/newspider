const config = {
	news: {
		seoul: {
			baseUrl: 'http://www.seoulilbo.com/news',
			pageUrlSelector: '.list-titles',
			kind: {
				politic: 'S2N22',
				prism: 'S2N51',
				society: 'S2N24',
				economy: 'S2N23',
				it: 'S2N46',
				weather: 'S2N47',
			}
		},
		choongang: {
			baseUrl: 'http://news.joins.com',
			pageUrlSelector: '.headline',
			kind: {
				assemgov: '/politics/assemgov',
				bluehouse: '/politics/bluehouse',
				diplomacy: '/politics/diplomacy',
				nationdef: '/politics/nk',
				northkorea: '/politics/northkorea',
				economy: '/money/economy',
				finance: '/money/finance',
				stock: 'money/stock',
				it: 'money/itview'
			}
		},
		kyeonghang: {
			baseUrl: 'http://news.khan.co.kr',
			pageUrlSelector: '.hd_title',
			kind: {
				politic: '910100',
				bluehouse: '910203',
				assemgov: '910402',
				nationdef: '910302',
				northkorea: '910303',
				society: '940100',
				event: '940202',
				prosecution: '940301',
				education: '940401',
				work: '940702',
				health: '940601',
				media: '940705'
			}
		},
		donga: {
			baseUrl: 'http://news.donga.com',
			pageUrlSelector: '.rightList',
			kind: {
				bluehouse: '/Politics/CWD',
				assemgov: '/Politics/NA',
				northkorea: '/Politics/NK',
				politics: '/Politics/Dip',
				it: '/It',
				education: '/Society/Edu',
				work: '/Society/Labor',
				event: '/Society/Event'
			}
		}
	}
};

module.exports = config;