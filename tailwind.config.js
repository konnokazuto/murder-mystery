/** @type {import('tailwindcss').Config} */
module.exports = {
  purge: [
    "./components/**/*.{vue,js}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./nuxt.config.{js,ts}",
  ],
  content: [],
  theme: {
    screens: {
      sp: "640px",
      pc: "1024px",
    },
    extend: {
      body: [
        'ヒラギノ丸ゴ Pro W4',
        'ヒラギノ角ゴシック',
        'メイリオ',
        'Meiryo',
        'MS Ｐゴシック',
        'MS PGothic',
        'sans-serif',
        'YuGothic',
        'Yu Gothic',
      ],
      fontFamily: {
        'hiragino': ['"ヒラギノ丸ゴ Pro W4"', '"ヒラギノ丸ゴ Pro"', 'Hiragino', 'sans-serif']
      },
      colors: {
        pink: '#ea1e63', // カスタムカラーの名称と値を設定します。
        green: '#04b6b8',
        choice: 'rgba(241, 255, 255, 0.4);'
      },
      keyframes: {
        "img-wrap": {
          "0%": { "clip-path": "circle(0 at 50% 50%)" },
          "100%": { "clip-path": "circle(100% at 50% 50%)" },
        },
      },
      animation: {
        "img-wrap": "img-wrap 1s cubic-bezier(0.4, 0, 0.2, 1)",
      },
    },
  },
  plugins: [],
};
