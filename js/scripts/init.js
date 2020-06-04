function init()
{
    jQuery("body").append("<script>jQuery('body').append(\"<p id='steamid' style='display: none;'>\"+g_steamID+\"</p>\")</script>");
    let steamid = jQuery("#steamid").text();

    let profileUrl = jQuery("#global_actions > a")[0].getAttribute('href').split('/')[4];

    jQuery("body").append("<script>jQuery('body').append(\"<p id='sessionid' style='display: none;'>\"+g_sessionID+\"</p>\")</script>");
    let sessionid = jQuery("#sessionid").text();

    storage.get([], (res) => {
        res.steamids = steamid;
        res.profileUrl = profileUrl;
        res.sessionid = sessionid;
        storage.set(res);
    });
    chrome.runtime.sendMessage({action: "queue"});
}

function start()
{
    storage.get(["current"], res => {
        if(res.current == "init")
            init();
    });
}

window.addEventListener("load", start, false);