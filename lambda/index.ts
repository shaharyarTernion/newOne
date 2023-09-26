import addPost, { getPosts } from "./main";
import { PostInput } from "./types";

type AppSyncEvent = {
  info: {
    fieldName: string;
  };
  arguments: {
    post: PostInput;
  };
};

exports.handler = async (event: AppSyncEvent) => {
  switch (event.info.fieldName) {
    case "addPost":
      return await addPost(event.arguments.post);
    case "getPosts":
      return await getPosts();
    default:
      return null;
  }
};
