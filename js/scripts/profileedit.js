function profileEdit()
{
	storage.get(['profilearr', 'customsettings'], res => {
		getSteamid().then(
			steamid => {
				getCustomURL().then(
					customURL => {
						getSessionid().then(
							sessionid => {
								let personaName = jQuery("#personaName")[0].getAttribute('value');

								let real_name;
								if(res.profilearr.indexOf('SetupCommunityRealName') !== -1){
									if(res.customsettings.nameentered)
										real_name = res.customsettings.name;
									else
										real_name = topnames[Math.round(Math.random()*199)];
								}
								else
									real_name = jQuery("#real_name")[0].getAttribute('value');

								let country = jQuery("#country")[0].options[jQuery("#country")[0].selectedIndex].value;

								let state = jQuery("#state")[0].options[jQuery("#state")[0].selectedIndex].value;

								let city = jQuery("#city")[0].options[jQuery("#city")[0].selectedIndex].value;

								let summary;
								if(res.profilearr.indexOf('AddSummary') !== -1){
									if(res.customsettings.infoentered)
										summary = res.customsettings.info;
									else
										summary = topWords[Math.round(Math.random() * (topWords.length - 1))];
								}
								else
									summary = jQuery("#summary").text();

								jQuery("body").append("<script>jQuery('body').append(\"<p id='sessionid' style='display: none;'>\"+g_sessionID+\"</p>\")</script>");
								let sessionidedit = jQuery("#sessionid").text()

								jQuery.ajax({
									method: "POST",
									url: "https://steamcommunity.com/id/"+customURL+"/ajaxgetplayerbackgrounds",
									data:
										{
											sessionid: sessionidedit
										}
								}).done(function (data) {
									let id = data.data.profilebackgroundsowned[0].communityitemid;
									if (!id) {
										chrome.runtime.sendMessage({action: "error", type: "background"});
										console.log(data);
									} else {
										let profile_background;
										if(res.profilearr.indexOf('Background') !== -1)
											profile_background = "&profile_background=" + id;
										else {
											if (jQuery("input#profile_background").lenght > 1)
												profile_background = "&profile_background=" + jQuery("input#profile_background")[0].getAttribute('value');
											else
												profile_background = ""
										}

										let favorite_badge_badgeid;
										if(jQuery('.badge_option').length > 1)
											if(res.profilearr.indexOf('FeatureBadgeOnProfile') !== -1)
												favorite_badge_badgeid = "2";
										else
											favorite_badge_badgeid = jQuery("#favorite_badge_badgeid")[0].getAttribute('value');

										let favorite_badge_communityitemid = jQuery("#favorite_badge_communityitemid")[0].getAttribute('value');

										let primary_group_steamid;
										{
											jQuery.ajax({
												url: "https://steamcommunity.com/id/me/ajaxgroupinvite?select_primary=1"
											}).done(function(data) {
												var html = jQuery.parseHTML(data);
												var groupid = jQuery(html).find('.group_list_option:first').data('groupid');
												if(!groupid)
												{
													chrome.runtime.sendMessage({action: "error", type: "nogroupid"});
												}
												if(res.profilearr.indexOf('MainGroup') !== -1)
													primary_group_steamid = groupid;
												else
													primary_group_steamid = jQuery("#primary_group_steamid")[0].getAttribute('value');

												let url;
												if (steamid == customURL)
													url = "https://steamcommunity.com/profile/" + steamid + "/edit";
												else
													url = "https://steamcommunity.com/id/" + customURL + "/edit";
												let datas = {
													sessionID: sessionid,
													type: "profileSave",
													weblink_1_title: "",
													weblink_1_url: "",
													weblink_2_title: "",
													weblink_2_url: "",
													weblink_3_title: "",
													weblink_3_url: "",
													personaName: personaName,
													real_name: real_name,
													country: country,
													state: state,
													city: city,
													customURL: customURL,
													summary: summary,
													profile_background: profile_background,
													favorite_badge_badgeid: favorite_badge_badgeid,
													favorite_badge_communityitemid: favorite_badge_communityitemid,
													primary_group_steamid: primary_group_steamid
												};
												jQuery.ajax({
													method: 'POST',
													url: url,
													data: datas
												}).done(function (data) {
													chrome.runtime.sendMessage({action: "queue"});
												}).fail((jqXHR, textStatus, errorThrown) => {
													chrome.runtime.sendMessage({
														action: "error",
														type: "ajax",
														stage: "редактирования профиля",
														textStatus: textStatus,
														errorThrown: errorThrown,
														stop: false
													});
												});

											}).fail((jqXHR, textStatus, errorThrown) => {
												chrome.runtime.sendMessage({action: "error", type: "ajax", stage: "установки главной группы", textStatus: textStatus, errorThrown: errorThrown, stop: false});
											});
										}
									}
								}).fail((jqXHR, textStatus, errorThrown) => {});
							});
					});
			});
	});
}

