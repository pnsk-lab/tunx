import { createFetch } from '@pnsk-lab/tunx'
import { settings } from './store'
import { get } from 'svelte/store'

const useragent = navigator.userAgent

export const proxyFetch = createFetch(get(settings).proxyURL)

export const createFetchWrapped = (): typeof fetch => {
  return (input, init) => {
    const req = new Request(input, init)

    req.headers.append('User-Agent', useragent)

    return proxyFetch(req)
  }
}