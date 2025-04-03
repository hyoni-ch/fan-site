#!/bin/bash
cd /joyuri

# 기존 서버 종료
pkill -f "next-server" || true

# 빌드 & 실행
npm run build
nohup npm start > app.log 2>&1 &