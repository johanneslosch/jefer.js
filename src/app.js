const Discord = require('discord.js');
const client = new Discord.Client();
require('dotenv').config()
client.on('ready', () => { console.log(`Logged in as ${client.user.tag}!`); });

client.on('message', msg => {
  if (msg.content === 'ping') {
    msg.reply('Pong!');
  }
});

client.on("voiceStateUpdate", function(oldMember, newMember) {
  const mute_role = process.env.MUTE_CHAT_ROLE || 'talk'
  if (newMember.channel == undefined) {
    console.log(oldMember.channel.name)
    let myRole =
        oldMember.guild.roles.cache.find(role => role.name === mute_role);
    newMember.member.roles.remove(myRole)
    // newMember.member.roles.add(newMember.guild.roles.valueOf(role =>
    // role.name === "talk"))
  }
  else if (oldMember.channel == undefined) {
    console.log(newMember.channel.name)
    let myRole =
        oldMember.guild.roles.cache.find(role => role.name === mute_role);
    newMember.member.roles.add(myRole)
    // oldMember.member.roles.remove(oldMember.guild.roles.valueOf(role =>
    // role.name === "talk"))
  }
});

client.login(process.env.TOKEN);