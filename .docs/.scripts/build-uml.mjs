import { execSync } from 'child_process'

const outputDir = 'public/diagrams'

function buildUml(srcFiles, diagramName, args = '') {
  execSync(
    `npx tplant --input ${srcFiles} --output ${outputDir}/${diagramName}.puml -A ${args}`
    )
  execSync(
    `npx puml generate ${outputDir}/${diagramName}.puml -o ${outputDir}/${diagramName}.svg -s`
    )
  console.log(`Generated ${diagramName}.svg`)
}

buildUml('../core/src/**/*.ts', 'src', '-I')
buildUml('../core/src/domain/**/*.ts', 'domain')
buildUml('../core/src/bot/**/*.ts', 'bot')
buildUml('../core/src/connector/**/*.ts', 'connector')
buildUml('../core/src/storage/**/*.ts', 'storage')
buildUml('../core/src/algorithms/**/*.ts', 'algorithms')
