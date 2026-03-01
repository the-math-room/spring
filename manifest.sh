#!/bin/bash
echo "=== PROJECT MANIFEST GENERATED ON $(date) ==="
# This finds web files, ignores hidden folders/files, and limits depth
find . -maxdepth 3 \
  -not -path '*/.*' \
  -type f \( -name "*.html" -o -name "*.js" -o -name "*.css" -o -name "*.sql" \) \
  -exec sh -c 'echo "\n--- FILE: $1 ---"; cat "$1"' _ {} \;