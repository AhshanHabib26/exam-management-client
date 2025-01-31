export const isNewBlog = (createdAt: string): boolean => {
  const today = new Date();
  const yesterday = new Date();
  yesterday.setDate(today.getDate() - 1);

  const postDate = new Date(createdAt);
  return postDate >= yesterday && postDate <= today;
};
