import EnvExport from '../conf/EnvExport'
import { Client, Account, ID } from 'appwrite'

export class AuthService {
    client = new Client();
    account;

    constructor() {
        this.client
            .setEndpoint(EnvExport.ENDPOINT)
            .setProject(EnvExport.PROJECT_ID);
        this.account = new Account(this.client);
    }

    async createAccount({ email, password, name }) {
        try {
            const user = await this.account.create(
                ID.unique(),
                email,
                password,
                name
            );

            if (user) {
                // Wait a bit before auto-login
                await new Promise(resolve => setTimeout(resolve, 500));
                return await this.login({ email, password });
            }
            return user;
        } catch (error) {
            console.error("Create account error:", error);
            throw error;
        }
    }

    async login({ email, password }) {
        try {
            return await this.account.createEmailPasswordSession(email, password);
        } catch (error) {
            console.error("Login error:", error);
            throw error;
        }
    }

    async getCurrentUser() {
        try {
            return await this.account.get();
        } catch (error) {
            console.log('No user logged in:', error.message);
            return null; // ✅ FIXED: Return null on error
        }
    }

    async logout() {
        try {
            return await this.account.deleteSessions();
        } catch (error) {
            console.log("Logout error:", error);
        }
    }
}

const authservice = new AuthService();
export default authservice;