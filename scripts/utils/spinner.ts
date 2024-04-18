const themes = {
  dots: ['⠋', '⠙', '⠹', '⠸', '⠼', '⠴', '⠦', '⠧', '⠇', '⠏'],
  moon: ['🌑', '🌒', '🌓', '🌔', '🌕', '🌖', '🌗', '🌘'],
  clock: [
    '🕛',
    '🕐',
    '🕑',
    '🕒',
    '🕓',
    '🕔',
    '🕕',
    '🕖',
    '🕗',
    '🕘',
    '🕙',
    '🕚',
  ],
}

type Theme = keyof typeof themes
type Options = {
  theme?: Theme
  duration?: number
}

let state = {
  interval: null as Timer | null,
  text: '',
}

async function showSpinner(text: string, options: Options = {}) {
  state.text = text

  return new Promise<void>(resolve => {
    const {theme = 'dots', duration} = options
    const frames = themes[theme]

    if (state.interval) {
      hideSpinner()
      resolve()
    }
    if (duration) {
      setTimeout(() => {
        hideSpinner()
        resolve()
      }, duration)
    }

    let i = 0
    state.interval = setInterval(() => {
      process.stdout.write(`\r${frames[i++ % frames.length]} ${text}`)
    }, 100)
  })
}

function hideSpinner() {
  if (state.interval) {
    clearInterval(state.interval)
    process.stdout.write(`\r✅ ${state.text}\n`)
    state.interval = null
  }
}

export const spinner = {show: showSpinner, hide: hideSpinner}
