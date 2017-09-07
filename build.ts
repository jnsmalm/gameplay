import * as os from "os"
import * as child_process from "child_process"
import * as fs from "fs-extra"
import * as request from "request"
import * as archiver from "archiver"
import * as targz from "targz"
import * as path from "path"
import * as unzip from "unzip"
import * as cpx from "cpx"

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

async function copyglob(src: string, dest: string) {
  return new Promise<void>((resolve) => {
    cpx.copy(src, dest, resolve)
  })
}

class Addon {
  constructor(protected name: string) {
  }
  async build() {
    await execute("cmake-js", ["rebuild", "-d", this.name, "-v", nodever])
    await copy(`${this.name}/build/release/gameplay-${this.name}.node`,
      `dist/node_modules/gameplay/${this.name}/${this.name}.node`)
    await copyglob(
      `${this.name}/index*.*`, `dist/node_modules/gameplay/${this.name}`)
  }
}

class OpenAL extends Addon {
  constructor() {
    super("openal")
  }
  async build() {
    await super.build()
    await copyglob(`${this.name}/build/release/{libopenal.dylib,OpenAL32.dll}`, 
      `dist/node_modules/gameplay/${this.name}`)
  }
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
      const output = fs.createWriteStream(__dirname + filename + ".tar.gz")
        .on("close", resolve);
      const archive = archiver('tar', { gzip: true });
      archive.pipe(output);
      archive.directory(`${dir}/`, false);
      archive.finalize();
    })
  }
}

class Win32 implements Platform {
  get nodeurl() {
    return `https://nodejs.org/dist/v${nodever}/node-v${nodever}-win-x64.zip`
  }

  get nodeexe() {
    return `node-v${nodever}-win-x64/node.exe`
  }

  get name() {
    return "windows"
  }

  extract(filename: string, dest: string) {
    console.log(`extract ${filename}...`)
    return new Promise<void>((resolve) => {
      const stream = fs.createReadStream(path.join(__dirname, filename))
        .on("close", resolve); 
      stream.pipe(unzip.Extract({ path: dest }));
    })
  }

  archive(dir: string, filename: string) {
    console.log(`archive ${filename}...`)
    return new Promise<void>((resolve) => {
      const output = fs.createWriteStream(__dirname + filename + ".zip")
        .on("close", resolve);
      const archive = archiver("zip", { store: false });
      archive.pipe(output);
      archive.directory(`${dir}/`, false);
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
  yield new OpenAL()
  yield new Addon("opengl")
  yield new Addon("glfw")
  yield new Addon("truetype")
  yield new Addon("image")
  yield new Addon("vorbis")
}

(async function () {
  for (let addon of addons()) {
    await addon.build()
  }
  await download(platform.nodeurl, "node.tar.gz")
  await platform.extract("node.tar.gz", ".")
  await copy(platform.nodeexe, `dist/bin/${path.basename(platform.nodeexe)}`)
  await copyglob("{LICENSE,tsconfig.json}", "dist")
  await copy("lib", "dist/node_modules/gameplay/lib")
  await platform.archive("dist", `/gameplay-v${gamever}-${platform.name}-x64`)
})()