function start()
{
	const bg = chrome.extension.getBackgroundPage();

	storage.get(['customsettings'], (res) => {
		jQuery('.settingitem input[type=text]').eq(0).val(res.customsettings.group);
		jQuery('.settingitem input[type=text]').eq(1).val(res.customsettings.name);
		jQuery('.settingitem input[type=text]').eq(2).val(res.customsettings.info);
		jQuery('.settingscontent svg').eq(1).toggleClass('on', res.customsettings.lvlupon);
		jQuery('.settingitem svg').eq(1).toggleClass('on', res.customsettings.groupon);
		jQuery('.settingitem svg').eq(3).toggleClass('on', res.customsettings.nameon);
		jQuery('.settingitem svg').eq(5).toggleClass('on', res.customsettings.infoon);
		jQuery('#apisettings svg').eq(0).toggleClass('on', res.customsettings.steamapiid);
		jQuery('#apisettings svg').eq(1).toggleClass('on', res.customsettings.tmapi);
		jQuery('#apisettings svg').eq(2).toggleClass('on', res.customsettings.tradelink);

		jQuery('#lvlup input').val(res.customsettings.lvlup);

		if(res.customsettings.groupentered)
		{
			jQuery('input[name=group]').eq(1).prop("checked", true);
		}
		else jQuery('input[name=group]').eq(0).prop("checked", true);

		if(res.customsettings.nameentered)
		{
			jQuery('input[name=name]').eq(1).prop("checked", true);
		}
		else jQuery('input[name=name]').eq(0).prop("checked", true);

		if(res.customsettings.infoentered)
		{
			jQuery('input[name=info]').eq(1).prop("checked", true);
		}
		else jQuery('input[name=info]').eq(0).prop("checked", true);
	});

	// chrome.storage.onChanged.addListener(function(changes, namespace) {
	// 	console.log(changes);
	// 	for(var key in changes)
	// 	{
	// 		switch(key)
	// 		{
	// 			case "customsettings":
	// 				// jQuery('.settingitem input[type=text]').eq(0).val(changes[key].newValue.group);
	// 				// jQuery('.settingitem input[type=text]').eq(1).val(changes[key].newValue.name);
	// 				// jQuery('.settingitem input[type=text]').eq(2).val(changes[key].newValue.info);
	// 				// jQuery('#apisettings svg').eq(0).toggleClass('on', changes[key].newValue.steamapiid);
	// 				// jQuery('#apisettings svg').eq(1).toggleClass('on', changes[key].newValue.tmapi);
	// 				// jQuery('#apisettings svg').eq(2).toggleClass('on', changes[key].newValue.tradelink);

	// 				// jQuery('#lvlup input').val(changes[key].newValue.lvlup);

	// 				// if(changes[key].newValue.groupon)
	// 				// {
	// 				// 	jQuery('[name=group]').eq(1).prop("checked", true);
	// 				// }
	// 				// else jQuery('[name=group]').eq(0).prop("checked", true);

	// 				// if(changes[key].newValue.nameon)
	// 				// {
	// 				// 	jQuery('[name=name]').eq(1).prop("checked", true);
	// 				// }
	// 				// else jQuery('[name=name]').eq(0).prop("checked", true);

	// 				// if(changes[key].newValue.infoon)
	// 				// {
	// 				// 	jQuery('[name=info]').eq(1).prop("checked", true);
	// 				// }
	// 				// else jQuery('[name=info]').eq(0).prop("checked", true);
	// 				break;
	// 		}
	// 	}
	// });

	jQuery('#profilesettings input[type=radio][name=group]').change(e => {
		if(!jQuery('input[type=text][name=group]').val() && e.target.value == "on")
		{
			//jQuery('#profilesettings input[name=group][value=off]').prop('checked', true);
			jQuery('#profilesettings input[name=group][type=text]').addClass('wrong');
			return false;
		}
		if(e.target.value == "off")
			jQuery('#profilesettings input[name=group][type=text]').removeClass('wrong');
		storage.get(['customsettings'], res => {
			res.customsettings.groupentered = (e.target.value == "on");
			storage.set(res);
		});
	});

	jQuery('#profilesettings input[type=radio][name=name]').change(e => {
		if(!jQuery('input[type=text][name=name]').val())
		{
			//jQuery('#profilesettings input[name=name][value=off]').prop('checked', true);
			jQuery('#profilesettings input[name=name][type=text]').addClass('wrong');
			return false;
		}
		storage.get(['customsettings'], res => {
			res.customsettings.nameentered = (e.target.value == "on");
			storage.set(res);
		});
	});

	jQuery('#profilesettings input[type=radio][name=info]').change(e => {
		if(!jQuery('input[type=text][name=info]').val())
		{
			//jQuery('#profilesettings input[name=info][value=off]').prop('checked', true);
			jQuery('#profilesettings input[name=info][type=text]').addClass('wrong');
			return false;
		}
		storage.get(['customsettings'], res => {
			res.customsettings.infoentered = (e.target.value == "on");
			storage.set(res);
		});
	});

	jQuery('input[type=text][name=group]').change(e => {
		storage.get(['customsettings'], res => {
			let regex = /^(http|https):\/\/steamcommunity\.com\/groups\/.+/;
			if(e.target.value && !regex.test(e.target.value))
			{
				e.target.value = res.customsettings.group;
				return;
			}
			res.customsettings.group = e.target.value;
			if(!e.target.value)
				res.customsettings.groupentered = false;
			else if(jQuery('#profilesettings input[name=group][value=on]').prop('checked'))
			{
				res.customsettings.groupentered = true;
			}
			jQuery('#profilesettings input[name=group][type=text]').removeClass('wrong');
			storage.set(res);
		});
	});

	jQuery('input[type=text][name=name]').change(e => {
		storage.get(['customsettings'], res => {
			res.customsettings.name = e.target.value;
			if(!e.target.value)
				res.customsettings.nameentered = false;
			else if(jQuery('#profilesettings input[name=name][value=on]').prop('checked'))
			{
				res.customsettings.nameentered = true;
			}
			jQuery('#profilesettings input[name=name][type=text]').removeClass('wrong');
			storage.set(res);
		});
	});

	jQuery('input[type=text][name=info]').change(e => {
		storage.get(['customsettings'], res => {
			res.customsettings.info = e.target.value;
			if(!e.target.value)
				res.customsettings.infoentered = false;
			else if(jQuery('#profilesettings input[name=info][value=on]').prop('checked'))
			{
				res.customsettings.infoentered = true;
			}
			jQuery('#profilesettings input[name=info][type=text]').removeClass('wrong');
			storage.set(res);
		});
	});

	jQuery('#lvlup .powersvg').eq(0).on('click', e => {
		var target = jQuery('#lvlup .powersvg').eq(0);
		target.toggleClass('on');
		storage.get(['customsettings'], res => {
			res.customsettings.lvlupon = target.hasClass('on');
			storage.set(res);
		});
	});

	jQuery('#profilesettings .powersvg').eq(0).on('click', e => {
		var target = jQuery('#profilesettings .powersvg').eq(0);
		target.toggleClass('on');
		storage.get(['customsettings'], res => {
			res.customsettings.groupon = target.hasClass('on');
			storage.set(res);
		});
	});

	jQuery('#profilesettings .powersvg').eq(1).on('click', e => {
		var target = jQuery('#profilesettings .powersvg').eq(1);
		target.toggleClass('on');
		storage.get(['customsettings'], res => {
			res.customsettings.nameon = target.hasClass('on');
			storage.set(res);
		});
	});

	jQuery('#profilesettings .powersvg').eq(2).on('click', e => {
		var target = jQuery('#profilesettings .powersvg').eq(2);
		target.toggleClass('on');
		storage.get(['customsettings'], res => {
			res.customsettings.infoon = target.hasClass('on');
			storage.set(res);
		});
	});

	jQuery('#apisettings .powersvg').eq(0).on('click', e => {
		var target = jQuery('#apisettings .powersvg').eq(0);
		target.toggleClass('on');
		storage.get(['customsettings'], res => {
			res.customsettings.steamapiid = target.hasClass('on');
			storage.set(res);
		});
	});

	jQuery('#apisettings .powersvg').eq(1).on('click', e => {
		var target = jQuery('#apisettings .powersvg').eq(1);
		target.toggleClass('on');
		storage.get(['customsettings'], res => {
			res.customsettings.tmapi = target.hasClass('on');
			storage.set(res);
		});
	});

	jQuery('#apisettings .powersvg').eq(2).on('click', e => {
		var target = jQuery('#apisettings .powersvg').eq(2);
		target.toggleClass('on');
		storage.get(['customsettings'], res => {
			res.customsettings.tradelink = target.hasClass('on');
			storage.set(res);
		});
	});

	jQuery('#lvlup input').change(e => {
		var num = parseInt(e.target.value);
		storage.get('customsettings', res => {
			if(num < 1 || num > 7)
			{
				e.target.value = res.customsettings.lvlup;
			}
			else
			{
				res.customsettings.lvlup = num;
				storage.set(res);
			}
		});
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