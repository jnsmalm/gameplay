import * as os from "os"
import * as child_process from "child_process"
import * as fs from "fs-extra"
import * as request from "request"
import * as archiver from "archiver"
import * as targz from "targz"
import * as path from "path"
import * as unzip from "unzip"

const nodever = "7.7.3"
const gamever = "0.7.9"

function download(url: string, filename: string) {
  console.log(`download ${url}...`)
  return new Promise<void>((resolve) => {
    request(url, resolve).pipe(fs.createWriteStream(filename))
  });
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

async function build(addon: string) {
  await execute("cmake-js", ["rebuild", "-d", addon, "-v", nodever])
  await copy(`${addon}/build/release/gameplay-${addon}.node`,
    `dist/node_modules/gameplay/${addon}/${addon}.node`)
  await copy(`${addon}/index.js`,
    `dist/node_modules/gameplay/${addon}/index.js`)
  await copy(`${addon}/index.d.ts`,
    `dist/node_modules/gameplay/${addon}/index.d.ts`)
}

interface Platform {
  nodeurl: string
  nodeexe: string
  name: string
  extract(filename: string, dest: string): Promise<void>
  archive(dir: string, filename: string): Promise<void>
}

class Macos implements Platform {
  get nodeurl() {
    return `https://nodejs.org/dist/v${nodever}/node-v${nodever}-darwin-x64.tar.gz`
  }

  get nodeexe() {
    return `node-v${nodever}-darwin-x64/bin/node`
  }

  get name() {
    return "macos"
  }

  extract(filename: string, dest: string) {
    console.log(`extract ${filename}...`)
    return new Promise<void>((resolve) => {
      targz.decompress({ src: filename, dest: dest, tar: {} }, resolve)
    })
  }

  archive(dir: string, filename: string) {
    console.log(`archive ${filename}...`)
    return new Promise<void>((resolve) => {
      process.chdir(dir)
      const output = fs.createWriteStream(__dirname + filename)
        .on("close", resolve);
      const archive = archiver('tar', { gzip: true });
      archive.pipe(output);
      archive.directory(".");
      archive.finalize();
    })
  }
}

class Win32 implements Platform {
  get nodeurl() {
    return `https://nodejs.org/dist/v${nodever}/node-v${nodever}-win-x64.zip`
  }

  get nodeexe() {
    return `node-v${nodever}-win-x64/bin/node.exe`
  }

  get name() {
    return "windows"
  }

  extract(filename: string, dest: string) {
    console.log(`extract ${filename}...`)
    return new Promise<void>((resolve) => {
      const stream = fs.createWriteStream(__dirname + filename)
        .on("close", resolve); 
      stream.pipe(unzip.Extract({ path: dest }));
    })
  }

  archive(dir: string, filename: string) {
    console.log(`archive ${filename}...`)
    return new Promise<void>((resolve) => {
      process.chdir(dir)
      const output = fs.createWriteStream(__dirname + filename)
        .on("close", resolve);
      const archive = archiver("zip", { store: false });
      archive.pipe(output);
      archive.directory(".");
      archive.finalize();
    })
  }
}

let platform: Platform
switch (os.platform()) {
  case "win32": {
    platform = new Win32()
    break
  }
  case "darwin": {
    platform = new Macos()
    break
  }
}

function* addons() {
  yield "openal"
  yield "opengl"
  yield "glfw"
  yield "truetype"
  yield "image"
  yield "vorbis"
}

(async function () {
  for (let addon of addons()) {
    await build(addon)
  }
  await download(platform.nodeurl, "node.tar.gz")
  await platform.extract("node.tar.gz", ".")
  await copy(platform.nodeexe, `dist/bin/${path.basename(platform.nodeexe)}`)
  await copy("README.md", "dist/README.md")
  await copy("LICENSE", "dist/LICENSE")
  await copy("tsconfig.json", "dist/tsconfig.json")
  await copy("lib", "dist/node_modules/gameplay/lib")
  await platform.archive("dist", 
    `/gameplay-v${gamever}-${platform.name}-x64.tar.gz`)
})()