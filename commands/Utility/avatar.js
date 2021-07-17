const { MessageEmbed } = require('discord.js');

module.exports = {
  name: 'avatar',
  aliases: [ 'av', 'pfp', 'displayprofile' ],
  clientPermissions: [ 'EMBED_LINKS' ],
  group: 'Utility',
  description: 'Shows avatar of the provided user, or yourself',
  parameters: [ 'User Mention / ID' ],
  examples: [
    'avatar',
    'av @user',
    'pfp 728394857686950485'
  ],
  run: async (client, message, [user = '']) => {
    const { color2 } = client.config;
    let color;

    if (message.guild){
      const id = (user.match(/\d{17,19}/)||[])[0] || message.author.id;

      member = await message.guild.members.fetch(id)
      .catch(() => message.member);

      color = member.displayColor || color2;
      user = member.user;
    } else {
      color = color2;
      user = message.author;
    };

    const avatar = user.displayAvatarURL({ format: 'png', dynamic: true, size: 1024 });

    return message.channel.send(
      new MessageEmbed()
      .setColor(color)
      .setImage(avatar)
      .setFooter(`Avatar | \©️${new Date().getFullYear()} Alina`)
      .setDescription(`[Avatar for **${user.tag}**](${avatar})`)
    );
  }
};
