# Zadanie rekrutacyjne

### Uruchomienie aplikacji na serwerze lokalnym

```
$ git clone https://github.com/Luukess/recruitment-task.git
$ cd ../recruitment-task/med-app
$ npm install
$ npm run dev
```

### Uruchomienie serwera JSON

```
$ cd ../recruitment-task/jsonServer
$ npm install
$ npm run serve-json
```

!! Jeżeli pacjent nie został przydzielony do projektu to podczas usuwania pacjenta lub projektu może pojawić się komunikat, że usunięcie się nie powiodło. Jest to spowodowane niezależnym ode mnie błędem występującym w bibliotece JSON Server. !!

!! W takcie aplikacji może dojść do niewyświetlenia się zawartości z powodu błędu jaki występuje w bibliotece Material UI. "Uncaught TypeError: createTheme_default is not a function
    at Box.js:5:22". Należy ponownie spróbować uruchomić projekt!!

## Dane Logowania do aplikacji

Login: admin@medapp.com

Hasło: qwerty1245
