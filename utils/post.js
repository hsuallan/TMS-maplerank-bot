const fetch = require('node-fetch');
const { POST_URL } = require('../config.json');

/**
 * 發送 POST 請求並解析回應數據
 *
 * @async
 * @function fetchData
 * @param {Object} options - 選項物件
 * @param {string} options.name - 角色名稱
 * @param {string} options.serverID - 伺服器 ID，可以是以下之一：
 *   - '0': IZR
 *   - '1': PZT
 *   - '2': 6D
 *   - '3': UEN
 *   - '4': IZCR
 *   - '6': 殺人鯨
 *   - '45': RB
 * @returns {Promise<CharacterData>} 包含解析後的角色數據的物件
 * @typedef {Object} CharacterData
 * @property {string} CharacterLook - 角色外觀
 * @property {string} CharacterName - 角色名稱
 * @property {number} CharacterID - 角色ID
 * @property {number} AccountID - 帳號ID
 * @property {number} Level - 等級
 * @property {number} Job - 職業
 * @property {number} UnionLevel - 聯盟等級
 * @property {number} UnionDPS - 聯盟DPS
 * @property {number} GameWorldID - 遊戲世界ID
 * @property {string} ImportTime - 匯入時間
 * @property {number} Rank_DPS - DPS排名
 * @property {number} Rank_Level - 等級排名
 * @property {string} JobName - 職業名稱
 * @property {string} Rank_Level_Change - 等級排名變化
 * @property {string} Rank_DPS_Change - DPS排名變化
 */
async function fetchData({ name, serverID }) {
	const response = await fetch(POST_URL, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({
			name,
			serverID,
			type: '1',
		}),
	});

	if (!response.ok) {
		throw new Error('server dead');
	}
	const responseData = await response.json();

	const parsedData = JSON.parse(responseData.d);
	if (parsedData.code === '9999') {
		return parsedData.message;
	}
	return JSON.parse(parsedData.data)[0];
}
module.exports = { fetchData };
