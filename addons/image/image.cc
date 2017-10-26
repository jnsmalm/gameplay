#include "node.h"
#include "v8.h"
#define STB_IMAGE_IMPLEMENTATION
#include "stb_image.h"

namespace gameplay {
namespace image {

using v8::Context;
using v8::FunctionCallbackInfo;
using v8::Local;
using v8::Number;
using v8::Object;
using v8::Value;
using v8::Isolate;
using v8::String;
using v8::Exception;
using v8::Uint8Array;
using v8::ArrayBuffer;

static void Load(const FunctionCallbackInfo<Value>& args) {
  Isolate* isolate = args.GetIsolate();
  
  if (!args[0]->IsString()) {
    isolate->ThrowException(Exception::TypeError(
        String::NewFromUtf8(isolate, "Wrong arguments")));
    return;
  }
  String::Utf8Value filename(args[0]);

  int width, height, channels;
  unsigned char *image = stbi_load(*filename, &width, &height, &channels, 0);
  if (image == nullptr) {
    return;
  }

  int size = width * height * channels;
  Local<Uint8Array> data = 
      Uint8Array::New(ArrayBuffer::New(isolate, size), 0, size);
  for (int i=0; i<size; i++) {
    data->Set(i, Number::New(isolate, image[i]));
  }
  stbi_image_free(image);

  Local<Object> result = Object::New(isolate);
  result->Set(String::NewFromUtf8(isolate, "channels"), 
    Number::New(isolate, channels));
  result->Set(String::NewFromUtf8(isolate, "data"), data);
  result->Set(String::NewFromUtf8(isolate, "width"), 
    Number::New(isolate, width));
  result->Set(String::NewFromUtf8(isolate, "height"), 
    Number::New(isolate, height));
  
  args.GetReturnValue().Set(result);
}

void Initialize(Local<Object> target,
                Local<Value> unused,
                Local<Context> context) {
  NODE_SET_METHOD(target, "load", Load);
}

}  // namespace image
}  // namespace gameplay

NODE_MODULE(image, gameplay::image::Initialize)