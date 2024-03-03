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
  author_id: number;
  likes: number;
  created_at: Date;
}

//  comment model
interface Comment {
  id: number;
  content: string;
  author_id: number;
}
