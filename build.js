const { runShellCmd } = require( 'deploy-toolkit' )
const fs = require('fs-extra')
const path = require('path')
const ROOT_DIR = process.cwd()
const IGNORE_FILES = ['.DS_Store', '.git', '.gitignore', 'node_modules', 'dist'] 
const DIST_FILENAME = 'treasure.tar.gz'

async function main() {
  const distPath = path.join(ROOT_DIR, 'dist')
  if(fs.existsSync(distPath)) {
    fs.removeSync(distPath)
  }
  fs.mkdirSync(distPath)
  let dirs = fs.readdirSync(ROOT_DIR)
  dirs = dirs.filter(d => !IGNORE_FILES.includes(d))
  dirs.map(d => {
    fs.copySync(path.join(ROOT_DIR, d), path.join(distPath, d))
  })

  try {
    await runShellCmd( 'tar', [ '-czf', path.join( ROOT_DIR, DIST_FILENAME ), '-C', path.join( ROOT_DIR ), '.' ] )
    fs.removeSync(distPath)
  } catch(err) {
  }
}

main()