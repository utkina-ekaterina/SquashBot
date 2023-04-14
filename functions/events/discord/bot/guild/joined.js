// authenticates you with the API standard library
// type `await lib.` to display API autocomplete
const lib = require('lib')({token: process.env.STDLIB_SECRET_TOKEN});

let botInfo = await lib.discord.users['@0.2.0'].me.list();

await lib.discord.channels['@0.2.0'].messages.create({
  channel_id: `${context.params.event.system_channel_id}`,
  content: [
    `Hey there! I'm **Squash Bot** and I just joined your server!`,
    ``,
    `I am powered by ChatGPT so feel free to talk to ask me questions, I can provide you lots of information about recycling and sustainability!`,
    ``,
    `To start off, you can type "**hello squash**" in the chat,`,
    `or you can ask me a question by mentioning me like this:`,
    ``,
    `<@!${botInfo.id}> **Tell me about recycling in Toronto**`,
    ``,
    `Or type **!help** to get more information about my other functions. Cheers!`
  ].join('\n')
});

