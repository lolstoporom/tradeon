function chat()
{
	setTimeout(() => {
		chrome.runtime.sendMessage({action: "queue"});
	}, 4000);
}

function start()
{
	storage.get(["current"], res => {
		if(res.current == "chat")
			chat();
	});
}

window.addEventListener("load", start, false);