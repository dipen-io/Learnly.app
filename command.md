# 1. Delete broken C++ cache and build artifacts
rm -rf android/app/.cxx android/app/build android/.gradle

# 2. Re-trigger React Native codegen generation
npx react-native codegen

# 3. run
cd android && ./gradlew assembleRelease
