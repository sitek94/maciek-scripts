#!/usr/bin/env bun
import {$} from 'bun'

const [script] = process.argv.slice(2)

const scriptPath = `${import.meta.dirname}/scripts/${script}.ts`
const file = Bun.file(scriptPath)

if (await file.exists()) {
  await $`bun ${scriptPath}`
} else {
  console.error(`Script not found: ${script}`)
}
