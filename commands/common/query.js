const { SlashCommandBuilder } = require('discord.js');
const { fetchData } = require('../../utils/post');
const { embedBuilder } = require('../../utils/embed');
module.exports = {
	data: new SlashCommandBuilder()
		.setName('query')
		.setDescription('query 腳色')
		.addStringOption((option) =>
			option
				.setName('character-name')
				.setDescription('腳色名稱')
				.setRequired(true),
		)
		.addStringOption((option) =>
			option
				.setName('server')
				.setDescription('所在server')
				.setRequired(true)
				.addChoices(
					{ name: '艾麗亞', value: '0' },
					{ name: '普力特', value: '1' },
					{ name: '琉德', value: '2' },
					{ name: '優伊娜', value: '3' },
					{ name: '愛麗西亞', value: '4' },
					{ name: '殺人鯨', value: '6' },
					{ name: 'Reboot', value: '45' },
				),
		),
	async execute(interaction) {
		const CharacterName = interaction.options.getString('character-name');
		const serverID = interaction.options.getString('server');
		const parsedData = await fetchData({ name: CharacterName, serverID });
		if (typeof parsedData === 'string') {
			return await interaction.reply(parsedData);
		}
		const embed = embedBuilder(parsedData, serverID);
		await interaction.reply({ embeds: [embed] });
	},
};
