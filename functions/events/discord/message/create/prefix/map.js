// authenticates you with the API standard library
// type `await lib.` to display API autocomplete
const lib = require('lib')({token: process.env.STDLIB_SECRET_TOKEN});

await lib.discord.channels['@0.3.4'].messages.create({
  channel_id: `${context.params.event.channel_id}`,
  content: `Hey, this is the link where you can see all the closest recycling stations to you on the map: *link*`,
  message_reference: {
    'message_id': `${context.params.event.id}`
  }
});