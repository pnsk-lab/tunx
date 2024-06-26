

export interface Input {
  type: 'html'
  id: number
  html: string
}
export interface Output {
  id: number
  html: string
}

self.addEventListener('message', ({ data }: MessageEvent<Input>) => {
  if (data.type === 'html') {
    data.html
  }
})
