#include "node.h"
#include "node_object_wrap.h"
#include "v8.h"
#define STB_TRUETYPE_IMPLEMENTATION
#include "stb_truetype.h"

namespace gameplay {
namespace truetype {

using v8::Context;
using v8::FunctionCallbackInfo;
using v8::FunctionTemplate;
using v8::Function;
using v8::Local;
using v8::Number;
using v8::Object;
using v8::Value;
using v8::Isolate;
using v8::String;
using v8::Exception;
using v8::ArrayBufferView;
using v8::ArrayBuffer;
using v8::Uint8Array;
using node::ObjectWrap;

class FontInfo : public ObjectWrap {
 public:
  FontInfo(Isolate* isolate) {
    Local<Context> context = isolate->GetCurrentContext();
    Local<FunctionTemplate> tpl = FunctionTemplate::New(isolate);
    tpl->SetClassName(String::NewFromUtf8(isolate, "FontInfo"));
    tpl->InstanceTemplate()->SetInternalFieldCount(1);
    this->Wrap(tpl->GetFunction()->
        NewInstance(context, 0, nullptr).ToLocalChecked());
  }

  stbtt_fontinfo* fontinfo() {
    return &fontinfo_;
  }

 private:
  stbtt_fontinfo fontinfo_;
};

static void FindGlyphIndex(const FunctionCallbackInfo<Value>& args) {
  Isolate* isolate = args.GetIsolate();
  
  if (!args[0]->IsObject() || !args[1]->IsNumber()) {
    isolate->ThrowException(Exception::TypeError(
        String::NewFromUtf8(isolate, "Wrong arguments")));
    return;
  }
  FontInfo* fontInfo = ObjectWrap::Unwrap<FontInfo>(args[0]->ToObject());
  int codepoint = static_cast<int>(args[1]->IntegerValue());

  args.GetReturnValue().Set(stbtt_FindGlyphIndex(
    fontInfo->fontinfo(), codepoint));
}

static void GetGlyphBitmap(const FunctionCallbackInfo<Value>& args) {
  Isolate* isolate = args.GetIsolate();
  
  if (!args[0]->IsObject() || !args[1]->IsNumber() || !args[2]->IsNumber() ||
      !args[3]->IsNumber()) {
    isolate->ThrowException(Exception::TypeError(
        String::NewFromUtf8(isolate, "Wrong arguments")));
    return;
  }
  FontInfo* fontInfo = ObjectWrap::Unwrap<FontInfo>(args[0]->ToObject());
  float scale_x = static_cast<float>(args[1]->NumberValue());
  float scale_y = static_cast<float>(args[2]->NumberValue());
  int glyph = static_cast<int>(args[3]->IntegerValue());

  int width, height, xoff, yoff;
  unsigned char *bitmap = stbtt_GetGlyphBitmap(fontInfo->fontinfo(), 
      scale_x, scale_y, glyph, &width, &height, &xoff, &yoff);

  if (bitmap == nullptr) {
    isolate->ThrowException(Exception::TypeError(
        String::NewFromUtf8(isolate, "Failed to get glyph bitmap")));
  }

  int size = width * height;
  Local<Uint8Array> data = 
      Uint8Array::New(ArrayBuffer::New(isolate, size), 0, size);
  for (int i=0; i<size; i++) {
    data->Set(i, Number::New(isolate, bitmap[i]));
  }

  Local<Object> result = Object::New(isolate);
  result->Set(String::NewFromUtf8(isolate, "data"), data);
  result->Set(
    String::NewFromUtf8(isolate, "width"), Number::New(isolate, width));
  result->Set(
    String::NewFromUtf8(isolate, "height"), Number::New(isolate, height));
  result->Set(
    String::NewFromUtf8(isolate, "xoff"), Number::New(isolate, xoff));
  result->Set(
    String::NewFromUtf8(isolate, "yoff"), Number::New(isolate, yoff));
  
  args.GetReturnValue().Set(result);
}

static void GetGlyphHMetrics(const FunctionCallbackInfo<Value>& args) {
  Isolate* isolate = args.GetIsolate();
  
  if (!args[0]->IsObject() || !args[1]->IsNumber()) {
    isolate->ThrowException(Exception::TypeError(
        String::NewFromUtf8(isolate, "Wrong arguments")));
    return;
  }
  FontInfo* fontInfo = ObjectWrap::Unwrap<FontInfo>(args[0]->ToObject());
  int glyph = static_cast<int>(args[1]->IntegerValue());

  int advanceWidth, leftSideBearing;
  stbtt_GetGlyphHMetrics(
      fontInfo->fontinfo(), glyph, &advanceWidth, &leftSideBearing);

  Local<Object> result = Object::New(isolate);
  result->Set(String::NewFromUtf8(isolate, "advanceWidth"), 
      Number::New(isolate, advanceWidth));
  result->Set(String::NewFromUtf8(isolate, "leftSideBearing"), 
      Number::New(isolate, leftSideBearing));
  
  args.GetReturnValue().Set(result);
}

static void GetGlyphKernAdvance(const FunctionCallbackInfo<Value>& args) {
  Isolate* isolate = args.GetIsolate();
  
  if (!args[0]->IsObject() || !args[1]->IsNumber() || !args[2]->IsNumber()) {
    isolate->ThrowException(Exception::TypeError(
        String::NewFromUtf8(isolate, "Wrong arguments")));
    return;
  }
  FontInfo* fontInfo = ObjectWrap::Unwrap<FontInfo>(args[0]->ToObject());
  int glyph1 = static_cast<int>(args[1]->IntegerValue());
  int glyph2 = static_cast<int>(args[2]->IntegerValue());

  args.GetReturnValue().Set(
      stbtt_GetGlyphKernAdvance(fontInfo->fontinfo(), glyph1, glyph2));
}

static void GetFontVMetrics(const FunctionCallbackInfo<Value>& args) {
  Isolate* isolate = args.GetIsolate();
  
  if (!args[0]->IsObject()) {
    isolate->ThrowException(Exception::TypeError(
        String::NewFromUtf8(isolate, "Wrong arguments")));
    return;
  }
  FontInfo* fontInfo = ObjectWrap::Unwrap<FontInfo>(args[0]->ToObject());

  int ascent, descent, lineGap;
  stbtt_GetFontVMetrics(fontInfo->fontinfo(), &ascent, &descent, &lineGap);

  Local<Object> result = Object::New(isolate);
  result->Set(String::NewFromUtf8(isolate, "ascent"), 
      Number::New(isolate, ascent));
  result->Set(String::NewFromUtf8(isolate, "descent"), 
      Number::New(isolate, descent));
  result->Set(String::NewFromUtf8(isolate, "lineGap"), 
      Number::New(isolate, lineGap));
  
  args.GetReturnValue().Set(result);
}

static void InitFont(const FunctionCallbackInfo<Value>& args) {
  Isolate* isolate = args.GetIsolate();
  
  if (!args[0]->IsArrayBufferView()) {
    isolate->ThrowException(Exception::TypeError(
        String::NewFromUtf8(isolate, "Wrong arguments")));
    return;
  }
  unsigned char* buffer = static_cast<unsigned char*>(
      Local<ArrayBufferView>::Cast(args[0])->Buffer()->GetContents().Data());

  FontInfo *fontInfo = new FontInfo(isolate);
  if (stbtt_InitFont(fontInfo->fontinfo(), buffer, 0) == 0) {
    isolate->ThrowException(Exception::TypeError(
        String::NewFromUtf8(isolate, "Failed to init font")));
    return;
  }
  args.GetReturnValue().Set(fontInfo->handle());
}

static void ScaleForPixelHeight(const FunctionCallbackInfo<Value>& args) {
  Isolate* isolate = args.GetIsolate();
  
  if (!args[0]->IsObject() || !args[1]->IsNumber()) {
    isolate->ThrowException(Exception::TypeError(
        String::NewFromUtf8(isolate, "Wrong arguments")));
    return;
  }
  FontInfo* fontInfo = ObjectWrap::Unwrap<FontInfo>(args[0]->ToObject());
  float pixels = static_cast<float>(args[1]->NumberValue());

  args.GetReturnValue().Set(
    stbtt_ScaleForPixelHeight(fontInfo->fontinfo(), pixels));
}

void Initialize(
    Local<Object> target, Local<Value> unused, Local<Context> context) {
  NODE_SET_METHOD(target, "findGlyphIndex", FindGlyphIndex);
  NODE_SET_METHOD(target, "getGlyphBitmap", GetGlyphBitmap);
  NODE_SET_METHOD(target, "getGlyphHMetrics", GetGlyphHMetrics);
  NODE_SET_METHOD(target, "getGlyphKernAdvance", GetGlyphKernAdvance);
  NODE_SET_METHOD(target, "getFontVMetrics", GetFontVMetrics);
  NODE_SET_METHOD(target, "initFont", InitFont);
  NODE_SET_METHOD(target, "scaleForPixelHeight", ScaleForPixelHeight);
}

}  // namespace truetype
}  // namespace gameplay

NODE_MODULE(truetype, gameplay::truetype::Initialize)