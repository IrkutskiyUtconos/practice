установкак зависимостей
npm install
приложение запускается с помощью команды
npm run dev
для того чтобы приложение запускалось, нужно заранее
запустить mySQL, например с помощью xampp control panel
curl-ы для проверки работы POST-запросов:

регистрация
curl -X POST http://localhost:3000/api/auth/register   -H "Content-Type: application/json"   -d '{"username":"hiker", "email":"hiker@example.com", "password":"mypass"}'

логин
curl -X POST http://localhost:3000/api/auth/login   -H "Content-Type: application/json"   -d '{"email":"hiker@example.com", "password":"mypass"}'

создание похода
curl -X POST http://localhost:3000/api/trips   -H "Authorization: Bearer <токен с прошлого запроса>"   -H "Content-Type: application/json"   -d '{"title":"Тестовый поход", "startDate":"2023-12-20", "difficulty":"medium"}'

GET для вывода всех походов:
http://localhost:3000/api/trips

Для похода по определенному айди:
curl -X GET http://localhost:3000/api/trips/id \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"

Обновление похода:
curl -X PUT http://localhost:3000/api/trips/id \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -d '{
    "title": "Измененное название похода",
    "difficulty": "hard"
  }'


Удаление похода:
curl -X DELETE http://localhost:3000/api/trips/id \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"