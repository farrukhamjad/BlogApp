import config from '../config/config.js'
import { Client, Account, ID } from 'appwrite'

export class AuthService{
    client = new Client();
    account;

    constructor() {
        this.client
            .setEndpoint(config.appwriteUrl)
            .setProject(config.appwriteProjectId);
        this.account = new Account(this.client);
    }

    async createAccount({email, password, name}) {
        try {
            const userAccount = await this.account.create(ID.unique(), email, password, name);
            if (userAccount) {
                // return userAccount;
                return this.login({email, password});
            } else {
                return userAccount;
            }
        } catch (error) {
            throw error;
        }
    }

    async login({email, password}) {
        try {
            return await this.account.createEmailPasswordSession(email, password)
        } catch (error) {
            throw error;
        }
    }

    async getCurrentUser() {
        try {
            const user = await this.account.get();
            return user;
        } catch (error) {
            console.log("Appwrite serive :: getCurrentUser :: error", error);
        }

        return null;
    }
    
    async logout() {
        try {
            await this.account.deleteSessions();
        } catch (error) {
            console.log("Appwrite serive :: logout :: error", error);
        }
    }

    async updateUserName(newName) {
        try {
            const user = await this.account.updateName(newName)
            return user;
        } catch (error) {
            console.log("Appwrite serive :: updateUserName :: error", error);
        }
    }

    async updateUserEmail(newEmail, password) {
        try {
            const user = await this.account.updateEmail(newEmail, password)
            return user;
        } catch (error) {
            console.log("Appwrite serive :: updateUserEmail :: error", error);
            throw new Error('Failed to update email. Please check your password.');
        }
    }
}

const authService = new AuthService();

export default authService