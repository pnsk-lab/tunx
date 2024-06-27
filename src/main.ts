import './app.css'
import App from './App.svelte'
import './types.d'

const app = new App({
  target: document.getElementById('app')!,
})

if (import.meta.env.DEV && 'ontouchstart' in window) {
  const script = document.createElement('script')
  script.src = 'https://cdn.jsdelivr.net/npm/eruda'
  // @ts-expect-error
  script.onload = () => eruda.init()
  document.body.append(script)
}

export default app
