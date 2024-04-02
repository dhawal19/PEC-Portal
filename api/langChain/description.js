require('dotenv').config();
const OpenAI = require('openai');

const API_KEY = process.env.OPENAI_API_KEY;
console.log(API_KEY);
// const openai = new OpenAI({
//     apiKey: API_KEY,
// });

// async function description(input) {
//     const completion = await openai.chat.completions.create({
//         messages: [
//             {
//                 role: "system",
//                 content: "You are a helpful assistant designed to output JSON.",
//             },
//             { role: "user", content: `Give a brief description of the engineering subject ${input}. Make sure to give description of the subject and not any entity or organisation.` },
//         ],
//         model: "gpt-3.5-turbo-0125",
//         response_format: { type: "json_object" },
//     });
//     console.log(completion.choices[0].message.content);
// }

// module.exports = description;
// // description("Fourier Series");