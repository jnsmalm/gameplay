import * as os from "os"
import * as child_process from "child_process"
import * as fs from "fs-extra"
import * as request from "request"
import * as archiver from "archiver"
import * as targz from "targz"
import * as path from "path"
import * as unzip from "unzip"
import * as cpx from "cpx"

const nodever = "8.5.0"
const gamever = "0.8.3"

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
    await execute(
      "cmake-js", ["rebuild", "-d", `addons/${this.name}`, "-v", nodever])
    await copy(
      `addons/${this.name}/build/release/gameplay-${this.name}.node`,
      `dist/node_modules/gameplay/${this.name}/${this.name}.node`)
    await copyglob(
      `addons/${this.name}/index*.*`, 
      `dist/node_modules/gameplay/${this.name}`)
  }
}

class OpenAL extends Addon {
  constructor() {
    super("openal")
  }
  async build() {
    await super.build()
    await copyglob(
      `addons/${this.name}/build/release/{libopenal.dylib,OpenAL32.dll}`, 
      `dist/node_modules/gameplay/${this.name}`)
    await copy(
      `addons/${this.name}/openal-soft-1.18.1/copying`, 
      `dist/_licenses/openal-soft`)
  }
}

class GLFW extends Addon {
  constructor() {
    super("glfw")
  }
  async build() {
    await super.build()
    await copy(
      `addons/${this.name}/glfw-3.2.1/copying.txt`, 
      `dist/_licenses/glfw`)
  }
}

interface Platform {
  nodeurl: string
  nodedir: string
  nodeexe: string
  arch: string
  extract(filename: string, dest: string): Promise<void>
  archive(dir: string, filename: string): Promise<void>
}

class Macos implements Platform {
  get nodeurl() {
    return `https://nodejs.org/dist/v${nodever}/node-v${nodever}-darwin-x64.tar.gz`
  }

  get nodedir() {
    return `node-v${nodever}-darwin-x64`
  }

  get nodeexe() {
    return `${this.nodedir}/bin/node`
  }

  get arch() {
    return "x64"
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
    return `https://nodejs.org/dist/v${nodever}/node-v${nodever}-win-x86.zip`
  }

  get nodedir() {
    return `node-v${nodever}-win-x86`
  }

  get nodeexe() {
    return `${this.nodedir}/node.exe`
  }

  get arch() {
    return "x86"
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
  yield new GLFW()
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
  await copyglob(`${platform.nodeexe}`, "dist")
  await copy(`${platform.nodedir}/license`, "dist/_licenses/nodejs")
  await copy("license", "dist/_licenses/gameplayjs")
  await copy("tutorials", "dist/tutorials")
  await copy("lib", "dist/node_modules/gameplay/lib")
  await platform.archive("dist", 
    `/gameplay-v${gamever}-${os.platform()}-${platform.arch}`)
})()