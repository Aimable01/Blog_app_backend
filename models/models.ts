//  user model
interface User {
  id: number;
  name: string;
  email: string;
  password: string;
}

//   post model
interface Post {
  id: number;
  title: string;
  content: string;
  likes: number;
  created_at: Date;
  author_id: number;
}

//  comment model
interface Comment {
  id: number;
  comment_content: string;
  post_id: number;
  author_id: number;
}
