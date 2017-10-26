#include "node.h"
#include "v8.h"
#include "stb_vorbis.c"

namespace gameplay {
namespace vorbis {

using v8::Context;
using v8::FunctionCallbackInfo;
using v8::Local;
using v8::Number;
using v8::Object;
using v8::Value;
using v8::Isolate;
using v8::String;
using v8::Exception;
using v8::Int16Array;
using v8::ArrayBuffer;

static void DecodeFilename(const FunctionCallbackInfo<Value>& args) {
  Isolate* isolate = args.GetIsolate();
  
  if (!args[0]->IsString()) {
    isolate->ThrowException(Exception::TypeError(
        String::NewFromUtf8(isolate, "Wrong arguments")));
    return;
  }
  String::Utf8Value filename(args[0]);

  int channels, rate;
  short* output;
  int samples = stb_vorbis_decode_filename(
    *filename, &channels, &rate, &output);

  if (samples < 0) {
    isolate->ThrowException(Exception::TypeError(
      String::NewFromUtf8(isolate, "Failed to decode")));
  }
  int bytes = samples * channels * sizeof(short);
  Local<Int16Array> data = 
      Int16Array::New(ArrayBuffer::New(isolate, bytes), 0, samples);

  for (int i=0; i<samples; i++) {
    data->Set(i, Number::New(isolate, output[i]));
  }
  Local<Object> result = Object::New(isolate);
  result->Set(String::NewFromUtf8(isolate, "channels"), 
    Number::New(isolate, channels));
  result->Set(String::NewFromUtf8(isolate, "rate"), 
    Number::New(isolate, rate));
  result->Set(String::NewFromUtf8(isolate, "data"), data);
  
  args.GetReturnValue().Set(result);
}

void Initialize(
    Local<Object> target, Local<Value> unused, Local<Context> context) {
  NODE_SET_METHOD(target, "decodeFilename", DecodeFilename);
}

}  // namespace vorbis
}  // namespace gameplay

NODE_MODULE(vorbis, gameplay::vorbis::Initialize)