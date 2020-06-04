function start()
{
	const bg = chrome.extension.getBackgroundPage();

	const modes = ['7lvlwith', '7lvl', '1lvlwith', '1lvl', 'with', 'custom'];

	var stages = 0;

	function setProgress(stage)
	{
		jQuery('progress').val(Math.round(stage / stages * 100));
	}

	storage.get(['steamapi', 'tmapi', 'steamid', 'tradelink', 'mode', 'stage', 'stages', 'customsettings'], (res) => {
		jQuery('#steamapi').val(res.steamapi);
		jQuery('#tmapi').val(res.tmapi);
		jQuery('#steamid').val(res.steamid);
		jQuery('#tradelink').val(res.tradelink);
		if(bg.working)
		{
			jQuery(`#${modes[res.mode]} svg.powersvg`).addClass('on');
			stages = res.stages.length;
			setProgress(res.stage);
		} else if(res.mode)
		{
			console.log('Выполнение скрипта было прервано!');
			// Было прервано!
		}
	});

	chrome.storage.onChanged.addListener(function(changes, namespace) {
		console.log(changes);
		for(var key in changes)
		{
			switch(key)
			{
				case "steamapi":
					jQuery('#steamapi').val(changes[key].newValue);
					break;
				case "tmapi":
					jQuery('#tmapi').val(changes[key].newValue);
					break;
				case "steamid":
					jQuery('#steamid').val(changes[key].newValue);
					break;
				case "tradelink":
					jQuery('#tradelink').val(changes[key].newValue);
					break;
				case "mode":
					if(bg.working)
						jQuery(`#${modes[changes[key].newValue]} svg.powersvg`).addClass('on');
					else
						jQuery(`#${modes[changes[key].oldValue]} svg.powersvg`).removeClass('on');
					break;
				case "stage":
					setProgress(changes[key].newValue);
					break;
				case "stages":
					stages = changes[key].newValue.length;
					break;
			}
		}
	});

	jQuery('#' + modes.join(' .powersvg,#') + ' .powersvg').on('click', e => {
		var p = jQuery(e.currentTarget.parentElement);
		var el = jQuery(e.currentTarget);
		if(bg.working)
		{
			if(!el.hasClass('on'))
				return;
			el.removeClass('on');
			chrome.runtime.sendMessage({
				action: "stop"
			});
		}
		else
		{
			if(modes.indexOf(p.attr('id')) != -1)
			{
				el.addClass('on');
				chrome.runtime.sendMessage({
					action: "start",
					mode: modes.indexOf(p.attr('id')),
					continue: false
				});
			}
		}
	});

	jQuery('.switcher').on('click', e => {
		jQuery(e.currentTarget.parentElement).toggleClass('close');
	});
	
	jQuery("#info input").on("click", function() {
		this.select();
		navigator.clipboard.writeText(this.value);
	});

	jQuery('.infosvg').on('click', e => {
		jQuery(e.target.parentElement).find('.infocontent').show();
		jQuery(e.target.parentElement).find('.exit').show();
	});

	jQuery('.exit').on('click', e => {
		console.log(e);
		jQuery(e.target.parentElement).find('.infocontent').hide();
		jQuery(e.target.parentElement).find('.exit').hide();
	});
}

window.addEventListener("load", start, false);