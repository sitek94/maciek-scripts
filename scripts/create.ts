#!/usr/bin/env bun
import {confirm, input, select} from '@inquirer/prompts'
import {$} from 'bun'
import path from 'path'

$.cwd(process.cwd())

// For now there is only one
const reactStarter = 'minimal-react'

const projectName = await input({
  message: 'What is the name of the project?',
  default: 'new-project',
})

const projectDirectory = path.join(process.cwd(), projectName)

console.log(`Creating new project: ${projectName}`)
console.log(`Using starter: ${reactStarter}`)
console.log('')
console.log('Cloning starter...')
await $`gh repo clone ${reactStarter} ${projectName} -- --depth 1`

console.log('Cleaning up...')
await $`rm -rf ${projectDirectory}/.git ${projectDirectory}/renovate.json`

console.log('Updating package.json...')
const projectJsonPath = `${projectDirectory}/package.json`
const file = Bun.file(projectJsonPath)
const packageJson = await file.json()
packageJson.name = projectName
await Bun.write(projectJsonPath, JSON.stringify(packageJson, null, 2))

console.log('Initializing git...')
await $`git init ${projectName}`
await $`cd ${projectName} && git add . && git commit -m "init"`

const installDependencies = await confirm({
  message: 'Install dependencies?',
  default: true,
})
if (installDependencies) {
  const packageManager = await select({
    message: 'Select a package manager',
    choices: [
      {name: 'bun', value: 'bun'},
      {name: 'npm', value: 'npm'},
      {name: 'yarn', value: 'yarn'},
      {name: 'pnpm', value: 'pnpm'},
    ],
  })

  console.log(`Installing dependencies with "${packageManager}"...`)
  await $`cd ${projectDirectory} && ${packageManager} install`
}

const openInVSCode = await confirm({message: 'Open project in VSCode?'})
if (openInVSCode) {
  await $`code ${projectName}`
}

console.log('Done!')
