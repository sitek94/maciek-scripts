#!/usr/bin/env bun
import {$} from 'bun'

const [script] = process.argv.slice(2)

const scriptPath = `${import.meta.dirname}/scripts/${script}.ts`
const file = Bun.file(scriptPath)

if (await file.exists()) {
  try {
    await $`bun ${scriptPath}`.cwd(process.cwd())
  } catch (error: any) {
    console.log(`Script "${script}" failed with code ${error.exitCode}`)
    console.log(error.stdout.toString())
    console.log(error.stderr.toString())
  }
} else {
  console.error(`Script not found: ${script}`)
}
