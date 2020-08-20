const Discord = require('discord.js');
const client = new Discord.Client();
require('dotenv').config()
client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on("voiceStateUpdate", function(oldMember, newMember){
    const mute_role = process.env.MUTE_CHAT_ROLE || 'talk'
    if(newMember.channel == undefined){
        console.log(oldMember.channel.name)
        newMember.member.roles.remove(oldMember.guild.roles.cache.find(role => role.name === mute_role))
        
    }
    else if(oldMember.channel == undefined){
        console.log(newMember.channel.name)
        newMember.member.roles.add(oldMember.guild.roles.cache.find(role => role.name === mute_role))
    }
});


client.login(process.env.TOKEN);