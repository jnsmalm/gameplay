cmake_minimum_required(VERSION 2.8)

# Name of the project (will be the name of the plugin)
project(gameplay-openal)

add_subdirectory(openal-soft-1.18.1)

if (${CMAKE_SYSTEM_NAME} MATCHES "Darwin")
  # Set rpath to look for the shared library in the same dir as the loader
  set(CMAKE_SKIP_RPATH TRUE)
  set(CMAKE_CXX_FLAGS "${CMAKE_CXX_FLAGS} -Wl,-rpath,@loader_path")
endif()

# Build a shared library named after the project from the files in `src/`
file(GLOB SOURCE_FILES "*.cc" "*.h")
add_library(${PROJECT_NAME} SHARED ${SOURCE_FILES})

# Gives our library file a .node extension without any "lib" prefix
set_target_properties(${PROJECT_NAME} PROPERTIES PREFIX "" SUFFIX ".node")

# Essential include files to build a node addon,
# You should add this line in every CMake.js based project
target_include_directories(${PROJECT_NAME} PRIVATE ${CMAKE_JS_INC} openal-soft-1.18.1/include)

# Essential library files to link to a node addon
# You should add this line in every CMake.js based project
target_link_libraries(${PROJECT_NAME} ${CMAKE_JS_LIB} OpenAL)
