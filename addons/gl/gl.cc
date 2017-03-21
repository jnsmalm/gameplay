#include "node.h"
#include "v8.h"
#include "gl/gl3w.h"

namespace gameplay {
namespace gl {

using v8::Context;
using v8::FunctionCallbackInfo;
using v8::Local;
using v8::Number;
using v8::Object;
using v8::Value;
using v8::Isolate;
using v8::String;
using v8::Exception;
using v8::ArrayBufferView;

static void ActiveTexture(const FunctionCallbackInfo<Value>& args) {
  Isolate* isolate = args.GetIsolate();

  if (!args[0]->IsNumber()) {
    isolate->ThrowException(Exception::TypeError(
        String::NewFromUtf8(isolate, "Wrong arguments")));
    return;
  }
  GLenum texture = static_cast<GLenum>(args[0]->IntegerValue());
  glActiveTexture(texture);
}

static void AttachShader(const FunctionCallbackInfo<Value>& args) {
  Isolate* isolate = args.GetIsolate();

  if (!args[0]->IsNumber() || !args[1]->IsNumber()) {
    isolate->ThrowException(Exception::TypeError(
        String::NewFromUtf8(isolate, "Wrong arguments")));
    return;
  }
  GLuint program = static_cast<GLuint>(args[0]->IntegerValue());
  GLuint shader = static_cast<GLuint>(args[1]->IntegerValue());

  glAttachShader(program, shader);
}

static void BindBuffer(const FunctionCallbackInfo<Value>& args) {
  Isolate* isolate = args.GetIsolate();

  if (!args[0]->IsNumber() || !args[1]->IsNumber()) {
    isolate->ThrowException(Exception::TypeError(
        String::NewFromUtf8(isolate, "Wrong arguments")));
    return;
  }
  GLenum target = static_cast<GLenum>(args[0]->IntegerValue());
  GLuint buffer = static_cast<GLuint>(args[1]->IntegerValue());

  glBindBuffer(target, buffer);
}

static void BufferData(const FunctionCallbackInfo<Value>& args) {
  Isolate* isolate = args.GetIsolate();

  if (!args[0]->IsNumber() || !args[1]->IsArrayBufferView() ||
      !args[2]->IsNumber()) {
    isolate->ThrowException(Exception::TypeError(
        String::NewFromUtf8(isolate, "Wrong arguments")));
    return;
  }
  GLenum target = static_cast<GLenum>(args[0]->IntegerValue());
  Local<ArrayBufferView> srcData = Local<ArrayBufferView>::Cast(args[1]);
  GLenum usage = static_cast<GLenum>(args[2]->IntegerValue());

  glBufferData(target, 
    srcData->ByteLength(), srcData->Buffer()->GetContents().Data(), usage);
}

static void BindTexture(const FunctionCallbackInfo<Value>& args) {
  Isolate* isolate = args.GetIsolate();

  if (!args[0]->IsNumber()) {
    isolate->ThrowException(Exception::TypeError(
        String::NewFromUtf8(isolate, "Wrong arguments")));
    return;
  }
  GLenum target = static_cast<GLenum>(args[0]->Int32Value());
  GLuint texture = static_cast<GLuint>(args[1]->Int32Value());

  glBindTexture(target, texture);
}

static void BindVertexArray(const FunctionCallbackInfo<Value>& args) {
  Isolate* isolate = args.GetIsolate();

  if (!args[0]->IsNumber()) {
    isolate->ThrowException(Exception::TypeError(
        String::NewFromUtf8(isolate, "Wrong arguments")));
    return;
  }
  GLuint array = static_cast<GLuint>(args[0]->IntegerValue());
  glBindVertexArray(array);
}

static void BlendFunc(const FunctionCallbackInfo<Value>& args) {
  Isolate* isolate = args.GetIsolate();

  if (!args[0]->IsNumber() || !args[1]->IsNumber()) {
    isolate->ThrowException(Exception::TypeError(
        String::NewFromUtf8(isolate, "Wrong arguments")));
    return;
  }
  GLenum sfactor = static_cast<GLenum>(args[0]->Int32Value());
  GLenum dfactor = static_cast<GLenum>(args[1]->Int32Value());

  glBlendFunc(sfactor, dfactor);
}

static void Clear(const FunctionCallbackInfo<Value>& args) {
  Isolate* isolate = args.GetIsolate();

  if (!args[0]->IsNumber()) {
    isolate->ThrowException(Exception::TypeError(
        String::NewFromUtf8(isolate, "Wrong arguments")));
    return;
  }
  GLbitfield mask = static_cast<GLbitfield>(args[0]->Int32Value());
  
  glClear(mask);
}

static void ClearColor(const FunctionCallbackInfo<Value>& args) {
  Isolate* isolate = args.GetIsolate();

  if (!args[0]->IsNumber() || !args[1]->IsNumber() ||
      !args[2]->IsNumber() || !args[3]->IsNumber()) {
    isolate->ThrowException(Exception::TypeError(
        String::NewFromUtf8(isolate, "Wrong arguments")));
    return;
  }
  GLfloat r = static_cast<GLfloat>(args[0]->NumberValue());
  GLfloat g = static_cast<GLfloat>(args[1]->NumberValue());
  GLfloat b = static_cast<GLfloat>(args[2]->NumberValue());
  GLfloat a = static_cast<GLfloat>(args[3]->NumberValue());

  glClearColor(r, g, b, a);
}

static void CompileShader(const FunctionCallbackInfo<Value>& args) {
  Isolate* isolate = args.GetIsolate();

  if (!args[0]->IsNumber()) {
    isolate->ThrowException(Exception::TypeError(
        String::NewFromUtf8(isolate, "Wrong arguments")));
    return;
  }
  GLuint shader = static_cast<GLuint>(args[0]->IntegerValue());

  glCompileShader(shader);
}

static void CreateBuffer(const FunctionCallbackInfo<Value>& args) {
  GLuint buffer;
  glGenBuffers(1, &buffer);
  args.GetReturnValue().Set(buffer);
}

static void CreateShader(const FunctionCallbackInfo<Value>& args) {
  Isolate* isolate = args.GetIsolate();

  if (!args[0]->IsNumber()) {
    isolate->ThrowException(Exception::TypeError(
        String::NewFromUtf8(isolate, "Wrong arguments")));
    return;
  }
  GLenum shaderType = static_cast<GLenum>(args[0]->IntegerValue());

  args.GetReturnValue().Set(glCreateShader(shaderType));
}

static void CreateProgram(const FunctionCallbackInfo<Value>& args) {
  args.GetReturnValue().Set(glCreateProgram());
}

static void CreateTexture(const FunctionCallbackInfo<Value>& args) {
  GLuint texture;
  glGenTextures(1, &texture);
  args.GetReturnValue().Set(texture);
}

static void CreateVertexArray(const FunctionCallbackInfo<Value>& args) {
  GLuint vertexArray;
  glGenVertexArrays(1, &vertexArray);
  args.GetReturnValue().Set(vertexArray);
}

static void Disable(const FunctionCallbackInfo<Value>& args) {
  Isolate* isolate = args.GetIsolate();

  if (!args[0]->IsNumber()) {
    isolate->ThrowException(Exception::TypeError(
        String::NewFromUtf8(isolate, "Wrong arguments")));
    return;
  }
  GLenum cap = static_cast<GLenum>(args[0]->Int32Value());
  glDisable(cap);
}

static void DrawArrays(const FunctionCallbackInfo<Value>& args) {
  Isolate* isolate = args.GetIsolate();

  if (!args[0]->IsNumber() || !args[1]->IsNumber() ||
      !args[2]->IsNumber()) {
    isolate->ThrowException(Exception::TypeError(
        String::NewFromUtf8(isolate, "Wrong arguments")));
    return;
  }
  GLenum mode = static_cast<GLenum>(args[0]->IntegerValue());
  GLint first = static_cast<GLint>(args[1]->IntegerValue());
  GLsizei count = static_cast<GLsizei>(args[2]->IntegerValue());

  glDrawArrays(mode, first, count);
}

static void DrawElements(const FunctionCallbackInfo<Value>& args) {
  Isolate* isolate = args.GetIsolate();

  if (!args[0]->IsNumber() || !args[1]->IsNumber() ||
      !args[2]->IsNumber() || !args[3]->IsNumber()) {
    isolate->ThrowException(Exception::TypeError(
        String::NewFromUtf8(isolate, "Wrong arguments")));
    return;
  }
  GLenum mode = static_cast<GLenum>(args[0]->Int32Value());
  GLsizei count = static_cast<GLsizei>(args[1]->Int32Value());
  GLenum type = static_cast<GLenum>(args[2]->Int32Value());
  GLvoid *offset = reinterpret_cast<GLvoid*>(args[3]->Uint32Value());

  glDrawElements(mode, count, type, offset);
}

static void Enable(const FunctionCallbackInfo<Value>& args) {
  Isolate* isolate = args.GetIsolate();

  if (!args[0]->IsNumber()) {
    isolate->ThrowException(Exception::TypeError(
        String::NewFromUtf8(isolate, "Wrong arguments")));
    return;
  }
  GLenum cap = static_cast<GLenum>(args[0]->Int32Value());
  glEnable(cap);
}

static void EnableVertexAttribArray(const FunctionCallbackInfo<Value>& args) {
  Isolate* isolate = args.GetIsolate();

  if (!args[0]->IsNumber()) {
    isolate->ThrowException(Exception::TypeError(
        String::NewFromUtf8(isolate, "Wrong arguments")));
    return;
  }
  GLuint index = static_cast<GLuint>(args[0]->Int32Value());
  glEnableVertexAttribArray(index);
}

static void GetAttribLocation(const FunctionCallbackInfo<Value>& args) {
  Isolate* isolate = args.GetIsolate();

  if (!args[0]->IsNumber() || !args[1]->IsString()) {
    isolate->ThrowException(Exception::TypeError(
        String::NewFromUtf8(isolate, "Wrong arguments")));
    return;
  }
  GLuint program = static_cast<GLuint>(args[0]->Int32Value());
  String::Utf8Value name(args[1]);

  GLint location = glGetAttribLocation(program, *name);
  args.GetReturnValue().Set(location);
}

static void GetError(const FunctionCallbackInfo<Value>& args) {
  args.GetReturnValue().Set(glGetError());
}

static void GetParameter(const FunctionCallbackInfo<Value>& args) {
  Isolate* isolate = args.GetIsolate();

  if (!args[0]->IsNumber()) {
    isolate->ThrowException(Exception::TypeError(
        String::NewFromUtf8(isolate, "Wrong arguments")));
    return;
  }
  GLenum pname = static_cast<GLenum>(args[0]->IntegerValue());

  GLint status;
  glGetIntegerv(pname, &status);
  args.GetReturnValue().Set(status);
}

static void GetProgramInfoLog(const FunctionCallbackInfo<Value>& args) {
  Isolate* isolate = args.GetIsolate();

  if (!args[0]->IsNumber()) {
    isolate->ThrowException(Exception::TypeError(
        String::NewFromUtf8(isolate, "Wrong arguments")));
    return;
  }
  GLuint shader = static_cast<GLuint>(args[0]->IntegerValue());

  char message[512];
  glGetProgramInfoLog(shader, 512, NULL, message);
  args.GetReturnValue().Set(String::NewFromUtf8(isolate, message));
}

static void GetProgramParameter(const FunctionCallbackInfo<Value>& args) {
  Isolate* isolate = args.GetIsolate();

  if (!args[0]->IsNumber() || !args[1]->IsNumber()) {
    isolate->ThrowException(Exception::TypeError(
        String::NewFromUtf8(isolate, "Wrong arguments")));
    return;
  }
  GLuint shader = static_cast<GLuint>(args[0]->IntegerValue());
  GLenum pname = static_cast<GLenum>(args[1]->IntegerValue());

  GLint status;
  glGetProgramiv(shader, pname, &status);
  args.GetReturnValue().Set(status);
}

static void GetShaderInfoLog(const FunctionCallbackInfo<Value>& args) {
  Isolate* isolate = args.GetIsolate();

  if (!args[0]->IsNumber()) {
    isolate->ThrowException(Exception::TypeError(
        String::NewFromUtf8(isolate, "Wrong arguments")));
    return;
  }
  GLuint shader = static_cast<GLuint>(args[0]->IntegerValue());

  char message[512];
  glGetShaderInfoLog(shader, 512, NULL, message);
  args.GetReturnValue().Set(String::NewFromUtf8(isolate, message));
}

static void GetShaderParameter(const FunctionCallbackInfo<Value>& args) {
  Isolate* isolate = args.GetIsolate();

  if (!args[0]->IsNumber() || !args[1]->IsNumber()) {
    isolate->ThrowException(Exception::TypeError(
        String::NewFromUtf8(isolate, "Wrong arguments")));
    return;
  }
  GLuint shader = static_cast<GLuint>(args[0]->IntegerValue());
  GLenum pname = static_cast<GLenum>(args[1]->IntegerValue());

  GLint status;
  glGetShaderiv(shader, pname, &status);
  args.GetReturnValue().Set(status);
}

static void GetUniformLocation(const FunctionCallbackInfo<Value>& args) {
  Isolate* isolate = args.GetIsolate();

  if (!args[0]->IsNumber() || !args[1]->IsString()) {
    isolate->ThrowException(Exception::TypeError(
        String::NewFromUtf8(isolate, "Wrong arguments")));
    return;
  }
  GLuint program = static_cast<GLuint>(args[0]->Int32Value());
  String::Utf8Value name(args[1]);

  GLint location = glGetUniformLocation(program, *name);
  args.GetReturnValue().Set(location);
}

static void Init(const FunctionCallbackInfo<Value>& args) {
  Isolate* isolate = args.GetIsolate();

  if (gl3wInit()) {
    isolate->ThrowException(Exception::TypeError(
        String::NewFromUtf8(isolate, "Failed to initialize OpenGL")));
  }
}

static void LinkProgram(const FunctionCallbackInfo<Value>& args) {
  Isolate* isolate = args.GetIsolate();

  if (!args[0]->IsNumber()) {
    isolate->ThrowException(Exception::TypeError(
        String::NewFromUtf8(isolate, "Wrong arguments")));
    return;
  }
  GLuint program = static_cast<GLuint>(args[0]->IntegerValue());
  glLinkProgram(program);
}

static void PixelStorei(const FunctionCallbackInfo<Value>& args) {
  Isolate* isolate = args.GetIsolate();

  if (!args[0]->IsNumber() || !args[1]->IsNumber()) {
    isolate->ThrowException(Exception::TypeError(
        String::NewFromUtf8(isolate, "Wrong arguments")));
    return;
  }
  GLenum pname = static_cast<GLenum>(args[0]->Int32Value());
  GLint param = static_cast<GLint>(args[1]->Int32Value());

  glPixelStorei(pname, param);
}

static void ShaderSource(const FunctionCallbackInfo<Value>& args) {
  Isolate* isolate = args.GetIsolate();

  if (!args[0]->IsNumber() || !args[1]->IsString()) {
    isolate->ThrowException(Exception::TypeError(
        String::NewFromUtf8(isolate, "Wrong arguments")));
    return;
  }
  GLuint shader = static_cast<GLuint>(args[0]->IntegerValue());
  String::Utf8Value source(args[1]);
  const char* s[1] = {*source};

  glShaderSource(shader, 1, s, NULL);
}

static void TexImage2D(const FunctionCallbackInfo<Value>& args) {
  Isolate* isolate = args.GetIsolate();

  if (!args[0]->IsNumber() || !args[1]->IsNumber() ||
      !args[2]->IsNumber() || !args[3]->IsNumber() ||
      !args[4]->IsNumber() || !args[5]->IsNumber() ||
      !args[6]->IsNumber() || !args[7]->IsNumber() ||
      (!args[8]->IsArrayBufferView() && !args[8]->IsNull())) {
    isolate->ThrowException(Exception::TypeError(
        String::NewFromUtf8(isolate, "Wrong arguments")));
    return;
  }
  GLenum target = static_cast<GLenum>(args[0]->Int32Value());
  GLint level = static_cast<GLint>(args[1]->Int32Value());
  GLint internalFormat = static_cast<GLint>(args[2]->Int32Value());
  GLsizei width = static_cast<GLsizei>(args[3]->Int32Value());
  GLsizei height = static_cast<GLsizei>(args[4]->Int32Value());
  GLint border = static_cast<GLint>(args[5]->Int32Value());
  GLenum format = static_cast<GLenum>(args[6]->Int32Value());
  GLenum type = static_cast<GLenum>(args[7]->Int32Value());
  GLvoid* data = nullptr;

  if (!args[8]->IsNull()) {
    data = static_cast<GLvoid*>(
      Local<ArrayBufferView>::Cast(args[8])->Buffer()->GetContents().Data());
  }
  glTexImage2D(target, level, 
    internalFormat, width, height, border, format, type, data);
}

static void TexSubImage2D(const FunctionCallbackInfo<Value>& args) {
  Isolate* isolate = args.GetIsolate();

  if (!args[0]->IsNumber() || !args[1]->IsNumber() ||
      !args[2]->IsNumber() || !args[3]->IsNumber() ||
      !args[4]->IsNumber() || !args[5]->IsNumber() ||
      !args[6]->IsNumber() || !args[7]->IsNumber() ||
      (!args[8]->IsArrayBufferView() && !args[8]->IsNull())) {
    isolate->ThrowException(Exception::TypeError(
        String::NewFromUtf8(isolate, "Wrong arguments")));
    return;
  }
  GLenum target = static_cast<GLenum>(args[0]->Int32Value());
  GLint level = static_cast<GLint>(args[1]->Int32Value());
  GLint xoffset = static_cast<GLint>(args[2]->Int32Value());
  GLint yoffset = static_cast<GLint>(args[3]->Int32Value());
  GLsizei width = static_cast<GLsizei>(args[4]->Int32Value());
  GLsizei height = static_cast<GLsizei>(args[5]->Int32Value());
  GLenum format = static_cast<GLenum>(args[6]->Int32Value());
  GLenum type = static_cast<GLenum>(args[7]->Int32Value());
  GLvoid* pixels = nullptr;

  if (!args[8]->IsNull()) {
    pixels = static_cast<GLvoid*>(
      Local<ArrayBufferView>::Cast(args[8])->Buffer()->GetContents().Data());
  }
  glTexSubImage2D(target, level, 
    xoffset, yoffset, width, height, format, type, pixels);
}

static void TexParameteri(const FunctionCallbackInfo<Value>& args) {
  Isolate* isolate = args.GetIsolate();

  if (!args[0]->IsNumber() || !args[1]->IsNumber() ||
      !args[2]->IsNumber()) {
    isolate->ThrowException(Exception::TypeError(
        String::NewFromUtf8(isolate, "Wrong arguments")));
    return;
  }
  GLenum target = static_cast<GLenum>(args[0]->Int32Value());
  GLenum pname = static_cast<GLenum>(args[1]->Int32Value());
  GLint param = static_cast<GLint>(args[2]->Int32Value());

  glTexParameteri(target, pname, param);
}

static void Uniform1f(const FunctionCallbackInfo<Value>& args) {
  Isolate* isolate = args.GetIsolate();

  if (!args[0]->IsNumber() || !args[1]->IsNumber()) {
    isolate->ThrowException(Exception::TypeError(
        String::NewFromUtf8(isolate, "Wrong arguments")));
    return;
  }
  GLint location = static_cast<GLint>(args[0]->Int32Value());
  GLfloat v0 = static_cast<GLfloat>(args[1]->NumberValue());

  glUniform1f(location, v0);
}

static void Uniform1i(const FunctionCallbackInfo<Value>& args) {
  Isolate* isolate = args.GetIsolate();

  if (!args[0]->IsNumber() || !args[1]->IsNumber()) {
    isolate->ThrowException(Exception::TypeError(
        String::NewFromUtf8(isolate, "Wrong arguments")));
    return;
  }
  GLint location = static_cast<GLint>(args[0]->Int32Value());
  GLint v0 = static_cast<GLint>(args[1]->NumberValue());

  glUniform1i(location, v0);
}

static void Uniform3f(const FunctionCallbackInfo<Value>& args) {
  Isolate* isolate = args.GetIsolate();

  if (!args[0]->IsNumber() || !args[1]->IsNumber() ||
      !args[2]->IsNumber() || !args[3]->IsNumber()) {
    isolate->ThrowException(Exception::TypeError(
        String::NewFromUtf8(isolate, "Wrong arguments")));
    return;
  }
  GLint location = static_cast<GLint>(args[0]->Int32Value());
  GLfloat v0 = static_cast<GLfloat>(args[1]->NumberValue());
  GLfloat v1 = static_cast<GLfloat>(args[2]->NumberValue());
  GLfloat v2 = static_cast<GLfloat>(args[3]->NumberValue());

  glUniform3f(location, v0, v1, v2);
}

static void UniformMatrix4fv(const FunctionCallbackInfo<Value>& args) {
  Isolate* isolate = args.GetIsolate();

  if (!args[0]->IsNumber() || !args[1]->IsBoolean() ||
      !args[2]->IsArrayBufferView()) {
    isolate->ThrowException(Exception::TypeError(
        String::NewFromUtf8(isolate, "Wrong arguments")));
    return;
  }
  GLint location = static_cast<GLint>(args[0]->Int32Value());
  GLboolean transpose = static_cast<GLboolean>(args[1]->BooleanValue());
  GLfloat* value = static_cast<GLfloat*>(
      Local<ArrayBufferView>::Cast(args[2])->Buffer()->GetContents().Data());

  glUniformMatrix4fv(location, 1, transpose, value);
}

static void UseProgram(const FunctionCallbackInfo<Value>& args) {
  Isolate* isolate = args.GetIsolate();

  if (!args[0]->IsNumber()) {
    isolate->ThrowException(Exception::TypeError(
        String::NewFromUtf8(isolate, "Wrong arguments")));
    return;
  }
  GLuint program = static_cast<GLuint>(args[0]->IntegerValue());
  glUseProgram(program);
}

static void VertexAttribPointer(const FunctionCallbackInfo<Value>& args) {
  Isolate* isolate = args.GetIsolate();

  if (!args[0]->IsNumber() || !args[1]->IsNumber() || 
      !args[2]->IsNumber() || !args[3]->IsBoolean() || 
      !args[4]->IsNumber() || !args[5]->IsNumber()) {
    isolate->ThrowException(Exception::TypeError(
        String::NewFromUtf8(isolate, "Wrong arguments")));
    return;
  }
  GLuint index = static_cast<GLuint>(args[0]->Int32Value());
  GLint size = static_cast<GLint>(args[1]->Int32Value());
  GLenum type = static_cast<GLenum>(args[2]->Int32Value());
  GLboolean normalized = static_cast<GLboolean>(args[3]->BooleanValue());
  GLsizei stride = static_cast<GLsizei>(args[4]->Int32Value());
  GLvoid *offset = (GLvoid *)args[5]->Int32Value();

  glVertexAttribPointer(index, size, type, normalized, stride, offset);
}

static void ViewPort(const FunctionCallbackInfo<Value>& args) {
  Isolate* isolate = args.GetIsolate();

  if (!args[0]->IsNumber() || !args[1]->IsNumber() || 
      !args[2]->IsNumber() || !args[3]->IsNumber()) {
    isolate->ThrowException(Exception::TypeError(
        String::NewFromUtf8(isolate, "Wrong arguments")));
    return;
  }
  int x = args[0]->IntegerValue();
  int y = args[1]->IntegerValue();
  int w = args[2]->IntegerValue();
  int h = args[3]->IntegerValue();

  glViewport(x, y, w, h);
}

void Initialize(Local<Object> target,
                Local<Value> unused,
                Local<Context> context) {
  NODE_SET_METHOD(target, "activeTexture", ActiveTexture);
  NODE_SET_METHOD(target, "attachShader", AttachShader);
  NODE_SET_METHOD(target, "blendFunc", BlendFunc);
  NODE_SET_METHOD(target, "bufferData", BufferData);
  NODE_SET_METHOD(target, "bindBuffer", BindBuffer);
  NODE_SET_METHOD(target, "bindTexture", BindTexture);
  NODE_SET_METHOD(target, "bindVertexArray", BindVertexArray);
  NODE_SET_METHOD(target, "clear", Clear);
  NODE_SET_METHOD(target, "clearColor", ClearColor);
  NODE_SET_METHOD(target, "compileShader", CompileShader);
  NODE_SET_METHOD(target, "createBuffer", CreateBuffer);
  NODE_SET_METHOD(target, "createProgram", CreateProgram);
  NODE_SET_METHOD(target, "createShader", CreateShader);
  NODE_SET_METHOD(target, "createTexture", CreateTexture);
  NODE_SET_METHOD(target, "createVertexArray", CreateVertexArray);
  NODE_SET_METHOD(target, "disable", Disable);
  NODE_SET_METHOD(target, "drawArrays", DrawArrays);
  NODE_SET_METHOD(target, "drawElements", DrawElements);
  NODE_SET_METHOD(target, "enable", Enable);
  NODE_SET_METHOD(target, "enableVertexAttribArray", EnableVertexAttribArray);
  NODE_SET_METHOD(target, "getAttribLocation", GetAttribLocation);
  NODE_SET_METHOD(target, "getError", GetError);
  NODE_SET_METHOD(target, "getParameter", GetParameter);
  NODE_SET_METHOD(target, "getProgramInfoLog", GetProgramInfoLog);
  NODE_SET_METHOD(target, "getProgramParameter", GetProgramParameter);
  NODE_SET_METHOD(target, "getShaderInfoLog", GetShaderInfoLog);
  NODE_SET_METHOD(target, "getShaderParameter", GetShaderParameter);
  NODE_SET_METHOD(target, "getUniformLocation", GetUniformLocation);
  NODE_SET_METHOD(target, "init", Init);
  NODE_SET_METHOD(target, "linkProgram", LinkProgram);
  NODE_SET_METHOD(target, "pixelStorei", PixelStorei);
  NODE_SET_METHOD(target, "shaderSource", ShaderSource);
  NODE_SET_METHOD(target, "texImage2D", TexImage2D);
  NODE_SET_METHOD(target, "texSubImage2D", TexSubImage2D);
  NODE_SET_METHOD(target, "texParameteri", TexParameteri);
  NODE_SET_METHOD(target, "uniform1f", Uniform1f);
  NODE_SET_METHOD(target, "uniform1i", Uniform1i);
  NODE_SET_METHOD(target, "uniform3f", Uniform3f);
  NODE_SET_METHOD(target, "uniformMatrix4fv", UniformMatrix4fv);
  NODE_SET_METHOD(target, "useProgram", UseProgram);
  NODE_SET_METHOD(target, "vertexAttribPointer", VertexAttribPointer);
  NODE_SET_METHOD(target, "viewport", ViewPort);
}

}  // namespace gl
}  // namespace gameplay

NODE_MODULE(gl, gameplay::gl::Initialize)