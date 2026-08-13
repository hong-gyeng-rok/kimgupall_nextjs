# Android 전시 앱 운영 가이드

## 구현 구조

- APK에는 `CAPACITOR_BUILD=1`로 생성한 Next.js 정적 출력물을 포함한다.
- 웹 서비스의 `/api/images`는 그대로 유지하며 앱의 수동 동기화에만 사용한다.
- 최초 실행 시 JSON과 전시 이미지를 앱 내부 `Directory.Data`에 저장한다.
- 이미지는 전시 기기 표시용 1536px, quality 75 버전을 캐시한다. 원본 초대형 이미지를 그대로 저장하지 않는다.
- 영상은 온라인 재생하며 연결 실패 시 캐시된 poster 또는 안내 문구를 표시한다.
- 캐시는 `staging` 다운로드가 모두 끝난 뒤 `current`와 교체한다. 실패하면 기존 캐시를 유지한다.

운영 API를 바꾸려면 모바일 빌드 전에 다음 공개 환경변수를 지정한다.

```bash
NEXT_PUBLIC_EXHIBITION_API_URL=https://example.com/api/images npm run android:apk
```

## 개발 환경

현재 Mac 기준 설치 경로:

```txt
JDK 21: /opt/homebrew/opt/openjdk@21
Android SDK: /opt/homebrew/share/android-commandlinetools
```

다른 환경에서는 `JAVA_HOME`, `ANDROID_HOME`을 지정한다. Android SDK에는 platform 36, build-tools 35 이상, platform-tools가 필요하다.

## APK 빌드

설치 가능한 디버그 서명 APK:

```bash
npm run android:apk
```

결과:

```txt
android/app/build/outputs/apk/debug/app-debug.apk
```

운영 릴리스 서명은 비밀 값을 저장소에 넣지 않고 환경변수로 전달한다.

```bash
KIMGUPALL_KEYSTORE_PATH=/absolute/path/exhibition.jks \
KIMGUPALL_KEYSTORE_PASSWORD='...' \
KIMGUPALL_KEY_ALIAS='...' \
KIMGUPALL_KEY_PASSWORD='...' \
npm run android:apk:release
```

결과:

```txt
android/app/build/outputs/apk/release/app-release.apk
```

## 실기기 검수

1. 기존 앱을 삭제하고 APK를 새로 설치한다.
2. Wi-Fi 상태에서 이미지 전체 다운로드와 진행률을 확인한다.
3. 다운로드 중 네트워크를 끊고 재시도 화면 및 불완전 캐시 미노출을 확인한다.
4. 다운로드 완료 후 비행기 모드에서 강제 종료와 재실행을 수행한다.
5. 이미지·텍스트 표시, 영상 대체 화면, modal과 Gallery의 Android 뒤로가기를 확인한다.
6. Home에서 뒤로가기로 앱이 종료되지 않는지 확인한다.
7. 좌상단 숨김 영역을 2초 안에 5회 눌러 관리자 화면에 진입한다.
8. 네트워크 복구 후 `전시 데이터 다시 다운로드`를 확인한다.
9. 120초 동안 입력하지 않아 Home 최상단으로 초기화되는지 확인한다.
10. 충전 상태로 최소 4시간 실행하며 발열, 메모리, 화면 꺼짐 여부를 확인한다.

앱 자체는 system bar를 숨기고 Home의 뒤로가기를 무시하지만 완전한 기기 잠금은 아니다. 전시 운영 시 Android 화면 고정 또는 MDM 키오스크 설정을 함께 적용한다.
