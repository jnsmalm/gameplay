#include <assimp/Importer.hpp>
#include <assimp/scene.h>
#include <assimp/postprocess.h>
#include "node.h"
#include "v8.h"
#include <string>

namespace gameplay {
namespace assimp {

using v8::Context;
using v8::FunctionTemplate;
using v8::FunctionCallbackInfo;
using v8::Function;
using v8::Local;
using v8::Array;
using v8::Number;
using v8::Object;
using v8::Value;
using v8::HandleScope;
using v8::Handle;
using v8::Isolate;
using v8::String;
using v8::Exception;
using v8::Persistent;
using v8::Null;

static Local<Object> GetNode(Isolate* isolate, const aiNode* node) {
  Local<Object> result = Object::New(isolate);

  result->Set(String::NewFromUtf8(isolate, "name"), 
    String::NewFromUtf8(isolate, node->mName.C_Str()));

  Local<Array> transformation = Array::New(isolate);
  result->Set(String::NewFromUtf8(isolate, "transformation"), transformation);

  int n = 0;
  for(int x = 0; x < 4; x++) {
		for(int y = 0; y < 4; y++) {
      transformation->Set(n++, Number::New(isolate, node->mTransformation[x][y]));
		}
	}
  if (node->mNumMeshes) {
      Local<Array> meshes = Array::New(isolate);
      result->Set(String::NewFromUtf8(isolate, "meshes"), meshes);
      for (int i=0; i<node->mNumMeshes; i++) {
        meshes->Set(i, Number::New(isolate, node->mMeshes[i]));
      }
    }
  if (node->mNumChildren) {
    Local<Array> children = Array::New(isolate);
    result->Set(String::NewFromUtf8(isolate, "children"), children);
    for (int i=0; i<node->mNumChildren; i++) {
      children->Set(i, GetNode(isolate, node->mChildren[i]));
    }
  }
  return result;
}

static Local<Array> GetVertices(Isolate* isolate, aiMesh* mesh) {
  Local<Array> result = Array::New(isolate);
  for (int i=0; i<mesh->mNumVertices; i++) {
    result->Set(i * 3 + 0, Number::New(isolate, mesh->mVertices[i].x));
    result->Set(i * 3 + 1, Number::New(isolate, mesh->mVertices[i].y));
    result->Set(i * 3 + 2, Number::New(isolate, mesh->mVertices[i].z));
  }
  return result;
}

static Local<Array> GetNormals(Isolate* isolate, aiMesh* mesh) {
  Local<Array> result = Array::New(isolate);
  for (int i=0; i<mesh->mNumVertices; i++) {
    result->Set(i * 3 + 0, Number::New(isolate, mesh->mNormals[i].x));
    result->Set(i * 3 + 1, Number::New(isolate, mesh->mNormals[i].y));
    result->Set(i * 3 + 2, Number::New(isolate, mesh->mNormals[i].z));
  }
  return result;
}

static Local<Array> GetTangents(Isolate* isolate, aiMesh* mesh) {
  Local<Array> result = Array::New(isolate);
  for (int i=0; i<mesh->mNumVertices; i++) {
    result->Set(i * 3 + 0, Number::New(isolate, mesh->mTangents[i].x));
    result->Set(i * 3 + 1, Number::New(isolate, mesh->mTangents[i].y));
    result->Set(i * 3 + 2, Number::New(isolate, mesh->mTangents[i].z));
  }
  return result;
}

static Local<Array> GetBitangents(Isolate* isolate, aiMesh* mesh) {
  Local<Array> result = Array::New(isolate);
  for (int i=0; i<mesh->mNumVertices; i++) {
    result->Set(i * 3 + 0, Number::New(isolate, mesh->mBitangents[i].x));
    result->Set(i * 3 + 1, Number::New(isolate, mesh->mBitangents[i].y));
    result->Set(i * 3 + 2, Number::New(isolate, mesh->mBitangents[i].z));
  }
  return result;
}

static Local<Array> GetTextureCoords(Isolate* isolate, aiMesh* mesh) {
  Local<Array> result = Array::New(isolate);

  for (int i=0; i<mesh->GetNumUVChannels(); i++) {
    Local<Array> uv = Array::New(isolate);
    int n = 0;
    for (int j=0; j<mesh->mNumVertices; j++) {
      for (int k=0; k<mesh->mNumUVComponents[i]; k++) {
        uv->Set(n++, Number::New(isolate, mesh->mTextureCoords[i][j][k]));
      }
    }
    result->Set(i, uv);
  }
  return result;
}

static Local<Array> GetFaces(Isolate* isolate, aiMesh* mesh) {
  Local<Array> result = Array::New(isolate);

  for (int i=0; i<mesh->mNumFaces; i++) {
    Local<Array> face = Array::New(isolate);
    for (int j=0; j<mesh->mFaces[i].mNumIndices; j++) {
      face->Set(j, Number::New(isolate, mesh->mFaces[i].mIndices[j]));
    }
    result->Set(i, face);
  }
  return result;
}

static Local<Array> GetNumUVComponents(Isolate* isolate, aiMesh* mesh) {
  Local<Array> result = Array::New(isolate);
  for (int i=0; i<mesh->GetNumUVChannels(); i++) {
    result->Set(i, Number::New(isolate, mesh->mNumUVComponents[i]));
  }
  return result;
}

static Local<Array> GetMeshes(Isolate* isolate, const aiScene* scene) {
  Local<Array> result = Array::New(isolate);

  for (int i=0; i<scene->mNumMeshes; i++) {
    Local<Object> mesh = Object::New(isolate);

    mesh->Set(String::NewFromUtf8(isolate, "name"), 
      String::NewFromUtf8(isolate, scene->mMeshes[i]->mName.C_Str()));
    mesh->Set(String::NewFromUtf8(isolate, "materialIndex"), 
      Number::New(isolate, scene->mMeshes[i]->mMaterialIndex));
    mesh->Set(String::NewFromUtf8(isolate, "primitiveTypes"), 
      Number::New(isolate, scene->mMeshes[i]->mPrimitiveTypes));

    if (scene->mMeshes[i]->HasPositions()) {
      mesh->Set(String::NewFromUtf8(isolate, "vertices"), 
        GetVertices(isolate, scene->mMeshes[i]));
    }
    if (scene->mMeshes[i]->HasNormals()) {
      mesh->Set(String::NewFromUtf8(isolate, "normals"), 
        GetNormals(isolate, scene->mMeshes[i]));
    }
    if (scene->mMeshes[i]->HasTangentsAndBitangents()) {
      mesh->Set(String::NewFromUtf8(isolate, "tangents"), 
        GetTangents(isolate, scene->mMeshes[i]));
      mesh->Set(String::NewFromUtf8(isolate, "bitangents"), 
        GetBitangents(isolate, scene->mMeshes[i]));
    }
    if (scene->mMeshes[i]->GetNumUVChannels()) {
      mesh->Set(String::NewFromUtf8(isolate, "numUVComponents"), 
        GetNumUVComponents(isolate, scene->mMeshes[i]));
      mesh->Set(String::NewFromUtf8(isolate, "textureCoords"), 
        GetTextureCoords(isolate, scene->mMeshes[i]));
    }
    if (scene->mMeshes[i]->HasFaces()) {
      mesh->Set(String::NewFromUtf8(isolate, "faces"), 
        GetFaces(isolate, scene->mMeshes[i]));
    }

    result->Set(i, mesh);
  }
  return result;
}

static Local<Value> GetPropertyValue(Isolate* isolate, aiMaterial* material, const aiMaterialProperty* prop) {
  if (prop->mType == aiPTI_Float) {
    if (prop->mDataLength/sizeof(float) > 1) {
      Local<Array> value = Array::New(isolate);
      for(int i = 0; i < prop->mDataLength/sizeof(float); i++) {
        value->Set(i, Number::New(isolate, reinterpret_cast<float*>(prop->mData)[i]));
      }
      return value;
    } 
    return Number::New(isolate, *reinterpret_cast<float*>(prop->mData));
  }
  if (prop->mType == aiPTI_Integer) {
    if (prop->mDataLength/sizeof(int) > 1) {
      Local<Array> value = Array::New(isolate);
      for(int i = 0; i < prop->mDataLength/sizeof(int); i++) {
        value->Set(i, Number::New(isolate, reinterpret_cast<int*>(prop->mData)[i]));
      }
      return value;
    } 
    return Number::New(isolate, *reinterpret_cast<int*>(prop->mData));
  }
  if (prop->mType == aiPTI_String) {
    aiString str;
    aiGetMaterialString(material, prop->mKey.data, prop->mSemantic, prop->mIndex, &str);
    return String::NewFromUtf8(isolate, str.C_Str());
  }
  return Null(isolate);
}

static Local<Array> GetProperties(Isolate* isolate, aiMaterial* material) {
  Local<Array> result = Array::New(isolate);

  for (int i=0; i<material->mNumProperties; i++) {
    Local<Object> property = Object::New(isolate);
    const aiMaterialProperty* materialProperty = material->mProperties[i];

    property->Set(String::NewFromUtf8(isolate, "key"), 
      String::NewFromUtf8(isolate, materialProperty->mKey.C_Str()));
    property->Set(String::NewFromUtf8(isolate, "semantic"), 
      Number::New(isolate, materialProperty->mSemantic));
    property->Set(String::NewFromUtf8(isolate, "index"), 
      Number::New(isolate, materialProperty->mIndex));
    property->Set(String::NewFromUtf8(isolate, "type"), 
      Number::New(isolate, materialProperty->mType));
    property->Set(String::NewFromUtf8(isolate, "value"), 
      GetPropertyValue(isolate, material, materialProperty));
    
    result->Set(i, property);
  }
  return result;
}

static Local<Array> GetMaterials(Isolate* isolate, const aiScene* scene) {
  Local<Array> result = Array::New(isolate);
  for (int i=0; i<scene->mNumMaterials; i++) {
    Local<Object> material = Object::New(isolate);
    material->Set(String::NewFromUtf8(isolate, "properties"), 
      GetProperties(isolate, scene->mMaterials[i]));
    result->Set(i, material);
  }
  return result;
}

static void ImportFile(const FunctionCallbackInfo<Value>& args) {
  Isolate* isolate = args.GetIsolate();

  if (!args[0]->IsString()) {
    isolate->ThrowException(Exception::TypeError(
        String::NewFromUtf8(isolate, "Wrong arguments")));
    return;
  }
  String::Utf8Value filename(args[0]);

  int processFlags = aiProcessPreset_TargetRealtime_Fast;
  if (args[1]->IsNumber()) {
    processFlags = args[1]->NumberValue();
  }

  Assimp::Importer importer;
  importer.SetPropertyInteger(
    AI_CONFIG_PP_SBP_REMOVE, aiPrimitiveType_POINT | aiPrimitiveType_LINE);

  const aiScene* scene = importer.ReadFile(*filename, processFlags);
  if (scene == nullptr) {
    return;
  }

  Local<Object> result = Object::New(isolate);

  result->Set(String::NewFromUtf8(isolate, "rootNode"), 
    GetNode(isolate, scene->mRootNode));
  result->Set(String::NewFromUtf8(isolate, "flags"), 
    Number::New(isolate, scene->mFlags));
  result->Set(String::NewFromUtf8(isolate, "meshes"), 
    GetMeshes(isolate, scene));
  result->Set(String::NewFromUtf8(isolate, "materials"), 
    GetMaterials(isolate, scene));

  args.GetReturnValue().Set(result);
}

void Initialize(
    Local<Object> target, Local<Value> unused, Local<Context> context) {
  NODE_SET_METHOD(target, "importFile", ImportFile);
}

}  // namespace assimp
}  // namespace gameplay

NODE_MODULE(assimp, gameplay::assimp::Initialize)