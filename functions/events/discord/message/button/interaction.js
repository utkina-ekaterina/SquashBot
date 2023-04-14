// authenticates you with the API standard library
// type `await lib.` to display API autocomplete
const lib = require('lib')({token: process.env.STDLIB_SECRET_TOKEN});

let botInfo = await lib.discord.users['@0.2.0'].me.list();

await lib.discord.interactions['@1.0.1'].followups.create({
  token: `${context.params.event.token}`,
  content: [
  `**I got you**, <@!${context.params.event.member.user.id}>, here is the list of the commands that I have:\n\n> **!help** - provides you the list of commands`,
 `> **!login** - provides you with a link to login or sign up on the website`,
 `> **!recyclingprogram** - provides you with information about the discounts that you can receive for your recycling`,
 `> **!map** - provides you with a map where you can see all the locations of recycling centres`,
 `> **!sponsors** - our sponsors that can give you a discount\n\n You can also ping me and ask questions about recycling and sustainability like this: \"<@!${botInfo.id}> tell me a joke about recycling\"!`
 ].join('\n')
});

