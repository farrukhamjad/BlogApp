import config from '../config/config.js'
import { Client, ID, Databases, Storage, Query, Account } from 'appwrite'

export class appwriteService{
    client = new Client();
    databases;
    bucket;
    constructor() {
        this.client
            .setEndpoint(config.appwriteUrl)
            .setProject(config.appwriteProjectId);
        this.databases = new Databases(this.client);
        this.bucket = new Storage(this.client);
    }

    async createPost({title, slug, content, featuredImage, status, category, userId, userName, userEmail}) {
        try {
            return await this.databases.createDocument(
                config.appwriteDatabaseId,
                config.appwriteCollectiontId,
                slug,
                {
                    title,
                    content,
                    featuredImage,
                    status,
                    category,
                    userId,
                    userName,
                    userEmail
                }
            )
        } catch (error) {
            console.log("Appwrite service :: createPost :: error", error);
        }
    }

    async updatePost(slug, {title, content, featuredImage, status, category, userName}) {
        try {
            return await this.databases.updateDocument(
                config.appwriteDatabaseId,
                config.appwriteCollectiontId,
                slug,
                {
                    title,
                    content,
                    featuredImage,
                    status,
                    category,
                    userName
                }
            )
        } catch (error) {
            console.log("Appwrite service :: updatePost :: error", error);
        }
    }

    async deletePost(slug) {
        try {
            await this.databases.deleteDocument(
                config.appwriteDatabaseId,
                config.appwriteCollectiontId,
                slug
            )
            return true;
        } catch (error) {
            console.log("Appwrite service :: deletePost :: error", error);
            return false;
        }
    }

    async getPost(slug, userName) {
        try {
            return await this.databases.getDocument(
                config.appwriteDatabaseId,
                config.appwriteCollectiontId,
                slug,
                userName
            )
        } catch (error) {
            console.log("Appwrite service :: getPost :: error", error);            
        }
    }

    async getPosts(queries = [Query.equal('status', 'active')], userName) {
        try {
            return await this.databases.listDocuments(
                config.appwriteDatabaseId,
                config.appwriteCollectiontId,
                queries,
                userName
            )
        } catch (error) {
            console.log("Appwrite service :: getPosts :: error", error);            
            return false;
        }
    }

    async uploadFile(file) {
        const account = new Account(this.client);
        const user = await account.get();

        if (!user) {
            console.log("User is not authenticated");
            return false;
        }
        try {
            return await this.bucket.createFile(
                config.appwriteBucketId,
                ID.unique(),
                file
            )
        } catch (error) {
            console.log("Appwrite service :: uploadFile :: error", error);            
            return false;
        }
    }

    async deleteFile(fileId) {
        try {
            await this.bucket.deleteFile(
                config.appwriteBucketId,
                fileId
            )
            return true;
        } catch (error) {
            console.log("Appwrite service :: deleteFile :: error", error);            
            return false;
        }
    }

    getFilePreview(fileId) {
        return this.bucket.getFilePreview(
            config.appwriteBucketId,
            fileId
        )
    }

    async updatePostsByUserId(userId, newName) {
        try {
            const response = await this.databases.listDocuments(
                config.appwriteDatabaseId,
                config.appwriteCollectiontId,
                [Query.equal('userId', userId)]
            );
            
            const promises = response.documents.map(post => 
                this.databases.updateDocument(
                    config.appwriteDatabaseId,
                    config.appwriteCollectiontId,
                    post.$id,
                    { userName: newName }
                )
            );
            
            await Promise.all(promises);
            return true;
        } catch (error) {
            console.log("Appwrite service :: updatePostsByUserId :: error", error);
            return false;
        }
    }

    async getUserProfile(userId) {
        try {
          const response = await this.databases.listDocuments(
            config.appwriteDatabaseId,
            config.appwriteCollectiontId,
            [Query.equal('userId', userId)] // Querying the user by their ID
          );
      
          if (response && response.documents && response.documents.length > 0) {
            return response.documents[0]; // Return the first document (user profile)
          } else {
            throw new Error('User profile not found');
          }
        } catch (error) {
          console.error('Error fetching user profile:', error);
          return null;
        }
    }      
      

    async getUserPosts(userId) {
        try {
            const response = await this.databases.listDocuments(
                config.appwriteDatabaseId,
                config.appwriteCollectiontId,
                [Query.equal('userId', userId),]
            );
            return response.documents;
        } catch (error) {
            console.log("Appwrite service :: getUserPosts :: error", error);
            return false;
        }
    }
}

const service = new appwriteService()

export default service