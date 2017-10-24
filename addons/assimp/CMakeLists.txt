cmake_minimum_required(VERSION 2.8)

# Name of the project (will be the name of the plugin)
project(gameplay-assimp)

configure_file (
  "${PROJECT_SOURCE_DIR}/assimp-4.0.1/include/assimp/config.h.in"
  "${PROJECT_SOURCE_DIR}/assimp-4.0.1/include/assimp/config.h"
)
option(BUILD_SHARED_LIBS "" OFF)
option(ASSIMP_BUILD_ALL_IMPORTERS_BY_DEFAULT "" OFF)
option(ASSIMP_BUILD_3DS_IMPORTER "" ON)
option(ASSIMP_BUILD_OBJ_IMPORTER "" ON)
option(ASSIMP_NO_EXPORT "" ON)
option(ASSIMP_BUILD_ASSIMP_TOOLS "" OFF)
option(ASSIMP_BUILD_TESTS "" OFF)

add_subdirectory(assimp-4.0.1)

# Build a shared library named after the project from the files in `src/`
file(GLOB SOURCE_FILES "*.cc" "*.h")
add_library(${PROJECT_NAME} SHARED ${SOURCE_FILES})

# Gives our library file a .node extension without any "lib" prefix
set_target_properties(${PROJECT_NAME} PROPERTIES PREFIX "" SUFFIX ".node")

# Essential include files to build a node addon,
# You should add this line in every CMake.js based project
target_include_directories(${PROJECT_NAME} PRIVATE ${CMAKE_JS_INC} assimp-4.0.1/include)

# Essential library files to link to a node addon
# You should add this line in every CMake.js based project
target_link_libraries(${PROJECT_NAME} ${CMAKE_JS_LIB} assimp)
