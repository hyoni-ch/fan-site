# === 빌더 스테이지 (Builder Stage) ===
FROM node:22 AS builder
# 작업 디렉토리를 /app으로 설정
WORKDIR /app
COPY package*.json ./
# 모든 의존성 설치 (빌드에 필요한 devDependencies 포함)
RUN npm install
# 프로젝트의 나머지 소스 코드를 복사
COPY . .
# Next.js 애플리케이션 빌드
RUN npm run build
# === 러너 스테이지 (Runner Stage) ===
FROM node:22-slim

# 작업 디렉토리를 /app으로 설정
WORKDIR /app

# 빌더 스테이지에서 package*.json 파일들을 복사
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/next.config.ts ./
# 프로덕션 의존성만 설치! (devDepenencies 제외)
RUN npm install --production

# 빌더 스테이지에서 빌드된 .next 폴더를 복사
COPY --from=builder /app/.next ./.next

# 빌더 스테이지에서 public 폴더를 복사
COPY --from=builder /app/public ./public

# 필요하다면 next.config.js 파일도 복사 (런타임에 필요한 경우)
# COPY --from=builder /app/next.config.js ./next.config.js

# 환경 변수를 production으로 설정
ENV NODE_ENV=production

# Next.js 기본 포트인 3000번을 외부에 노출
EXPOSE 3000

# 컨테이너가 시작될 때 실행될 명령어 (Next.js 프로덕션 서버 시작)
CMD ["npm", "run", "start"]
