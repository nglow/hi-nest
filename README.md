# Nest.js API
## Nest.js란 
Node.js의 백엔드 프레임워크로, Express 위에서 동작함

## 🛠 Tech Stack
### Back-End
* Node.js
* Nest.js

### REST Client
* Insomnia

## Consideration
* SRP(Single-Responsibility Principle)
* Nest JS는 express위에서 돌아가고 fastify위에서도 돌아갈 수 있다. 따라서 express의 기능(ex. res, req...)을 사용할 수 있지만, 그렇게 작업한다면 express에서 fastify로 migration(fastify가 express보다 2배 더 빠름)하고 싶을때 문제가 된다.

