import type { TunxGlobal } from './constants'

declare global {
  interface Window {
    __tunx: TunxGlobal
  }
}
