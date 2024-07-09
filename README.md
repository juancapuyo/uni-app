## Universities Data Manual
Clone this repository into your local machine,
```
git clone https://github.com/juancapuyo/uni-app.gi
cd uni-app
```

Install all general dependencies,
```
npm install
```

Install dependencies specific to backend and frontend,
```
cd frontend
npm install
cd ../backend
npm install
```

Ensure the port numbers in frontend/.env and backend/.env are the same,
```
cd frontend
cat frontend/.env
cd ../backend
cat backend/.env
```

Run the frontend and backend in separate terminals,

Frontend terminal:

```
cd frontend
npm start
```

Backend terminal

```
node server.js
```

