declare module "gameplay/assimp" {
  interface Node {
    name: string
    transformation: number[]
    meshes: number[]
    children: Node[]
  }
  interface Mesh {
    name: string
    materialIndex: number
    vertices: number[]
    normals: number[]
    textureCoords: Array<number[]>
    faces: Array<number[]>
  }
  interface Material {
    name: string
    properties: MaterialProperty[]
  }
  interface MaterialProperty {
    key: string
    semantic: number
    type: number
    value: any
  }
  interface Scene {
    rootNode: Node
    meshes: Mesh[]
    materials: Material[]
  }
  function importFile(filepath: string): Scene
}