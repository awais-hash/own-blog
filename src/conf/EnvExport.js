const EnvExport ={
    ENDPOINT: String(import.meta.env.VITE_APPWRITE_ENDPOINT),
    PROJECT_ID: String(import.meta.env.VITE_APPWRITE_PROJECT_ID),
    DATABASE_ID: String(import.meta.env.VITE_APPWRITE_DATABASE_ID),
   COLLECTION_ID: String(import.meta.env.VITE_APPWRITE_COLLECTION_ID),
    STORAGE_ID: String(import.meta.env.VITE_APPWRITE_STORAGE_ID),
}

export default EnvExport;