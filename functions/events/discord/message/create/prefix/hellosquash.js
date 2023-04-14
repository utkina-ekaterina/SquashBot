const lib = require('lib')({token: process.env.STDLIB_SECRET_TOKEN});

await lib.discord.channels['@0.3.2'].messages.create({
  "channel_id": `${context.params.event.channel_id}`,
  "content": "",
  "tts": false,
  "components": [
    {
      "type": 1,
      "components": [
        {
          "style": 2,
          "label": `Help`,
          "custom_id": `help_button`,
          "disabled": false,
          "emoji": {
            "id": null,
            "name": `🦾`
          },
          "type": 2
        }
      ]
    }
  ],
  "embeds": [
    {
      "type": "rich",
      "title": `Hey there!`,
      "description": `My name is **Squash Bot**, nice to meet you!`,
      "color": 0x31c1c1,
      "fields": [
        {
          "name": `What can I do?`,
          "value": `I provide users with information about recycling using GPT-3: I can find you recycling stations for your location, provide you with information about what items they accept, etc.`,
          "inline": true
        },
        {
          "name": `What about the website?`,
          "value": `I can also provide you with links to the website, where you can get more information about receiving bonuses and discounts for your recycling! Use \`!help\` to see the list of all commands or click     the button under this message.`
        }
      ],
      "thumbnail": {
        "url": `https://media.discordapp.net/attachments/1076689642558070884/1076689858833162292/Screenshot_2023-02-18_at_21.19.43.png?width=1276&height=1054`,
        "height": 0,
        "width": 0
      }
    }
  ]
});