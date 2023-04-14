// authenticates you with the API standard library
// type `await lib.` to display API autocomplete
const lib = require('lib')({token: process.env.STDLIB_SECRET_TOKEN});

await lib.discord.channels['@0.3.4'].messages.create({
  channel_id: `${context.params.event.channel_id}`,
  content: `You can login to your account or sign up using this link: *link*`,
  message_reference: {
    'message_id': `${context.params.event.id}`
  }
});