import { initializeApp, applicationDefault, getApps, getApp } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";
import { envs } from "../../config/env";
import * as fs from "node:fs";

const projectId = envs.PROJECT_ID;

const app = getApps().length
    ? getApp()
    : initializeApp({ 
        credential: envs.GOOGLE_APPLICATION_CREDENTIALS && fs.existsSync(envs.GOOGLE_APPLICATION_CREDENTIALS) 
            ? applicationDefault() : undefined,
        projectId
    });

export const firestore = getFirestore(app);