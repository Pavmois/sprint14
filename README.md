# Sprint 14

## version 1

### Как развернуть проект?

Необходимо скачать репозиторий на локальное хранилище. Распаковать архив и в корне
папки Sprint 14 открыть Git Bash. В появившейся консоли необходимо написать 
"npm run start" и если в консоли появилось следующее сообщение... 

 sprint14@1.0.0 start C:\..\..\sprint14
 node app.js
 Полёт нормальный

...то можно запускать Postman и MongooseDB. В противном случае необходимо связаться с
разработчиком, приложив скриншоты окна состояния консоли.

#### Работа на тему безопасности веб-приложений, а также разбор темы аутентификации и авторизации. 

- в схеме пользователя есть обязательные email и password;
- поле email уникально и валидируется;
- в контроллере createUser почта и хеш пароля записываются в базу;
- есть контроллер login, он проверяет, полученные в теле запроса почту и пароль;
- если почта и пароль верные, контроллер login создаёт JWT, в пейлоуд которого записано свойство _id с идентификатором пользователя; срок жизни токена — 7 дней;
- если почта и пароль верные, контроллер login возвращает созданный токен в ответе;
- если почта и пароль не верные, контроллер login возвращает ошибку 401;
- в app.js есть обработчики POST-запросов на роуты /signin и /signup;
- есть файл middlewares/auth.js, в нём мидлвэр для проверки JWT;
- при правильном JWT авторизационный мидлвэр добавляет в объект запроса пейлоуд и пропускает запрос дальше;
- при неправильном JWT авторизационный мидвэр возвращает ошибку 401;
- все роуты, кроме /signin и /signup, защищены авторизацией;
- удалён хардкод req.user из самостоятельного проекта предыдущего спринта;
- пользователь не может удалить карточку, которую он не создавал;
- API не возвращает хеш пароля;
