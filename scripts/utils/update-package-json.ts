export async function updatePackageJson(
  path: string,
  properties: {
    name: string
  },
) {
  const file = Bun.file(path)

  const contents = await file.json()

  contents.name = properties.name

  await Bun.write(path, JSON.stringify(contents, null, 2))
}