async function Background()
{
	getSessionid().then(
		sessionid => {
			jQuery.ajax({
				method: "POST",
				url: "https://steamcommunity.com/id/me/ajaxgetplayerbackgrounds",
				data:
					{
						sessionid: sessionid
					}
			}).done(function (data) {
				let id = data.data.profilebackgroundsowned[0].communityitemid;
				if (!id) {
					chrome.runtime.sendMessage({action: "error", type: "background"});
					console.log(data);
				} else {
					jQuery('#profile_background').val(id);
					End();
				}
			}).fail((jqXHR, textStatus, errorThrown) => {
				chrome.runtime.sendMessage({
					action: "error",
					type: "ajax",
					stage: "получения списка фонов",
					textStatus: textStatus,
					errorThrown: errorThrown,
					stop: false
				});
			});
		});
}

async function SetupCommunityRealName()
{
	if(jQuery("#real_name").length == 0)
	{
		chrome.runtime.sendMessage({action: "error", type: "realname"});
		return;
	}
	storage.get(["customsettings", "mode"], res => {
		let name;
		if(res.mode == 5 && res.customsettings.name)
			name = res.customsettings.name;
		else
			name = topnames[Math.round(Math.random()*199)];

		jQuery("#real_name").val(name);
		End();
	});

}

async function FeatureBadgeOnProfile()
{
	try
	{
		jQuery(".btn_grey_white_innerfade.btn_small").eq(2).click();
		jQuery(".group_list_option").eq(1).click();
	}
	catch(e)
	{
		chrome.runtime.sendMessage({action: "error", type: "badge"});
	}
}

async function AddSummary()
{
	if(jQuery('#summary').length == 0)
	{
		chrome.runtime.sendMessage({action: "error", type: "summary"});
		return;
	}
	storage.get(["customsettings", "mode"], res => {
		let summary;
		if(res.mode == 5 && res.customsettings.info)
			summary = res.customsettings.info;
		else summary = topWords[Math.round(Math.random() * (topWords.length - 1))];

		jQuery('#summary').val(summary);
	});
}

async function MainGroup()
{
	jQuery.ajax({
		url: "https://steamcommunity.com/id/me/ajaxgroupinvite?select_primary=1"
	}).done(function(data) {
		var html = jQuery.parseHTML(data);
		var groupid = jQuery(html).find('.group_list_option:first').data('groupid');
		if(!groupid)
		{
			chrome.runtime.sendMessage({action: "error", type: "nogroupid"});
		}
		jQuery('#primary_group_steamid').val(groupid);
		End();
	}).fail((jqXHR, textStatus, errorThrown) => {
		chrome.runtime.sendMessage({action: "error", type: "ajax", stage: "установки главной группы", textStatus: textStatus, errorThrown: errorThrown, stop: false});
	});
}

function start()
{
	storage.get(["current", "profileEdited"], res => {
		if(res.current == "profileedit")
		{
			profileEdit();
		}
	});
}

window.addEventListener("load", start, false);