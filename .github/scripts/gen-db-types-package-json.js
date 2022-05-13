const fs = require('fs')

function main(){
  const localPackage = JSON.parse(fs.readFileSync('./package.json', 'utf-8'))
  const packageToCreate = {
    name: '@badlabs/trade-bot__db-types',
    version: localPackage.version,
    types: './index.d.ts',
    author: {
      name: "badlabs", 
      email: "dorich2000@gmail.com", 
      url: "https://badlabs.github.io/"
    }
  }
  console.log('Generating package.json ...')
  console.log(packageToCreate)
  fs.writeFileSync('./tmp/trade-bot__db-types/package.json', JSON.stringify(packageToCreate, null, 2))
}

main()