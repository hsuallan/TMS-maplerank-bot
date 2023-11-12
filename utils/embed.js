const { JOBS, SERVERS } = require('../config.json');

function embedBuilder(x, serverId) {
	const getJobName = (item) => {
		if (!item.JobName) {
			return JOBS[item.Job] ?? 'unknown';
		}
		return item.JobName;
	};
	const getServerName = () => {
		return SERVERS[serverId];
	};
	const exampleEmbed = {
		color: 0x0099ff,
		title: x.CharacterName,
		description: getServerName(),
		thumbnail: {
			url: x.Avatar_CharacterLookURL,
		},
		fields: [
			{
				name: 'Level',
				value: x.Level,
				inline: true,
			},
			{
				name: '職業',
				value: getJobName(x),
				inline: true,
			},
			{
				name: '更新時間',
				value: x.ImportTime,
			},
			{
				name: '聯盟等級',
				value: String(x.UnionLevel),
				inline: true,
			},
			{
				name: '聯盟攻擊力',
				value: Number(x.UnionDPS).toLocaleString(),
				inline: true,
			},
			{
				name: '一天可獲得戰地硬幣量',
				value: parseFloat(x.UnionDPS / 1251251.25).toFixed(2),
			},
			{
				name: '戰地等級排行',
				value: x.Rank_DPS,
				inline: true,
			},
			{
				name: '戰地攻擊力排行',
				value: x.Rank_Level,
				inline: true,
			},
		],
		footer: {
			text: `相比上周變化 等級排行 ${x.Rank_Level_Change === 'up' ? '⬆' : '⬇'} 攻擊力 ${x.Rank_DPS_Change === 'up' ? '⬆' : '⬇'}`,
		},
	};
	return exampleEmbed;
}

module.exports = { embedBuilder };
