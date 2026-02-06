import EnvExport from '../conf/EnvExport';
import { Client, ID,Databases,Storage,Query } from 'appwrite';


export class ConfingService {
client = new Client();
databases;
bucket;

constructor(){
          this.client
            .setEndpoint(EnvExport.ENDPOINT) 
            .setProject(EnvExport.PROJECT_ID);
            this.databases = new Databases(this.client);
            this.bucket = new Storage(this.client);
}


async createPost ({title,slug,content,featuredImage,status,userId}) {

    try {
        return await this.databases.createDocument(EnvExport.DATABASE_ID,EnvExport.COLLECTION_ID,slug,{
            title,content,featuredImage,status,userId
        })
    } catch (error) {
        console.log("There is an error in creating post", error)
    }

}

async updatePost (slug,{title,content,featuredImage,status}) {
try {
    return await this.databases.updateDocument(EnvExport.DATABASE_ID,EnvExport.COLLECTION_ID,slug,{title,content,featuredImage,status})
} catch (error) {
    console.log("There is an error in updating post", error)
}

}
async deletePost(slug){
    try {
         await this.databases.deleteDocument(EnvExport.DATABASE_ID,EnvExport.COLLECTION_ID,slug)

    }
 catch (error) {
       console.log("There is an error in deleting post", error) 
    }
   
}

async getPost(slug){
    try {
        return await this.databases.getDocument(EnvExport.DATABASE_ID,EnvExport.COLLECTION_ID,slug)
    } catch (error) {
        console.log("There is an error in getting post", error)
    }
}

async getAllPosts (queries = [
    Query.equal('status', 'active')]){
    try {
        return await this.databases.listDocuments(EnvExport.DATABASE_ID,EnvExport.COLLECTION_ID,queries)
    } catch (error) {
        console.log("There is an error in getting all posts", error)
    }
}

// file upload services

async uploadFile(file){
    try {
        return await this.bucket.createFile(EnvExport.BUCKET_ID,ID.unique(), file)
    } catch (error) {
        console.log("There is an error in uploading file", error)
         return false;
    }
}


async getFilePreview(fileId){
    try {
        return this.bucket.getFilePreview(EnvExport.BUCKET_ID,fileId)
    } catch (error) {
        console.log("There is an error in getting file preview", error)
         return false;
    }
}

async deleteFile(fileId) {
    try {
        await this.bucket.deleteFile(EnvExport.BUCKET_ID, fileId);
        return true;
    } catch (error) {
        console.error("Error deleting file:", error);
        return false;
    }
};




}


const configservice = new ConfingService

export default configservice ;