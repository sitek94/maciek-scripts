export async function updatePackageJson({name}: {name: string}) {
  const path = `./${name}/package.json`
  const file = Bun.file(path)

  const contents = await file.json()

  contents.name = name

  await Bun.write(path, JSON.stringify(contents, null, 2))
}
