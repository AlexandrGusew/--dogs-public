const app = require('./app');

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`\x1b[35;4m  🚀 Server is running on port: ${PORT} \x1b[0m`);
});
