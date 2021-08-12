# 1. Delete broken C++ cache and build artifacts
rm -rf android/app/.cxx android/app/build android/.gradle

# 2. Re-trigger React Native codegen generation
npx react-native codegen

# 3. run
cd android && ./gradlew assembleRelease
    (android/app/build/outputs/apk/release/app-release.apk)

# 4. If Android build is genuinely corrupted
rm -rf android/app/.cxx 
rm -rf android/app/build 
rm -rf android/build 
rm -rf android/.gradle 
rm -rf node_modules 
npm ci
