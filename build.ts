import * as os from "os"
import * as child_process from "child_process"
import * as fs from "fs-extra"
import * as request from "request"
import * as archiver from "archiver"
import * as targz from "targz"
import * as path from "path"

const nodever = "7.7.3"
const gamever = "0.1.0"

function download(url: string, filename: string) {
  console.log(`download ${url}...`)
  return new Promise<void>((resolve) => {
    request(url, resolve).pipe(fs.createWriteStream(filename))
  });
}

function extract(filename: string, dest: string = ".", tar: any = {}) {
  console.log(`extract ${filename}...`)
  return new Promise<void>((resolve) => {
    targz.decompress({ src: filename, dest: dest, tar: tar }, resolve)
  })
}

function execute(command: string, args: string[] = []) {
  console.log(`execute "${command}"...`)
  return new Promise<void>((resolve) => {
    const cmd = child_process.spawn(command, args, { shell: true })
      .on("close", resolve)
    cmd.stderr.pipe(process.stderr)
    cmd.stdout.pipe(process.stdout)
  })
}

function mkdir(dir: string) {
  console.log(`mkdir ${dir}...`)
  return new Promise<void>((resolve) => {
    fs.ensureDir(path.dirname(dir), resolve)
  })
}

async function copy(src: string, dest: string) {
  console.log(`copy "${src}" to ${dest}...`)
  await mkdir(path.dirname(dest))
  return new Promise<void>((resolve) => {
    fs.copy(src, dest, null, resolve)
  })
}

function archive(filename: string) {
  console.log(`archive ${filename}...`)
  return new Promise<void>((resolve) => {
    process.chdir("dist")
    const output = fs.createWriteStream(__dirname + filename)
      .on("close", resolve);
    const archive = archiver('tar', { gzip: true });
    archive.pipe(output);
    archive.directory(".");
    archive.finalize();
  })
}

(async function () {
  for (let addon of ["glfw"]) {
    await execute("cmake-js", ["rebuild", "-d", `addons/${addon}`])
    await copy(`addons/${addon}/build/release/gameplay-${addon}.node`,
      `dist/node_modules/${addon}/${addon}.node`)
    await copy(`addons/${addon}/index.js`,
      `dist/node_modules/${addon}/index.js`)
    await copy(`addons/${addon}/index.d.ts`,
      `dist/node_modules/${addon}/index.d.ts`)
  }
  await download(
    `https://nodejs.org/dist/v${nodever}/node-v${nodever}-${os.platform()}-${os.arch()}.tar.gz`, 
    "node.tar.gz")
  await extract("node.tar.gz")
  await copy(`node-v${nodever}-${os.platform()}-${os.arch()}/bin/node`, 
    "dist/bin/gameplay")
  await copy(`README.md`, "dist/README.md")
  await copy(`LICENSE`, "dist/LICENSE")
  await copy(`tsconfig.json`, "dist/tsconfig.json")
  await archive(`/gameplay-v${gamever}-${os.platform()}-${os.arch()}.tar.gz`)
})()