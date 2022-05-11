const fs = require('fs')

function main(){
  const localPackage = JSON.parse(fs.readFileSync('./package.json', 'utf-8'))
  const packageToCreate = {
    name: 'trade-bot-db-types',
    version: localPackage.version,
    types: './index.d.ts'
  }
  console.log('Generating package.json ...')
  console.log(packageToCreate)
  fs.writeFileSync('./tmp/trade-bot-db-types/package.json', JSON.stringify(packageToCreate, null, 2))
}

main()