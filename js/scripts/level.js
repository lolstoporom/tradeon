function start()
{
	storage.get(["current"], res => {
		getSteamid().then(
			steamid => {
				console.log(res.current);
				if (res.current == "level")
					location.href = `https://steamcommunity.com/profiles/${steamid}/gamecards/730/`;
			});
	});
}

window.addEventListener("load", start, false);