import * as os from "os"
import * as child_process from "child_process"
import * as fs from "fs-extra"
import * as request from "request"
import * as archiver from "archiver"
import * as path from "path"
import * as cpx from "cpx"
import * as tar from "tar"

// @ts-ignore: Could not find a declaration file for module 'unzip'
import * as unzip from "unzip"

const nodever = "8.5.0"
const gamever = "0.8.5"

function download(url: string, filename: string) {
  console.log(`download ${url}...`)
  return new Promise<void>((resolve) => {
    request(url, resolve).pipe(fs.createWriteStream(filename))
  });
}

function execute(command: string, args: string[] = []) {
  console.log(`execute "${command}"...`)
  return new Promise<void>(resolve => {
    const cmd = child_process.spawn(command, args, { shell: true })
      .on("close", resolve)
      .on("exit", (code, signal) => {
        if (code) {
          process.exit(code)
        }
      })
    cmd.stderr.pipe(process.stderr)
    cmd.stdout.pipe(process.stdout)
  })
}

function mkdir(dir: string) {
  console.log(`mkdir ${dir}...`)
  return new Promise<Error | null>(resolve => {
    fs.ensureDir(path.dirname(dir), resolve)
  })
}

async function copy(src: string, dest: string) {
  console.log(`copy "${src}" to ${dest}...`)
  await mkdir(path.dirname(dest))
  return new Promise<Error | null>(resolve => {
    fs.copy(src, dest, {}, resolve)
  })
}

async function copyglob(src: string, dest: string) {
  return new Promise<Error | null>((resolve) => {
    cpx.copy(src, dest, resolve)
  })
}

function dropbox(filepath: string) {
  return new Promise<void>((resolve, reject) => {
    var Dropbox = require('dropbox')
    var dbx = new Dropbox({ accessToken: process.env.DROPBOX_ACCESS_TOKEN });
    fs.readFile(path.join(__dirname, filepath), (err, contents) => {
      if (err) {
        reject(err)
        return
      }
      let dest = `/${Date.now()}_${path.basename(filepath)}`
      console.log(`dropbox ${dest}...`)
      dbx.filesUpload({ path: dest, contents: contents })
        .then(resolve)
        .catch((err: string) => {
          reject(err)
        });
    });
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
      `addons/${this.name}/build/release/{libopenal.1.dylib,OpenAL32.dll}`,
      `dist/node_modules/gameplay/${this.name}`)
    await copy(
      `addons/${this.name}/openal-soft-1.18.1/copying`,
      `dist/third_party_licenses/openal-soft`)
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
      `dist/third_party_licenses/glfw`)
  }
}

class Assimp extends Addon {
  constructor() {
    super("assimp")
  }
  async build() {
    let fmt = platform.archiveFormat
    let url = `https://github.com/assimp/assimp/archive/v4.0.1.${fmt}`
    await download(url, `assimp.${fmt}`)
    await platform.extract(`assimp.${fmt}`, "addons/assimp")
    await super.build()
    await copy(
      `addons/${this.name}/assimp-4.0.1/LICENSE`,
      `dist/third_party_licenses/assimp`)
  }
}

interface Platform {
  nodeurl: string
  nodedir: string
  nodeexe: string
  gameplay_script: string
  arch: string
  archiveFormat: string
  copy_gameplay_script(destdir: string): void
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

  get archiveFormat() {
    return "tar.gz"
  }

  get gameplay_script() {
    return "gameplay.sh"
  }

  async copy_gameplay_script(destdir: string) {
    await copy("gameplay.sh", destdir + "/gameplay")
    await execute("chmod", ["+x", "dist/gameplay"])
  }

  extract(filename: string, dest: string) {
    console.log(`extract ${filename}...`)
    return tar.x({
      file: filename,
      C: dest
    })
  }

  archive(dir: string, filename: string) {
    console.log(`archive ${filename}...`)
    return tar.c({
      gzip: true,
      file: __dirname + filename + ".tar.gz",
      C: dir
    }, ["."])
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

  get archiveFormat() {
    return "zip"
  }

  get gameplay_script() {
    return "gameplay.cmd"
  }

  async copy_gameplay_script(destdir: string) {
    await copy("gameplay.cmd", destdir + "/gameplay.cmd")
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

let platform: Platform = new Win32()
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
  yield new Assimp()
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
  await platform.copy_gameplay_script("dist")
  await copyglob(`${platform.nodeexe}`, "dist/bin")
  await copy(`${platform.nodedir}/license`, "dist/third_party_licenses/nodejs")
  await copy("LICENSE", "dist/LICENSE")
  await copyglob("lib/**/{*.js,*.d.ts}", "dist/node_modules/gameplay/lib")
  await copy("lib/content", "dist/node_modules/gameplay/lib/content")
  await platform.archive("dist",
    `/gameplay-v${gamever}-${os.platform()}-${platform.arch}`)
  if (process.env.DROPBOX_ACCESS_TOKEN) {
    await dropbox(
      `/gameplay-v${gamever}-${os.platform()}-${platform.arch}.tar.gz`)
  }
})()