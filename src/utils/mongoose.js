import { connect, connection } from 'mongoose';

const url = process.env.DB_HOST;

const conn = {
  isConnected: false,
};

export async function connectDB() {
  if (conn.isConnected) return;

  const db = await connect(url, {});
  console.log(db.connection.db.databaseName);
  conn.isConnected = db.connections[0].readyState;
}

connection.on('connected', () => {
  console.log('Mongoose connected');
});
connection.on('error', (err) => {
  console.log('Mongoose conection error', err);
});
