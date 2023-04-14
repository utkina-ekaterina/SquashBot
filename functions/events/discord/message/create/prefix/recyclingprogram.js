// authenticates you with the API standard library
// type `await lib.` to display API autocomplete
const lib = require('lib')({token: process.env.STDLIB_SECRET_TOKEN});

await lib.discord.channels['@0.3.4'].messages.create({
  channel_id: `${context.params.event.channel_id}`,
  content: `Hey there! :wave: Thank you for interest in recycling. Here is the link with the information about our rewarding program: *link*`,
  message_reference: {
    'message_id': `${context.params.event.id}`
  }
});