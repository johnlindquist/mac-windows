#!/bin/bash
set -e

# Define the macOS SDK version to target
MIN_SDK="10.15"

# Clean any existing build artifacts
rm -rf swift/ActivateWindow/.build swift/MacWindows/.build

# Ensure scripts directory exists
mkdir -p scripts

echo "Building ActivateWindow for arm64..."
swift build -c release --package-path swift/ActivateWindow --triple arm64-apple-macosx${MIN_SDK}

echo "Building ActivateWindow for x86_64..."
swift build -c release --package-path swift/ActivateWindow --triple x86_64-apple-macosx${MIN_SDK}

echo "Merging ActivateWindow binaries into a universal binary..."
lipo -create \
    swift/ActivateWindow/.build/arm64-apple-macosx/release/activate-window \
    swift/ActivateWindow/.build/x86_64-apple-macosx/release/activate-window \
    -output scripts/ActivateWindow
echo "ActivateWindow universal binary created at scripts/ActivateWindow"

echo "Building MacWindows for arm64..."
swift build -c release --package-path swift/MacWindows --triple arm64-apple-macosx${MIN_SDK}

echo "Building MacWindows for x86_64..."
swift build -c release --package-path swift/MacWindows --triple x86_64-apple-macosx${MIN_SDK}

echo "Merging MacWindows binaries into a universal binary..."
lipo -create \
    swift/MacWindows/.build/arm64-apple-macosx/release/mac-windows \
    swift/MacWindows/.build/x86_64-apple-macosx/release/mac-windows \
    -output scripts/MacWindows
echo "MacWindows universal binary created at scripts/MacWindows"

echo "Universal build complete." 