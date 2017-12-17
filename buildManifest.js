import fs from 'fs'

const readJSON = path =>
  new Promise((res, rej) => {
    fs.readFile(path, 'utf8', (err, data) =>
      err ? rej(err) : res(JSON.parse(data)))
  })

const writeJSON = (path, obj) =>
  new Promise((res, rej) => {
    fs.writeFile(path, JSON.stringify(obj, null, 2), err =>
      err ? rej(err) : res(true))
  })

const readManifest = async () => {
  const mainManifest = await readJSON('manifest/manifest.main.json')
  const chromeManifest = await readJSON('manifest/manifest.chrome.json')
  const mozManifest = await readJSON('manifest/manifest.moz.json')

  return [ mainManifest, chromeManifest, mozManifest ]
}

const writeManifests = () =>
  readManifest().then(([ main, chrome, moz ]) =>
    Promise.all([
      writeJSON('dist/chrome/manifest.json', { ...main, ...chrome }),
      writeJSON('dist/mozilla/manifest.json', { ...main, ...moz }),
    ]))

export default Promise.all([ writeManifests() ])
