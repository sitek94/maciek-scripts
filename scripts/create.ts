#!/usr/bin/env bun
import {$} from 'bun'
import {confirm, input} from '@inquirer/prompts'
import {updatePackageJson} from './utils/update-package-json'

// For now there is only one
const reactStarter = 'minimal-react'

const projectName = await input({
  message: 'What is the name of the project?',
  default: 'new-project',
})

const projectDirectory = `${import.meta.dir}/${projectName}`

console.log(`Creating new project: ${projectName}`)
console.log(`Using starter: ${reactStarter}`)
console.log('')
console.log('Cloning starter...')
await $`gh repo clone ${reactStarter} ${projectName} -- --depth 1`

console.log('Cleaning up...')
await $`rm -rf ${projectDirectory}/.git ${projectDirectory}/renovate.json`

console.log('Updating package.json...')
await updatePackageJson(`${projectDirectory}/package.json}`, {
  name: projectName,
})

console.log('Initializing git...')
await $`git init ${projectName}`
await $`cd ${projectName} && git add . && git commit -m "init"`

const openInVSCode = await confirm({message: 'Open project in VSCode?'})
if (openInVSCode) {
  await $`code ${projectName}`
}

console.log('Done!')
