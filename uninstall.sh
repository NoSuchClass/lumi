#!/usr/bin/env bash
# Remove all lumi-* skills / 移除所有 lumi-*
set -e
TARGET_DIR="${CURSOR_SKILLS_DIR:-$HOME/.cursor/skills}"
echo "→ removing lumi-* from $TARGET_DIR / 从该目录移除 lumi-*"
removed=0
for d in "$TARGET_DIR"/lumi-*; do
  [ -e "$d" ] || continue
  rm -rf "$d"
  echo "  ✗ $(basename "$d")"
  removed=$((removed+1))
done
echo "removed $removed skill(s) / 已移除 $removed 个 skill。"
