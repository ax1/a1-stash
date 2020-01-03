#!/home/ubuntu/.nvm/versions/node/v12.13.0/bin/node
import { execute } from "a1-util"
import path from "path"

async function run() {
  const folder = process.argv[2]
  if (!folder) throw Error('Error: add the folder name')
  const parent = process.cwd()
  const destName = `${folder}_${Date.now()}.tar.gz`
  const destPath = path.join(parent, destName)
  //compress folder into parent
  const command = `tar -cf ${destPath} ${folder}`
  //await execute(command)
  console.log(command);
}

run().catch(console.error)