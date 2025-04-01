// store/commentStore.ts
// import { create } from "zustand";
// import { CommentLists } from "@/constants/mockComments";

// interface CommentState {
//   comments: CommentLists[];
//   setComments: (comments: CommentLists[]) => void;
//   addComment: (newComment: CommentLists) => void;
//   addReply: (
//     commentId: number,
//     reply: { username: string; text: string; createDate: string }
//   ) => void;
//   replies: { [key: number]: string };
//   setReplies: (replies: { [key: number]: string }) => void;
// }

// const useCommentStore = create<CommentState>((set) => ({
//   comments: [],
//   setComments: (comments) => set({ comments }),
//   addComment: (newComment) =>
//     set((state) => ({ comments: [...state.comments, newComment] })),
//   addReply: (commentId, reply) =>
//     set((state) => ({
//       comments: state.comments.map((comment) =>
//         comment.id === commentId
//           ? { ...comment, replies: [...(comment.replies || []), reply] }
//           : comment
//       ),
//     })),
//   replies: {},
//   setReplies: (replies) => set({ replies }),
// }));

// export default useCommentStore;
