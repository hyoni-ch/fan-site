#!/bin/bash
cd /joyuri

# 기존 node_modules 삭제 후 새 의존성 설치
rm -rf node_modules package-lock.json
npm install
