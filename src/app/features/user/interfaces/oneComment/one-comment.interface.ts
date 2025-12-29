export interface oneComment {
    _id: string;
    content: string;
    commentCreator: User;
    post: string;
    createdAt: string;
}
  
interface User {
    _id: string;
    name: string;
    photo: string;
}

export interface commentForm {
    content: string;
    post: string;
}