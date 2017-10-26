#include "al/al.h"
#include "al/alc.h"
#include "node.h"
#include "v8.h"

namespace gameplay {
namespace openal {

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

static void BufferData(const FunctionCallbackInfo<Value>& args) {
  Isolate* isolate = args.GetIsolate();

  if (!args[0]->IsNumber() || !args[1]->IsNumber() ||
      !args[2]->IsArrayBufferView() || !args[3]->IsNumber()) {
    isolate->ThrowException(Exception::TypeError(
        String::NewFromUtf8(isolate, "Wrong arguments")));
    return;
  }
  ALuint buffer = static_cast<ALuint>(args[0]->IntegerValue());
  ALuint format = static_cast<ALuint>(args[1]->IntegerValue());
  Local<ArrayBufferView> data = Local<ArrayBufferView>::Cast(args[2]);
  ALuint rate = static_cast<ALuint>(args[3]->IntegerValue());

  alBufferData(buffer, format, data->Buffer()->GetContents().Data(), 
    static_cast<ALsizei>(data->ByteLength()), rate);
}

static void CloseDevice(const FunctionCallbackInfo<Value>& args) {
  Isolate* isolate = args.GetIsolate();

  if (!args[0]->IsNumber()) {
    isolate->ThrowException(Exception::TypeError(
        String::NewFromUtf8(isolate, "Wrong arguments")));
    return;
  }
  uint64_t handle = args[0]->IntegerValue();

  ALCdevice* device = reinterpret_cast<ALCdevice*>(handle);
  alcCloseDevice(device);
}

static void CreateBuffer(const FunctionCallbackInfo<Value>& args) {
  ALuint buffer;
  alGenBuffers((ALuint)1, &buffer);
  args.GetReturnValue().Set(buffer);
}

static void CreateContext(const FunctionCallbackInfo<Value>& args) {
  Isolate* isolate = args.GetIsolate();

  if (!args[0]->IsNumber()) {
    isolate->ThrowException(Exception::TypeError(
        String::NewFromUtf8(isolate, "Wrong arguments")));
    return;
  }
  uint64_t handle = args[0]->IntegerValue();

  ALCdevice* device = reinterpret_cast<ALCdevice*>(handle);
  args.GetReturnValue().Set(
    Number::New(isolate, (uint64_t)alcCreateContext(device, NULL)));
}

static void CreateSource(const FunctionCallbackInfo<Value>& args) {
  ALuint source;
  alGenSources((ALuint)1, &source);
  args.GetReturnValue().Set(source);
}

static void DestroyContext(const FunctionCallbackInfo<Value>& args) {
  Isolate* isolate = args.GetIsolate();

  if (!args[0]->IsNumber()) {
    isolate->ThrowException(Exception::TypeError(
        String::NewFromUtf8(isolate, "Wrong arguments")));
    return;
  }
  uint64_t handle = (uint64_t)args[0]->IntegerValue();

  ALCcontext* context = reinterpret_cast<ALCcontext*>(handle);
  alcDestroyContext(context);
}

static void GetError(const FunctionCallbackInfo<Value>& args) {
  args.GetReturnValue().Set(alGetError());
}

static void GetSourcef(const FunctionCallbackInfo<Value>& args) {
  Isolate* isolate = args.GetIsolate();

  if (!args[0]->IsNumber() || !args[1]->IsNumber()) {
    isolate->ThrowException(Exception::TypeError(
        String::NewFromUtf8(isolate, "Wrong arguments")));
    return;
  }
  ALuint source = static_cast<ALuint>(args[0]->IntegerValue());
  ALenum param = static_cast<ALenum>(args[1]->IntegerValue());

  ALfloat value;
  alGetSourcef(source, param, &value);

  args.GetReturnValue().Set(value);
}

static void GetSourcei(const FunctionCallbackInfo<Value>& args) {
  Isolate* isolate = args.GetIsolate();

  if (!args[0]->IsNumber() || !args[1]->IsNumber()) {
    isolate->ThrowException(Exception::TypeError(
        String::NewFromUtf8(isolate, "Wrong arguments")));
    return;
  }
  ALuint source = static_cast<ALuint>(args[0]->IntegerValue());
  ALenum param = static_cast<ALenum>(args[1]->IntegerValue());

  ALint value;
  alGetSourcei(source, param, &value);

  args.GetReturnValue().Set(value);
}

static void MakeContextCurrent(const FunctionCallbackInfo<Value>& args) {
  Isolate* isolate = args.GetIsolate();

  if (!args[0]->IsNumber() && !args[0]->IsNull()) {
    isolate->ThrowException(Exception::TypeError(
        String::NewFromUtf8(isolate, "Wrong arguments")));
    return;
  }

  if (args[0]->IsNumber()) {
    uint64_t handle = (uint64_t)args[0]->IntegerValue();
    ALCcontext* context = reinterpret_cast<ALCcontext*>(handle);
    if (!alcMakeContextCurrent(context)) {
      isolate->ThrowException(Exception::TypeError(
          String::NewFromUtf8(isolate, "Failed to initialize audio context")));
    }
  }
  else if (args[0]->IsNull()) {
    alcMakeContextCurrent(NULL);
  }
}

static void OpenDevice(const FunctionCallbackInfo<Value>& args) {
  Isolate* isolate = args.GetIsolate();

  ALCdevice *device = alcOpenDevice(NULL);
  if (!device) {
    isolate->ThrowException(Exception::TypeError(
        String::NewFromUtf8(isolate, "Failed to initialize audio device")));
  }

  args.GetReturnValue().Set(Number::New(isolate, (uint64_t)device));
}

static void Source3f(const FunctionCallbackInfo<Value>& args) {
  Isolate* isolate = args.GetIsolate();

  if (!args[0]->IsNumber() || !args[1]->IsNumber() ||
      !args[2]->IsNumber() || !args[3]->IsNumber() ||
      !args[4]->IsNumber()) {
    isolate->ThrowException(Exception::TypeError(
        String::NewFromUtf8(isolate, "Wrong arguments")));
    return;
  }
  ALuint source = static_cast<ALuint>(args[0]->IntegerValue());
  ALenum param = static_cast<ALenum>(args[1]->IntegerValue());
  ALfloat v0 = static_cast<ALfloat>(args[2]->NumberValue());
  ALfloat v1 = static_cast<ALfloat>(args[3]->NumberValue());
  ALfloat v2 = static_cast<ALfloat>(args[4]->NumberValue());

  alSource3f(source, param, v0, v1, v2);
}

static void Sourcef(const FunctionCallbackInfo<Value>& args) {
  Isolate* isolate = args.GetIsolate();

  if (!args[0]->IsNumber() || !args[1]->IsNumber() ||
      !args[2]->IsNumber()) {
    isolate->ThrowException(Exception::TypeError(
        String::NewFromUtf8(isolate, "Wrong arguments")));
    return;
  }
  ALuint source = static_cast<ALuint>(args[0]->IntegerValue());
  ALenum param = static_cast<ALenum>(args[1]->IntegerValue());
  ALfloat v0 = static_cast<ALfloat>(args[2]->NumberValue());

  alSourcef(source, param, v0);
}

static void Sourcei(const FunctionCallbackInfo<Value>& args) {
  Isolate* isolate = args.GetIsolate();

  if (!args[0]->IsNumber() || !args[1]->IsNumber() ||
      !args[2]->IsNumber()) {
    isolate->ThrowException(Exception::TypeError(
        String::NewFromUtf8(isolate, "Wrong arguments")));
    return;
  }
  ALuint source = static_cast<ALuint>(args[0]->IntegerValue());
  ALenum param = static_cast<ALenum>(args[1]->IntegerValue());
  ALuint buffer = static_cast<ALuint>(args[2]->IntegerValue());

  alSourcei(source, param, buffer);
}

static void SourcePause(const FunctionCallbackInfo<Value>& args) {
  Isolate* isolate = args.GetIsolate();

  if (!args[0]->IsNumber()) {
    isolate->ThrowException(Exception::TypeError(
        String::NewFromUtf8(isolate, "Wrong arguments")));
    return;
  }
  ALuint source = static_cast<ALuint>(args[0]->IntegerValue());

  alSourcePause(source);
}

static void SourcePlay(const FunctionCallbackInfo<Value>& args) {
  Isolate* isolate = args.GetIsolate();

  if (!args[0]->IsNumber()) {
    isolate->ThrowException(Exception::TypeError(
        String::NewFromUtf8(isolate, "Wrong arguments")));
    return;
  }
  ALuint source = static_cast<ALuint>(args[0]->IntegerValue());

  alSourcePlay(source);
}

static void SourceStop(const FunctionCallbackInfo<Value>& args) {
  Isolate* isolate = args.GetIsolate();

  if (!args[0]->IsNumber()) {
    isolate->ThrowException(Exception::TypeError(
        String::NewFromUtf8(isolate, "Wrong arguments")));
    return;
  }
  ALuint source = static_cast<ALuint>(args[0]->IntegerValue());

  alSourceStop(source);
}

void Initialize(
    Local<Object> target, Local<Value> unused, Local<Context> context) {
  NODE_SET_METHOD(target, "bufferData", BufferData);
  NODE_SET_METHOD(target, "closeDevice", CloseDevice);
  NODE_SET_METHOD(target, "createBuffer", CreateBuffer);
  NODE_SET_METHOD(target, "createContext", CreateContext);
  NODE_SET_METHOD(target, "createSource", CreateSource);
  NODE_SET_METHOD(target, "destroyContext", DestroyContext);
  NODE_SET_METHOD(target, "getError", GetError);
  NODE_SET_METHOD(target, "getSourcef", GetSourcef);
  NODE_SET_METHOD(target, "getSourcei", GetSourcei);
  NODE_SET_METHOD(target, "makeContextCurrent", MakeContextCurrent);
  NODE_SET_METHOD(target, "openDevice", OpenDevice);
  NODE_SET_METHOD(target, "source3f", Source3f);
  NODE_SET_METHOD(target, "sourcef", Sourcef);
  NODE_SET_METHOD(target, "sourcei", Sourcei);
  NODE_SET_METHOD(target, "sourcePause", SourcePause);
  NODE_SET_METHOD(target, "sourcePlay", SourcePlay);
  NODE_SET_METHOD(target, "sourceStop", SourceStop);
}

}  // namespace openal
}  // namespace gameplay

NODE_MODULE(openal, gameplay::openal::Initialize)