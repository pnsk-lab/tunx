import type { ElementExtend } from "./client-scripts/dom/elements"

export const REDIRECT_STATUS_CODES: Set<number> = new Set([301, 302, 303, 307, 308])

export interface BrowserContext {
  url: URL
  changeUrl: (url: URL) => void
}
export interface TunxGlobal {
  processElements: {
    [name: string]: ElementExtend<any>
  }
  browserContext: BrowserContext
}
