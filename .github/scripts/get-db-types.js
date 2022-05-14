const fs = require('fs')

const NEW_TYPES_BASEDIR = './tmp/trade-bot__db-types'

function getTypes(){
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

  const generatedTypes = match[0]
    .replace(fileEnd, '')
    .replaceAll('D_', '')
    .replaceAll('export type ', 'export interface I')

  console.log('Generated types: \n', generatedTypes)

  if(!fs.existsSync('./tmp')) fs.mkdirSync('./tmp')
  if(!fs.existsSync(NEW_TYPES_BASEDIR)) fs.mkdirSync(NEW_TYPES_BASEDIR)
  return generatedTypes
}

function changeVersion(){
  const tradebotPackageJson = JSON.parse(fs.readFileSync('./package.json', 'utf-8'))
  let dbTypesPackageJson = JSON.parse(fs.readFileSync(`${NEW_TYPES_BASEDIR}/package.json`, 'utf-8'))
  const tradebotVersion = {}
  const dbTypesVersion = {}
  tradebotVersion.major = tradebotPackageJson.version.split('.').map(v => +v)[0]
  tradebotVersion.minor = tradebotPackageJson.version.split('.').map(v => +v)[1]
  dbTypesVersion.major = dbTypesPackageJson.version.split('.').map(v => +v)[0]
  dbTypesVersion.minor = dbTypesPackageJson.version.split('.').map(v => +v)[1]
  const packageJson = {
    ...dbTypesPackageJson,
    version: `${tradebotVersion.major}.${dbTypesVersion.major === tradebotVersion.major ? dbTypesVersion.minor + 1 : 0}.0`,
  }
  console.log('Generating package.json ...')
  console.log(packageJson)
  fs.writeFileSync(`${NEW_TYPES_BASEDIR}/package.json`, JSON.stringify(packageJson, null, 2))
  dbTypesPackageJson = JSON.parse(fs.readFileSync(`${NEW_TYPES_BASEDIR}/package.json`, 'utf-8'))
  updateCompatibleVersions({ tradebotV: tradebotPackageJson.version, dbTypesV: dbTypesPackageJson.version })
}

function updateCompatibleVersions({ tradebotV, dbTypesV }){
  const readme = fs.readFileSync(`${NEW_TYPES_BASEDIR}/README.md`, 'utf-8')
  const tableMd = readme.match(/<!--versions-compatability-start-->[\w\W]*<!--versions-compatability-end-->/)[0]
  const tableHeader = tableMd
    .split('\n')
    .filter(line => line.includes('|'))
    .filter((_, index) => index <= 1)
    .join('\n')
  const table = tableMd
    .split('\n')
    .filter(line => line.includes('|'))
    .filter((_, index) => index > 1)
    .map(line => {
      const [_, tradebot, dbTypes] = line.split('|')
      return { tradebot, dbTypes }
    })
  if (!table.some(line => line.tradebot === tradebotV && line.dbTypes === dbTypesV))
    table.push({ tradebot: tradebotV, dbTypes: dbTypesV })
  const newTableMd = 
`<!--versions-compatability-start-->

${tableHeader}
${table.map(line => `|${line.tradebot}|${line.dbTypes}|`).join('\n')}

<!--versions-compatability-end-->`
  fs.writeFileSync(`${NEW_TYPES_BASEDIR}/README.md`, readme.replace(tableMd, newTableMd))
}

function main(){
  const newTypes = getTypes()
  const oldTypes = fs.readFileSync('./tmp/trade-bot__db-types/index.d.ts', 'utf-8')
  if (newTypes !== oldTypes) changeVersion()
  fs.writeFileSync('./tmp/trade-bot__db-types/index.d.ts', newTypes)
}

main()