# Porting Manual

>## 목차
>- [자동 배포 흐름](#자동-배포-흐름)
>- [방화벽 설정(ufw)](#방화벽-설정ufw)
>- [포트 할당](#포트-할당)
>- [TLS(SSL) 인증서 발급](#tlsssl-인증서-발급)
>- [Jenkins 설치 방법](#jenkins-설치-방법)
>- [도커 설치 방법](#도커-설치-방법)
>- [EC2 의 Nginx 설정](#ec2-의-nginx-설정)
>- [React App 자동 배포 설정](#react-app-자동-배포-설정)
>- [Spring Boot 자동 배포 설정](#spring-boot-자동-배포-설정)
>- [에러 로그 확인법](#)

<br>

---

>## 자동 배포 흐름
>1. 개발 내용 GitLab 으로 Push
>2. 배포 브랜치에 Push 가 이루어질 경우 Jenkins의 WebHook 으로 트리거
>3. Jenkins 에서 WebHook 으로 연결된 Jenkins Pipeline 실행
>>1. Push 가 이루어진 배포 브랜치의 내용을 Jenkins 가 Pull
>>2. Pull 한 브랜치의 내용을 빌드
>>3. 빌드된 내용을 DockerFile 을 이용하여 로컬에 도커 이미지 생성
>>4. 같은 이름으로 실행 중인 도커 컨테이너 종료 및 삭제 후 로컬에 생성된 도커 이미지를 컨테이너화
>>5. 이미지 생성 시 함께 생성되는 댕글링 이미지 삭제 후 마무리
>4. Jenkins Pipeline 의 시작, 종료, 각 단계별 실패 시 MM 으로 알림 전송
>- 전체적인 자동 배포를 구현할 때 [참고하면 좋은 블로그](https://crispyblog.kr/development/common/8) 를 따라하면서 구현하는것을 추천함

<br>

[목차로 이동](#목차)

>## 방화벽 설정(ufw)
>- **주의할 점** 으로 허용 포트에 22(SSH)를 설정하지 않으면 SSAFY EC2 서버로 접속이 불가능해짐!!!
>- [잘 설명된 블로그](https://webdir.tistory.com/206) 를 참고하여 설정하는 것을 추천함

<br>

[목차로 이동](#목차)

>## 포트 할당
>- React App, REST API, MySQL 은 Docker Container 환경으로 격리함
>
>포트번호|이름
>:--|:--
>80|HTTP (HTTPS 로 리다이렉트)
>443|HTTPS
>3000|React, Nginx Docker Container
>3306|MySQL Docker Container
>9000|REST Api Docker Container
>9999|Jenkins

<br>

[목차로 이동](#목차)

>## TLS(SSL) 인증서 발급
>- [cert bot 공식 홈페이지](https://certbot.eff.org/instructions?ws=nginx&os=ubuntufocal) 의 내용을 참고하여 설치 및 발급받는 것을 가장 빠르고 쉽고 정확한 방법으로 추천함

<br>

[목차로 이동](#목차)

>## Jenkins 설치 및 세팅 방법
>- [잘 설명된 블로그](https://gksdudrb922.tistory.com/195) 를 참고하여 설치하는 것을 추천함

<br>

[목차로 이동](#목차)

>## 도커 설치 방법
>- [잘 설명된 블로그](https://shanepark.tistory.com/237) 를 참고하여 설치하는 것을 추천함

<br>

[목차로 이동](#목차)

>## EC2 의 Nginx 설정
>- /etc/nginx/sites-available/default
>>```conf
>>server {
>>  server_name j7b105.p.ssafy.io; # managed by Certbot
>>
>>  location /api {
>>    return 301 https://j7b105.p.ssafy.io:9000;
>>  }
>>
>>  location /h2 {
>>    return 301 https://j7b105.p.ssafy.io:9000/h2-console;
>>  }
>>
>>  location /swagger {
>>    return 301 https://j7b105.p.ssafy.io:9000/swagger-ui.html;
>>  }
>>
>>  location /jenkins {
>>    return 301 http://j7b105.p.ssafy.io:9999;
>>  }
>>
>>  location / {
>>    proxy_pass https://localhost:3000;
>>  }
>>
>>  listen [::]:443 ssl ipv6only=on; # managed by Certbot
>>  listen 443 ssl; # managed by Certbot
>>  ssl_certificate /etc/letsencrypt/live/j7b105.p.ssafy.io/fullchain.pem; # managed by Certbot
>>  ssl_certificate_key /etc/letsencrypt/live/j7b105.p.ssafy.io/privkey.pem; # managed by Certbot
>>  include /etc/letsencrypt/options-ssl-nginx.conf; # managed by Certbot
>>  ssl_dhparam /etc/letsencrypt/ssl-dhparams.pem; # managed by Certbot
>>}
>>
>>server {
>>  location /jenkins {
>>    proxy_pass http://localhost:9999;
>>  }
>>
>>  if ($host = j7b105.p.ssafy.io) {
>>    return 301 https://$host:3000$request_uri;
>>  } # managed by Certbot
>>
>>
>>  listen 80 ;
>>  listen [::]:80 ;
>>  server_name j7b105.p.ssafy.io;
>>  return 404; # managed by Certbot
>>}
>>```

<br>

[목차로 이동](#목차)

>## React App 자동 배포 설정
>1. DockerFile
>```dockerfile
>## Dockerfile(client)
>
>FROM nginx
>WORKDIR /home/ubuntu/S07P22B105/frontend
>RUN mkdir ./build
>ADD ./build ./build
>RUN rm /etc/nginx/conf.d/default.conf
>COPY ./nginx.conf /etc/nginx/conf.d
>EXPOSE 443
>CMD ["nginx", "-g", "daemon off;"]
>```
>2. Nginx.conf
>```conf
>server {
>    listen 443 ssl;
>    server_name j7b105.p.ssafy.io;
>
>    ssl_certificate /etc/letsencrypt/archive/j7b105.p.ssafy.io/fullchain1.pem;
>    ssl_certificate_key /etc/letsencrypt/archive/j7b105.p.ssafy.io/privkey1.pem;
>
>    location / {
>        root /home/ubuntu/S07P22B105/frontend/build;
>        index index.html index.htm;
>        try_files $uri $uri/ /index.html;
>    }
>}
>```
>3. Jenkins Pipeline
>```pipeline
>pipeline {
>  agent any
>  
>  environment {
>    GIT_URL = "https://lab.ssafy.com/s07-blockchain-contract-sub2/S07P22B105.git"
>  }
>  
>  tools {
>    nodejs "nodejs-client"
>  }
>  
>  stages {
>    stage('Pull') {
>      steps {
>        script {
>          try {
>            git url: "${GIT_URL}", branch: "develop/frontend", credentialsId: '7281c389-9b67-42c6-a5ab-4af3ff42ab6a', poll: true, changelog: true
>          } catch (Exception e) {
>            error('git pull faile')
>          }
>        }
>      }
>    }
>    
>    stage('React Build') {
>      steps {
>        script {
>          try {
>            sh 'npm install -g yarn'
>            sh 'yarn --cwd ./frontend install --network-timeout 100000'
>            sh 'yarn --cwd ./frontend build'
>          } catch (Exception e) {
>            error('npm build fail')
>          }
>        }
>      }
>    }
>    
>    stage('Build') {
>      steps {
>        script {
>          try {
>            sh 'docker build -t basepage/nginx ./frontend/'
>          } catch (Exception e) {
>            error('docker build fail')
>          }
>        }
>      }
>    }
>    
>    stage('Deploy') {
>      steps {
>        script {
>          try {
>            sh 'docker stop nginx && docker rm nginx'
>            sh 'docker run -d --name nginx -p 3000:443 -v /etc/letsencrypt/archive:/etc/letsencrypt/archive -u root basepage/nginx'
>          } catch (Exception e) {
>            error('docker run fail')
>          }
>        }
>      }
>    }
>    
>    stage('Finish') {
>      steps {
>        script {
>          try {
>            sh 'docker images -qf dangling=true | xargs -I{} docker rmi {}'
>          } catch (Exception e) {
>            error('docker dangling fail')
>          }
>        }
>      }
>    }
>  }
>}
>```

<br>

[목차로 이동](#목차)

## Spring Boot 자동 배포 설정
>1. DockerFile
>```dockerfile
>FROM openjdk:8-jdk-alpine
>ARG JAR_FILE=build/libs/*.jar
>COPY ${JAR_FILE} app.jar
>ENTRYPOINT ["java", "-jar", "/app.jar"]
>```
>2. Jenkins Pipeline
>```pipeline
>pipeline {
>  agent any
>  
>  environment {
>    GIT_URL = "https://lab.ssafy.com/s07-blockchain-contract-sub2/S07P22B105.git"
>  }
>  
>  tools {
>    gradle "gradle-api"
>  }
>  
>  stages {
>    stage('Pull') {
>      steps {
>        script {
>          try {
>            git url: "${GIT_URL}", branch: "develop/backend", credentialsId: '7281c389-9b67-42c6-a5ab-4af3ff42ab6a', poll: true, changelog: true
>          } catch (Exception e) {
>            error('git pull fail')
>          }
>        }
>      }
>    }
>    
>    stage('SpringBoot Build') {
>      steps {
>        script {
>          try {
>            dir('backend') {
>              sh './gradlew build'
>            }
>          } catch (Exception e) {
>            error('gradlew build fail')
>          }
>        }
>      }
>    }
>    
>    stage('Build') {
>      steps {
>        script {
>          try {
>            sh 'docker build -t springboot ./backend/'
>          } catch (Exception e) {
>            error('docker build fail')
>          }
>        }
>      }
>    }
>    
>    stage('Deploy') {
>      steps {
>        script {
>          try {
>            sh 'docker stop springboot && docker rm springboot'
>            sh 'docker run -d -v /var/lib/image:/root/pictures -v /etc/timezone:/etc/timezone -v /etc/localtime:/etc/localtime --name springboot -p 9000:8080 -u root springboot'
>          } catch (Exception e) {
>            error('docker run fail')
>          }
>        }
>      }
>    }
>    
>    stage('Finish') {
>      steps {
>        script {
>          try {
>            sh 'docker images -qf dangling=true | xargs -I{} docker rmi {}'
>          } catch (Exception e) {
>            error('docker dangling fail')
>          }
>        }
>      }
>    }
>  }
>}
>```

<br>

[목차로 이동](#목차)

>## 에러 로그 확인법
>1. putty 로 우분투 서버 접속
>2. [$ docker ps] 명령으로 로그를 확인할 컨테이너의 이름을 확인
>3. [$ docker logs 컨테이너이름] 명령으로 로그 조회

<br>

[목차로 이동](#목차)