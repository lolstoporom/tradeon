let storage = {};

storage.set = async (changes, callback = null) => {
	chrome.storage.sync.set(changes, (res) => {
		if(callback != null) {
			callback(res);
		}
	});
};

storage.get = async (keys, callback) => {
	chrome.storage.sync.get(keys, function(result) {
		callback(result);
	});
};

function getSteamid()
{
	return new Promise(function(resolve, reject) {
		storage.get(["steamids"], res => {
			resolve(res.steamids);
		});
	});
}

function getCustomURL()
{
	return new Promise(function(resolve, reject) {
		storage.get(["profileUrl"], res => {
			resolve(res.profileUrl);
		});
	});
}

function getSessionid()
{
	return new Promise(function(resolve, reject) {
		storage.get(["sessionid"], res => {
			resolve(res.sessionid);
		});
	});
}

async function getSteamApiSteamId()
{
	gettingapi = true;
	storage.set({current: "steamapi"});
	if(curtab)
		chrome.tabs.update(curtab, {url: 'https://steamcommunity.com/dev/apikey'}, tab => {
			curtab = tab.id;
		});
	else chrome.tabs.create({url: 'https://steamcommunity.com/dev/apikey', active: false}, (tab) => {
		curtab = tab.id;
	});
}

async function getTradeLink()
{
	storage.set({current: "tradelink"});
	storage.get(["steamids"], res => {
		if(curtab)
			chrome.tabs.update(curtab, {url: `https://steamcommunity.com/profiles/${res.steamids}/tradeoffers/privacy`}, tab => {
				curtab = tab.id;
			});
		else chrome.tabs.create({url: `https://steamcommunity.com/profiles/${res.steamids}/tradeoffers/privacy`, active: false}, (tab) => {
			curtab = tab.id;
		});
	})
}

async function marketAuth()
{
	storage.set({current: "market"});
	if(curtab)
		chrome.tabs.update(curtab, {url: 'https://market.csgo.com/sell'}, tab => {
			curtab = tab.id;
		});
	else chrome.tabs.create({url: 'https://market.csgo.com/sell', active: false}, (tab) => {
		curtab = tab.id;
	});
}

async function checkprofile()
{
	storage.set({current: "checkprofile"});
	if(curtab)
		chrome.tabs.update(curtab, {url: 'https://steamcommunity.com/'}, tab => {
			curtab = tab.id;
		});
	else chrome.tabs.create({url: 'https://steamcommunity.com/', active: false}, tab => {
		curtab = tab.id;
	});
}

async function ViewBroadcast()
{
	storage.set({current: "broadcast"});
	if(curtab)
		chrome.tabs.update(curtab, {url: topbroadcast}, tab => {
			curtab = tab.id;
		});
	else chrome.tabs.create({url: topbroadcast, active: false}, tab => {
		curtab = tab.id;
	});
}

async function SubscribeToWorkshopItem()
{
	storage.set({current: "workshop"});
	if(curtab)
		chrome.tabs.update(curtab, {url: top30workshop[Math.round(Math.random() * 29)]}, tab => {
			curtab = tab.id;
		});
	else chrome.tabs.create({url: top30workshop[Math.round(Math.random() * 29)], active: false}, tab => {
		curtab = tab.id;
	});
}

async function UseDiscoveryQueue()
{
	storage.set({current: "discovery"});
	if(curtab)
		chrome.tabs.update(curtab, {url: 'https://store.steampowered.com/explore/'}, tab => {
			curtab = tab.id;
		});
	else chrome.tabs.create({url: 'https://store.steampowered.com/explore/', active: false}, tab => {
		curtab = tab.id;
	});
}

async function RateUpContentInActivityFeed()
{
	storage.set({current: "activity"});
	if(curtab)
		chrome.tabs.update(curtab, {url: 'https://steamcommunity.com/id/me/home/'}, tab => {
			curtab = tab.id;
		});
	else chrome.tabs.create({url: 'https://steamcommunity.com/id/me/home/', active: false}, tab => {
		curtab = tab.id;
	});
}

