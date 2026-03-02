import 'dotenv/config';
console.log('MONGODB_URI (prefix):', (process.env.MONGODB_URI || '').slice(0, 40));
import app from './app.js';
import { connectDB } from './config/db.js';

const PORT = process.env.PORT || 4000;

async function bootstrap() {
  try {
    await connectDB(process.env.MONGODB_URI);
    app.listen(PORT, () => console.log(`🚀 API escuchando en http://localhost:${PORT}`));
  } catch (err) {
    console.error('❌ Error al iniciar:', err);
    process.exit(1);
  }
}
bootstrap();