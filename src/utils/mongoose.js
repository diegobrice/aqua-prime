import { connect, connection } from 'mongoose';

const url = 'mongodb://localhost:27017/aqua-prime';

const conn = {
  isConnected: false,
};

export async function connectDB() {
  if (conn.isConnected) return;

  const db = await connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  console.log(db.connection.db.databaseName);
  conn.isConnected = db.connections[0].readyState;
}

connection.on('connected', () => {
  console.log('Mongoose connected');
});
connection.on('error', (err) => {
  console.log('Mongoose conection error', err);
});
