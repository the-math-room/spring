find . -maxdepth 3 \
  -not -path '*/.*' \
  -not -path './node_modules*' \
  -type f \( -name "*.html" -o -name "*.js" -o -name "*.css" -o -name "*.sql" \) \
  -exec sh -c 'echo "\n--- FILE: $1 ---"; cat "$1"' _ {} \;