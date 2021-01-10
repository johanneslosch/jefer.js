const Discord = require('discord.js');
const client = new Discord.Client();
require('dotenv').config()
const fs = require('fs')
client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});
var prefix = 'j!'
client.on('message', message => {
    if(message.content.startsWith(prefix)){
        var msg = message.content.substr(prefix.length)
        if(msg.content === 'setMuteRole' || 'setmuterole'){
            var newData = msg.substr('setMuteRole'.length + 1);
            let data = newData;

            if(data.startsWith('<@')){
                const myRole = client.guilds.cache.get(message.guild.id)
                .roles.cache.find(role => role.id === data.replace('<@', '').replace('>', '').replace('&', ''));
                data = myRole.name;
            }

            if(!fs.existsSync('./guilds/' + message.guild.id + '.txt')){
                fs.writeFile('./guilds/' + message.guild.id + '.txt', data, (err) => { 
                    if (err) throw err; 
                }) 
            }
            else if(message.guild.me.hasPermission('MANAGE_GUILD')){
                
                fs.writeFile('./guilds/' + message.guild.id + '.txt', data, (err) => { 
                    // In case of a error throw err. 
                    if (err) throw err; 
                }) 
            }
        }
    }
});

client.on("voiceStateUpdate", function(oldMember, newMember){
    const mute_role = fs.readFileSync('./guilds/' + oldMember.guild.id + '.txt').toString() || 'talk'
    if(newMember.channel == undefined){
        //console.log(oldMember.channel.name)
        newMember.member.roles.remove(oldMember.guild.roles.cache.find(role => role.name === mute_role))
        
    }
    else if(oldMember.channel == undefined){
        //console.log(newMember.channel.name)
        newMember.member.roles.add(oldMember.guild.roles.cache.find(role => role.name === mute_role))
    }
});


client.login(process.env.TOKEN);