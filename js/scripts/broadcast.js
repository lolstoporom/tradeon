function runBroadcast()
{
	storage.set({current: null});
	setTimeout(() => {
		chrome.runtime.sendMessage({action: "queue"});
	}, 5000);
}

function start()
{
	storage.get(["current"], res => {
		if(res.current == "broadcast")
			runBroadcast();
	});
}

window.addEventListener("load", start, false);