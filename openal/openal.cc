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

void Initialize(
    Local<Object> target, Local<Value> unused, Local<Context> context) {
  NODE_SET_METHOD(target, "closeDevice", CloseDevice);
  NODE_SET_METHOD(target, "createContext", CreateContext);
  NODE_SET_METHOD(target, "destroyContext", DestroyContext);
  NODE_SET_METHOD(target, "makeContextCurrent", MakeContextCurrent);
  NODE_SET_METHOD(target, "openDevice", OpenDevice);
}

}  // namespace openal
}  // namespace gameplay

NODE_MODULE(openal, gameplay::openal::Initialize)