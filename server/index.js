const app = require('./app');
const connectDatabase = require('./config/dbConn');

const PORT = process.env.PORT;

app.listen(PORT, async () => {
    console.log('Server is running successfully');

    await connectDatabase();
});