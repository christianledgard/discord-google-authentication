require('dotenv').config();

const discord = require('discord.js');
const client = new discord.Client();
const util = require('../utils/util');
const { authenticate } = require('../server/routes/auth')

client.on('guildMemberAdd', member => {
    let guildId = util.encrypt(member.guild.id);
    let memberId = util.encrypt(member.id);

    member.send(`Hola ${member}. Bienvenido al server ${member.guild.name}. Antes de poder navegar en el, debemos de validar que eres alumno o docente UTEC. 
    Por favor visitar la siguiente URL para realizar la autenticación: ${process.env.AUTHURL}/auth/${guildId}/${memberId}`);
    
});

authenticate.on('visited', async (hash, guildId,userId, name) => {
    let guild = client.guilds.cache.get(guildId);
    let member = guild ? guild.members.cache.get(userId) : null;
    if(member){
        let studentRole = guild.roles.cache.find(role => role.name === "Students");
        member.roles.add(studentRole).catch(err => console.log(err));
        console.log(name);
        if(name.length <= 32){
            member.setNickname(name);
        }else{
            member.setNickname(name.slice(0, 31));
        }
    }
    member.send(`${name} ya te encuentras autorizado para navegar en el server. ¡Bienvenido!.`);
});


client.login(process.env.BOT_TOKEN);
client.on('ready', () => {
    console.log(`${client.user.tag} has logged in.`);
    require('../server/app')(process.env.PORT)
});