const fs = require('fs')

function main(){
  const localPackage = JSON.parse(fs.readFileSync('./package.json', 'utf-8'))
  const remotePackageJson = JSON.parse(fs.readFileSync('./package.json', 'utf-8'))
  const packageJson = {
    ...remotePackageJson,
    version: localPackage.version,
    types: './index.d.ts'
  }
  console.log('Generating package.json ...')
  console.log(packageJson)
  fs.writeFileSync('./tmp/trade-bot__db-types/package.json', JSON.stringify(packageJson, null, 2))
}

main()