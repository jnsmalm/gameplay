#include "glfw/glfw3.h"
#include "node.h"
#include "v8.h"
#include  <string>

namespace gameplay {
namespace glfw {

using v8::Context;
using v8::FunctionCallbackInfo;
using v8::Local;
using v8::Number;
using v8::Object;
using v8::Value;
using v8::Isolate;
using v8::String;
using v8::Exception;

static void (CreateWindow)(const FunctionCallbackInfo<Value>& args) {
  Isolate* isolate = args.GetIsolate();

  if (args.Length() < 2) {
    isolate->ThrowException(Exception::TypeError(
        String::NewFromUtf8(isolate, "Wrong number of arguments")));
    return;
  }

  if (!args[0]->IsNumber()) {
    isolate->ThrowException(Exception::TypeError(
        String::NewFromUtf8(isolate, "Wrong arguments")));
    return;
  }
  int width = args[0]->IntegerValue();

  if (!args[1]->IsNumber()) {
    isolate->ThrowException(Exception::TypeError(
        String::NewFromUtf8(isolate, "Wrong arguments")));
    return;
  }
  int height = args[1]->IntegerValue();

  std::string title = "";
  if (args[2]->IsString()) {
    String::Utf8Value s(args[2]);
    title = std::string(*s);
  }

  GLFWmonitor* monitor = nullptr;
  if (args[3]->IsNumber()) {
    monitor = reinterpret_cast<GLFWmonitor*>(args[3]->IntegerValue());
  }

  GLFWwindow* share = nullptr;
  if (args[4]->IsNumber()) {
    share = reinterpret_cast<GLFWwindow*>(args[4]->IntegerValue());
  }

  GLFWwindow* window = glfwCreateWindow(
    width, height, title.c_str(), monitor, share);

  Local<Value> handle = Number::New(isolate, (uint64_t)window);
  args.GetReturnValue().Set(handle);
}

static void DestroyWindow(const FunctionCallbackInfo<Value>& args) {
  Isolate* isolate = args.GetIsolate();

  if (!args[0]->IsNumber()) {
    isolate->ThrowException(Exception::TypeError(
        String::NewFromUtf8(isolate, "Wrong arguments")));
    return;
  }
  uint64_t handle = args[0]->IntegerValue();
  GLFWwindow* window = reinterpret_cast<GLFWwindow*>(handle);
  glfwDestroyWindow(window);
}

static void GetCursorPos(const FunctionCallbackInfo<Value>& args) {
  Isolate* isolate = args.GetIsolate();

  if (!args[0]->IsNumber()) {
    isolate->ThrowException(Exception::TypeError(
        String::NewFromUtf8(isolate, "Wrong arguments")));
    return;
  }
  uint64_t handle = args[0]->IntegerValue();
  GLFWwindow* window = reinterpret_cast<GLFWwindow*>(handle);
  double x, y;
  glfwGetCursorPos(window, &x, &y);

  Local<Object> result = Object::New(isolate);
  result->Set(String::NewFromUtf8(isolate, "x"), Number::New(isolate, x));
  result->Set(String::NewFromUtf8(isolate, "y"), Number::New(isolate, y));

  args.GetReturnValue().Set(result);
}

static void GetFramebufferSize(const FunctionCallbackInfo<Value>& args) {
  Isolate* isolate = args.GetIsolate();
  
  if (!args[0]->IsNumber()) {
    isolate->ThrowException(Exception::TypeError(
        String::NewFromUtf8(isolate, "Wrong arguments")));
    return;
  }
  uint64_t handle = args[0]->IntegerValue();
  GLFWwindow* window = reinterpret_cast<GLFWwindow*>(handle);
  int width, height;
  glfwGetFramebufferSize(window, &width, &height);
  
  Local<Object> result = Object::New(isolate);
  result->Set(String::NewFromUtf8(isolate, "width"), 
    Number::New(isolate, width));
  result->Set(String::NewFromUtf8(isolate, "height"), 
    Number::New(isolate, height));

  args.GetReturnValue().Set(result);
}

static void GetKey(const FunctionCallbackInfo<Value>& args) {
  Isolate* isolate = args.GetIsolate();
  
  if (!args[0]->IsNumber() || !args[1]->IsNumber()) {
    isolate->ThrowException(Exception::TypeError(
        String::NewFromUtf8(isolate, "Wrong arguments")));
    return;
  }
  GLFWwindow* window = reinterpret_cast<GLFWwindow*>(args[0]->IntegerValue());
  auto key = args[1]->Uint32Value();

  args.GetReturnValue().Set(glfwGetKey(window, key));
}

static void GetMouseButton(const FunctionCallbackInfo<Value>& args) {
  Isolate* isolate = args.GetIsolate();
  
  if (!args[0]->IsNumber() || !args[1]->IsNumber()) {
    isolate->ThrowException(Exception::TypeError(
        String::NewFromUtf8(isolate, "Wrong arguments")));
    return;
  }
  GLFWwindow* window = reinterpret_cast<GLFWwindow*>(args[0]->IntegerValue());
  int button = args[1]->IntegerValue();

  args.GetReturnValue().Set(glfwGetMouseButton(window, button));
}

static void GetPrimaryMonitor(const FunctionCallbackInfo<Value>& args) {
  Isolate* isolate = args.GetIsolate();
  GLFWmonitor* primary = glfwGetPrimaryMonitor();
  Local<Value> handle = Number::New(isolate, (uint64_t)primary);
  args.GetReturnValue().Set(handle);
}

static void GetTime(const FunctionCallbackInfo<Value>& args) {
  args.GetReturnValue().Set(glfwGetTime());
}

static void GetVideoMode(const FunctionCallbackInfo<Value>& args) {
  Isolate* isolate = args.GetIsolate();
  
  if (!args[0]->IsNumber()) {
    isolate->ThrowException(Exception::TypeError(
        String::NewFromUtf8(isolate, "Wrong arguments")));
    return;
  }
  uint64_t handle = args[0]->IntegerValue();
  GLFWmonitor* monitor = reinterpret_cast<GLFWmonitor*>(handle);
  
  const GLFWvidmode* mode = glfwGetVideoMode(monitor);
  
  Local<Object> result = Object::New(isolate);
  result->Set(String::NewFromUtf8(isolate, "redBits"), 
    Number::New(isolate, mode->redBits));
  result->Set(String::NewFromUtf8(isolate, "greenBits"), 
    Number::New(isolate, mode->greenBits));
  result->Set(String::NewFromUtf8(isolate, "blueBits"), 
    Number::New(isolate, mode->blueBits));
  result->Set(String::NewFromUtf8(isolate, "refreshRate"), 
    Number::New(isolate, mode->refreshRate));
  result->Set(String::NewFromUtf8(isolate, "width"), 
    Number::New(isolate, mode->width));
  result->Set(String::NewFromUtf8(isolate, "height"), 
    Number::New(isolate, mode->height));

  args.GetReturnValue().Set(result);
}

static void Init(const FunctionCallbackInfo<Value>& args) {
  glfwInit();
}

static void MakeContextCurrent(const FunctionCallbackInfo<Value>& args) {
  Isolate* isolate = args.GetIsolate();
  
  if (!args[0]->IsNumber()) {
    isolate->ThrowException(Exception::TypeError(
        String::NewFromUtf8(isolate, "Wrong arguments")));
    return;
  }
  uint64_t handle = args[0]->IntegerValue();
  GLFWwindow* window = reinterpret_cast<GLFWwindow*>(handle);
  glfwMakeContextCurrent(window);
}

static void SetInputMode(const FunctionCallbackInfo<Value>& args) {
  Isolate* isolate = args.GetIsolate();
  
  if (!args[0]->IsNumber() || !args[1]->IsNumber() || !args[2]->IsNumber()) {
    isolate->ThrowException(Exception::TypeError(
        String::NewFromUtf8(isolate, "Wrong arguments")));
    return;
  }
  GLFWwindow* window = reinterpret_cast<GLFWwindow*>(args[0]->IntegerValue());
  int mode = args[1]->IntegerValue();
  int value = args[2]->IntegerValue();

  glfwSetInputMode(window, mode, value);
}

static void SetWindowShouldClose(const FunctionCallbackInfo<Value>& args) {
  Isolate* isolate = args.GetIsolate();

  if (!args[0]->IsNumber()) {
    isolate->ThrowException(Exception::TypeError(
        String::NewFromUtf8(isolate, "Wrong arguments")));
    return;
  }
  uint64_t handle = args[0]->IntegerValue();
  GLFWwindow* window = reinterpret_cast<GLFWwindow*>(handle);

  if (!args[1]->IsNumber()) {
    isolate->ThrowException(Exception::TypeError(
        String::NewFromUtf8(isolate, "Wrong arguments")));
    return;
  }
  int value = args[1]->IntegerValue();

  glfwSetWindowShouldClose(window, value);
}

static void SwapBuffers(const FunctionCallbackInfo<Value>& args) {
  Isolate* isolate = args.GetIsolate();
  
  if (!args[0]->IsNumber()) {
    isolate->ThrowException(Exception::TypeError(
        String::NewFromUtf8(isolate, "Wrong arguments")));
    return;
  }
  uint64_t handle = args[0]->IntegerValue();
  GLFWwindow* window = reinterpret_cast<GLFWwindow*>(handle);
  glfwSwapBuffers(window);
}

static void PollEvents(const FunctionCallbackInfo<Value>& args) {
  glfwPollEvents();
}

static void Terminate(const FunctionCallbackInfo<Value>& args) {
  glfwTerminate();
}

static void WindowHint(const FunctionCallbackInfo<Value>& args) {
  Isolate* isolate = args.GetIsolate();
  
  if (!args[0]->IsNumber() || !args[1]->IsNumber()) {
    isolate->ThrowException(Exception::TypeError(
        String::NewFromUtf8(isolate, "Wrong arguments")));
    return;
  }
  glfwWindowHint(args[0]->IntegerValue(), args[1]->IntegerValue());
}

static void WindowShouldClose(const FunctionCallbackInfo<Value>& args) {
  Isolate* isolate = args.GetIsolate();
  
  if (!args[0]->IsNumber()) {
    isolate->ThrowException(Exception::TypeError(
        String::NewFromUtf8(isolate, "Wrong arguments")));
    return;
  }
  uint64_t handle = args[0]->IntegerValue();
  GLFWwindow* window = reinterpret_cast<GLFWwindow*>(handle);
  args.GetReturnValue().Set(glfwWindowShouldClose(window));
}

void Initialize(
    Local<Object> target, Local<Value> unused, Local<Context> context) {
  NODE_SET_METHOD(target, "createWindow", CreateWindow);
  NODE_SET_METHOD(target, "destroyWindow", DestroyWindow);
  NODE_SET_METHOD(target, "getCursorPos", GetCursorPos);
  NODE_SET_METHOD(target, "getFramebufferSize", GetFramebufferSize);
  NODE_SET_METHOD(target, "getKey", GetKey);
  NODE_SET_METHOD(target, "getMouseButton", GetMouseButton);
  NODE_SET_METHOD(target, "getPrimaryMonitor", GetPrimaryMonitor);
  NODE_SET_METHOD(target, "getTime", GetTime);
  NODE_SET_METHOD(target, "getVideoMode", GetVideoMode);
  NODE_SET_METHOD(target, "init", Init);
  NODE_SET_METHOD(target, "makeContextCurrent", MakeContextCurrent);
  NODE_SET_METHOD(target, "pollEvents", PollEvents);
  NODE_SET_METHOD(target, "setInputMode", SetInputMode);
  NODE_SET_METHOD(target, "setWindowShouldClose", SetWindowShouldClose);
  NODE_SET_METHOD(target, "swapBuffers", SwapBuffers);
  NODE_SET_METHOD(target, "terminate", Terminate);
  NODE_SET_METHOD(target, "windowHint", WindowHint);
  NODE_SET_METHOD(target, "windowShouldClose", WindowShouldClose);
}

}  // namespace glfw
}  // namespace gameplay

NODE_MODULE(glfw, gameplay::glfw::Initialize)