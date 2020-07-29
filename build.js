const { runShellCmd } = require( 'deploy-toolkit' )
const fs = require('fs-extra')
const path = require('path')
const ROOT_DIR = process.cwd()
const IGNORE_FILES = ['.DS_Store', '.git', '.gitignore', 'node_modules'] 
const DIST_FILENAME = 'treasure.tar.gz'

async function main() {
  const distPath = path.join(ROOT_DIR, 'dist')
  const artifactPath = path.join( ROOT_DIR, DIST_FILENAME )
  if(fs.existsSync(distPath)) {
    fs.removeSync(distPath)
  }
  if(fs.existsSync(artifactPath)) {
    fs.removeSync(artifactPath)
  }
  let dirs = fs.readdirSync(ROOT_DIR)
  dirs = dirs.filter(d => !IGNORE_FILES.includes(d))

  fs.mkdirSync(distPath)
  
  dirs.map(d => {
    fs.copySync(path.join(ROOT_DIR, d), path.join(distPath, d))
  })

  try {
    await runShellCmd( 'tar', [ '-czf', artifactPath, '-C', path.join( distPath ), '.' ] )
    fs.removeSync(distPath)
  } catch(err) {
  }
}

main()