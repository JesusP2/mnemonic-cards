module.exports = {
  content: [
    "./src/layouts/**/*.{js,ts,jsx,tsx}",
    "./src/pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'antd-menu': '#1890ff',
        'background': '#001529'
      }
    },
  },
  plugins: [
    require('tailwindcss-radix')()
  ],
}
