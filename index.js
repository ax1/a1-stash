#!/home/ubuntu/.nvm/versions/node/v12.13.0/bin/node
const path = require("path")
const util = require("util")
const child_process = require("child_process")
const execPromise = util.promisify("child_process")

module.exports = { run }

/**
 * Stash a folder
 * @param {String} folder 
 */
async function run(folder) {
  if (!folder) throw Error('Usage: command $folder')
  const parent = process.cwd()
  const destName = `${folder}_${Date.now()}.tar.gz`
  const destPath = path.join(parent, destName)
  // compress folder into parent
  const command = `tar -cf ${destPath} ${folder}`
  await execute(command)
  // encrypt with gpg
  await execute(`gpg -c ${destPath}`)
  const encPath = destPath + '.gpg'
  await execute(`rm ${destPath}`)
  // distribute
}


/**
 * See https://bashitout.com/2013/05/18/Ampersands-on-the-command-line.html
 * Generic call to an external process (ie: calling an executable file).
 * Use with CAUTION. Check or sanitize the input (otherwise someone could perform rogue commands by adding data to the expected input string ).
 * If stderr but exit was 0, the response is treated as Error
 * Detached mode is automatically detected, but the stdout is lost as well. Example `sleep 10 &`
 * @param {string} command The instruction typed in the same way as typed in a terminal window. Examples: "ls -la | grep node" or "cat file.txt"
 * @param {executeOptions} options  unref: makes stdio and process to be independent completely
 */
async function execute(command, options) {
  const detach = command.endsWith('&'); // 'detached' symbol in command is not handle by node/libuv, use unref()
  if (options && options.unref)
    child_process.exec(command).unref(); // start and forget. The app can crash and the process would continue to live
  else if (detach)
    child_process.spawn(command, { stdio: 'inherit', shell: true }); //'stdio' to pipe to parent (so logs are shown in journalctl), 'shell' to allow command parameters
  else {
    const { stdout, stderr } = await execPromise(command);
    if (stderr.toString())
      throw new Error(stderr.toString());
    return stdout.toString();
  }
  return '0';
}

run(process.argv[2]).catch(console.error)