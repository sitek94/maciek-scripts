#!/usr/bin/env bun
import {$} from 'bun'

const [script] = process.argv.slice(2)

const path = `./scripts/${script}.ts`
const file = Bun.file(path)

if (await file.exists()) {
  await $`bun ${path}`
} else {
  console.error(`Script not found: ${script}`)
}
