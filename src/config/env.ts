import 'dotenv/config';
import { get } from 'env-var';

export const envs = {
    PORT: get('PORT').required().asPortNumber(),
    NODE_ENV: get('NODE_ENV').required().asString(),
    CORS: get('CORS_ORIGINS').required().asArray(),
    JWT_SECRET: get('JWT_SECRET').required().asString(),
    PROJECT_ID: get('GOOGLE_CLOUD_PROJECT').required().asString(),
    GOOGLE_APPLICATION_CREDENTIALS: get('GOOGLE_APPLICATION_CREDENTIALS').required().asString(),
}