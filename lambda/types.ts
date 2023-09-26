// export type post = {
//   authId: String;
//   postId: String;
//   time: GLfloat;
//   date: GLfloat;
//   title: String;
//   content: String;
//   images?: String[];
// };
type Comment = {
  commentId: String;
  content: String;
  authId: String;
  postId: String;
  likes: String;
  date: String;
  time: String;
  authName: String;
};

export type PostInput = {
  id: String;
  title: String;
  content: String;
  authId: String;
  authorName: String;
  postId: String;
  time: GLfloat;
  date: GLfloat;
  images: String;
  videos: String;
  likes: String;
  comments: Comment[];
  links: String;
  location: String;
  privacy: String;
  repost: String;
  attachments: String;
  views: String;
};
