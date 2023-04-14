// authenticates you with the API standard library
const lib = require('lib')({token: process.env.STDLIB_SECRET_TOKEN});

let event = context.params.event;
let mentions = event.mentions;
let botMention = mentions.find(mention => mention.bot);
let content = event.content;
let author = event.author;
let message = content.replace(/<@(\d+)>/gi, ($0, $1) => {
  let mention = mentions.find(mention => mention.id === $1);
  if (mention) {
    return `<@${mention.username}>`;
  } else {
    return `<@:unknown>`;
  }
});

let prompt = [
  `You are a chat bot inside of a Discord server. Your name is ${botMention.username}.`,
  `You respond to queries users ask you, these questions will be about recycle and sustainability in Canada.'
  'Some questions the user might ask is information about places in a specific city where recycled items are being accepted.'
  'Your goal is to be pleasant and welcoming. You should not respond to questions that aren't related to recycling.`,
  `Inside users messages to you, they'll refer to you by saying <@${botMention.username}> somewhere in the message. Be as detailed as possible.`,
  `User input may be multi-line, and you can respond with multiple lines as well. Here are some examples:`,
  ``,
  `${author.username} said: Hi <@${botMention.username}>!`,
  `Your response: Hello ${author.username}, I hope you are having a wonderful day.`,
  `${author.username} said: <@${botMention.username}> Where can i recycle? I live in <location>`,
  `Your response: <location> offers various options for recycling, and the specific locations may depend on the type of material you want to recycle. Here are a few options for recycling in Mississauga: `,
  `1. Blue Box Recycling: The City of Mississauga offers a curbside blue box recycling program to its residents. You can place your blue box curbside on your scheduled collection day. The program accepts materials such as paper, cardboard, plastics, glass, and metal cans.`,
  '2. Community Recycling Centres: Mississauga has several Community Recycling Centres (CRCs) where you can drop off various items, including hazardous waste, electronic waste, metal, plastic, and other recyclables.',
  '3. Retailer Recycling Programs: Many retailers in Mississauga offer recycling programs for specific items such as batteries, electronics, and other items. For example, you can take your used batteries to various retailers such as Best Buy, Canadian Tire, Home Depot, and Lowes.',
  `${author.username} said: Can you tell me what items do they accept <@${botMention.username}>...`,
  `Your response: For sure! Blue Box Recycling accepts:`,
  `1. Paper (newspapers, magazines, flyers, envelopes, etc.)`,
  '2. Cardboard',
  '3. Boxboard (cereal boxes, shoe boxes, etc.)',
  '4. Plastics (bottles, jugs, tubs, clamshells, etc.)',
  '5. Glass bottles and jars',
  'Feel free to ask me more questions about recycling in Mississauga',
  `${author.username} said: ${message}`,
  `Your response: `
].join('\n');

let status = '';



let response = '';
let embeds = [];
try {
  let completion = await lib.openai.playground['@0.0.2'].completions.create({
    model: `text-davinci-003`,
    prompt: [
      prompt
    ],
    max_tokens: 512,
    temperature: 0.1,
    top_p: 1,
    n: 1,
    echo: false,
    presence_penalty: 0,
    frequency_penalty: 0,
    best_of: 1
  });
  response = completion.choices[0].text;
} catch (e) {
  embeds = [
    {
      "type": "rich",
      "title": `Error with DiscordGPT`,
      "description": e.message,
      "color": 0xff4444
    }
  ]
};

let messageResponse = await lib.discord.channels['@0.3.1'].messages.create({
  channel_id: `${context.params.event.channel_id}`,
  content: response,
  embeds: embeds,
  message_reference: {
    'message_id': `${context.params.event.id}`
  },
  tts: false
});

return messageResponse;