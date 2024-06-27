import { writable } from 'svelte/store'
import { object, safeParse, string, type InferOutput } from 'valibot'

const settingsSchema = object({
  proxyURL: string(),
})
const defaultSettings: InferOutput<typeof settingsSchema> = {
  proxyURL: 'https://tunx-api.deno.dev/proxy',
} 

const settingsParsed = safeParse(settingsSchema, JSON.parse(localStorage.getItem('SETTINGS') ?? '{}'))

export const settings = writable(settingsParsed.success ? settingsParsed.output : defaultSettings)
