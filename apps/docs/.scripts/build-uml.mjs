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

buildUml('../../packages/core/src/**/*.ts', 'src', '-I')
buildUml('../../packages/core/src/domain/**/*.ts', 'domain')
buildUml('../../packages/core/src/bot/**/*.ts', 'bot')
buildUml('../../packages/core/src/connector/**/*.ts', 'connector')
buildUml('../../packages/core/src/storage/**/*.ts', 'storage')
buildUml('../../packages/core/src/algorithms/**/*.ts', 'algorithms')
