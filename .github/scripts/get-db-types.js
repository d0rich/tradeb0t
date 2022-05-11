const fs = require('fs')

function main(){
  const clientTypesContent = fs
    .readFileSync('./node_modules/.prisma/client/index.d.ts', 'utf-8')

  if (!clientTypesContent) throw new Error('File with types not found')


  const fileStart = 
  `/**\n * Model `

  const fileEnd = 
  `/**\n * ##  Prisma Client`

  function stringToRegExpPattern(string){
    return string
            .replaceAll('/', '\\/')
            .replaceAll('*', '\\*')
            .replaceAll('#', '\\#')
  }

  const regexp = new RegExp(`${stringToRegExpPattern(fileStart)}[\\w\\W]*${stringToRegExpPattern(fileEnd)}`)

  const match = clientTypesContent.match(regexp)

  if (!match) throw new Error('Types was not matched')

  const generatedTypes = match[0].replace(fileEnd, '')

  console.log('Generated types: \n', generatedTypes)

  if(!fs.existsSync('./tmp')) fs.mkdirSync('./tmp')
  if(!fs.existsSync('./tmp/trade-bot-db-types')) fs.mkdirSync('./tmp/trade-bot-db-types')
  fs.writeFileSync('./tmp/trade-bot-db-types/index.d.ts', generatedTypes)
}

main()