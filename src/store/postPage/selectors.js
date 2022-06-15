export const selectFullyFetchedPost = (reduxState) => reduxState.postPage;
export const selectPostAndComments = (reduxState) => {
  const select = {
    post: reduxState.postPage.post,
    comment: reduxState.postPage.comments,
  };
  return select;
};
