import { createFetch } from '@pnsk-lab/tunx'

const useragent = navigator.userAgent

export const proxyFetch = createFetch('https://tunx-api.deno.dev/proxy')

export const createFetchWrapped = (): typeof fetch => {
  return (input, init) => {
    const req = new Request(input, init)

    req.headers.append('User-Agent', useragent)

    return proxyFetch(req)
  }
}