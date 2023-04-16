import { execSync } from 'child_process'

const outputDir = 'public/diagrams'

function buildUml(srcFiles, diagramName) {
  execSync(
    `npx tplant --input ${srcFiles} --output ${outputDir}/${diagramName}.puml -A`
    )
  execSync(
    `npx puml generate ${outputDir}/${diagramName}.puml -o ${outputDir}/${diagramName}.svg -s`
    )
  console.log(`Generated ${diagramName}.svg`)
}

buildUml('../src/**/*.ts', 'src')
buildUml('../src/domain/**/*.ts', 'domain')
buildUml('../src/bot/**/*.ts', 'bot')
buildUml('../src/connector/**/*.ts', 'connector')
buildUml('../src/storage/**/*.ts', 'storage')
