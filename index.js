const {spawn} = require('child_process')
const {debounce} = require('lodash')
const chokidar = require('chokidar')
const args = process.argv.slice(2)

// If the environment is development, we want to auto restart our server for faster development (just for fun)
if (args.includes('--dev') || process.env.NODE_ENV === 'development') {
  let server
  function spawnAndWait() {
    console.info('✓ SERVER SPAWN ')
    server = spawn('node', ['--require', 'babel-register', './server/server'], { stdio: 'inherit' })
    server.on('error', console.error.bind(console))
    server.on('exit', spawnAndWait)
  }
  const options = { ignored: /(^|[/\\])\../, persistent: true }
  const watcher = chokidar.watch([
    'core/**/*.js',
    'server/**/*.js',
  ], options)

  watcher.on('ready', () => {
    spawnAndWait()
    watcher.on('all', debounce(() => server.kill(), 100))
  })
} else {
  require('./server/server.js')
}
