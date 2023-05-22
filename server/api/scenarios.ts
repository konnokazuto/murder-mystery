export default defineEventHandler((event) => {
  return [
    {
      id: 1,
      dialogues: [
        {
          speaker: "女",
          text: "何かしら？",
          face: "enmadaiou",
        },
        {
          speaker: "女",
          text: "早くケーキを食べて祝いましょうよ。",
          face: "enmadaiou",
        },
        {
          speaker: "男",
          text: "いやこれは何か嫌な予感がする",
          face: "enmadaiou",
        },
        { speaker: "女", text: "ねぇほら早く", face: "enmadaiou" },
      ] as Dialogues[],
      choices: [
        { text: "食べる", nextId: 2 },
        { text: "食べない", nextId: 3 },
        { text: "ちゃぶ台をひっくり返す", nextId: 4 },
      ] as Choices[],
    },
    {
      id: 2,
      dialogues: [
        { speaker: "女", text: "何かしら？", face: "enmadaiou" },
        {
          speaker: "女",
          text: "早くケーキを食べて祝いましょうよ。",
          face: "enmadaiou",
        },
        {
          speaker: "男",
          text: "いやこれは何か嫌な予感がする",
          face: "enmadaiou",
        },
        { speaker: "女", text: "ねぇほら早く", face: "enmadaiou" },
      ] as Dialogues[],
      choices: [
        { text: "食べる", nextId: 2 },
        { text: "食べない", nextId: 3 },
        { text: "ちゃぶ台をひっくり返す", nextId: 4 },
      ] as Choices[],
    },
  ];
});