async function AddItemToWishlist()
{
	storage.set({current: "wishlist"});
	if(curtab)
		chrome.tabs.update(curtab, {url: topgames[Math.round(Math.random()*24)]}, tab => {
			curtab = tab.id;
		});
	else chrome.tabs.create({url: topgames[Math.round(Math.random()*24)], active: false}, tab => {
		curtab = tab.id;
	});
}

async function JoinGroup()
{
	storage.set({current: "group"});
	storage.get(['customsettings', 'mode'], res => {
		getSessionid().then(
			sessionid => {
				let group;
				if (res.mode === 5 && res.customsettings.groupon && res.customsettings.group)
					group = res.customsettings.group + "?action=join&sessionID=" + sessionid;
				else group = top100group[Math.round(Math.random() * (top100group.length - 1))].split('?')[0]+"?action=join&sessionID=" + sessionid;

				if (curtab)
					chrome.tabs.update(curtab, {url: group}, tab => {
						curtab = tab.id;
					});
				else chrome.tabs.create({url: group, active: false}, tab => {
					curtab = tab.id;
				});
			});
	});
}

async function ProfileEdit()
{
	storage.set({current: "profileedit", profileEdited: false});
	getSteamid().then(
		steamid => {
			getCustomURL().then(
				customURL => {
					let url;
					if(customURL == steamid)
						url = `https://steamcommunity.com/profiles/${steamid}/edit`
					else
						url = `https://steamcommunity.com/id/${customURL}/edit`
					if (curtab)
						chrome.tabs.update(curtab, {url: url}, tab => {
							curtab = tab.id;
						});
					else chrome.tabs.create({url: url, active: false}, tab => {
						curtab = tab.id;
					});
				});
		});
}

async function SearchInDiscussions()
{
	storage.set({current: "discussions"});
	if(curtab)
		chrome.tabs.update(curtab, {url: "https://steamcommunity.com/discussions/"}, tab => {
			curtab = tab.id;
		});
	else chrome.tabs.create({url: "https://steamcommunity.com/discussions/", active: false}, tab => {
		curtab = tab.id;
	});
}

async function SetupCommunityAvatar()
{
	storage.set({current: "avatar"});
	if(curtab)
		chrome.tabs.update(curtab, {url: "https://steamcommunity.com/actions/GameAvatars/"}, tab => {
			curtab = tab.id;
		});
	else chrome.tabs.create({url: "https://steamcommunity.com/actions/GameAvatars/", active: false}, tab => {
		curtab = tab.id;
	});
}

async function Privacy()
{
	storage.set({current: "privacy"});
	if(curtab)
		chrome.tabs.update(curtab, {url: "https://steamcommunity.com/id/me/edit/settings"}, tab => {
			curtab = tab.id;
		});
	else chrome.tabs.create({url: "https://steamcommunity.com/id/me/edit/settings", active: false}, tab => {
		curtab = tab.id;
	});
}

// init() #функция для получения sessionID, steamID и т.п.
async function Init()
{
	storage.set({current: "init"});
	chrome.tabs.create({url: "https://steamcommunity.com/", active: false}, tab => {
		curtab = tab.id;
	});
}

async function Chat()
{
	storage.set({current: "chat"});
	if(curtab)
		chrome.tabs.update(curtab, {url: "https://steamcommunity.com/chat/"}, tab => {
			curtab = tab.id;
		});
	else chrome.tabs.create({url: "https://steamcommunity.com/chat/", active: false}, tab => {
		curtab = tab.id;
	});
}

async function Level()
{
	storage.set({current: "level"});
	if(curtab)
		chrome.tabs.update(curtab, {url: "https://steamcommunity.com/market/"}, tab => {
			curtab = tab.id;
		});
	else chrome.tabs.create({url: "https://steamcommunity.com/market/", active: false}, tab => {
		curtab = tab.id;
	});
}

async function Gems()
{
	storage.set({current: "gems"});
	if(curtab)
		chrome.tabs.update(curtab, {url: "https://steamcommunity.com/"}, tab => {
			curtab = tab.id;
		});
	else chrome.tabs.create({url: "https://steamcommunity.com/", active: false}, tab => {
		curtab = tab.id;
	});
}