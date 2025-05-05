import { useReducer, useEffect } from "react";
import { useRouter } from "next/navigation";
import { writeDiary } from "@/api/diary/diaryWrite";
import useDiaryStore from "@/store/diaryStore";

// 상태 및 액션 정의
const initialState = {
  title: "",
  content: "",
  image: null as string | null,
  imageFile: null as File | null,
  loading: false,
  error: null as string | null,
};

type Action =
  | { type: "SET_TITLE"; payload: string }
  | { type: "SET_CONTENT"; payload: string }
  | { type: "SET_IMAGE"; payload: { preview: string; file: File } }
  | { type: "CLEAR_IMAGE" }
  | { type: "SET_LOADING"; payload: boolean }
  | { type: "SET_ERROR"; payload: string | null }
  | { type: "RESET_FORM" };
// 수정 타입 추가

function reducer(
  state: typeof initialState,
  action: Action
): typeof initialState {
  switch (action.type) {
    case "SET_TITLE":
      return { ...state, title: action.payload };
    case "SET_CONTENT":
      return { ...state, content: action.payload };
    case "SET_IMAGE":
      return {
        ...state,
        image: action.payload.preview,
        imageFile: action.payload.file,
      };
    case "CLEAR_IMAGE":
      return { ...state, image: null, imageFile: null };
    case "SET_LOADING":
      return { ...state, loading: action.payload };
    case "SET_ERROR":
      return { ...state, error: action.payload };
    case "RESET_FORM":
      return initialState;

    default:
      return state;
  }
}

export const useDiaryWriteForm = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const router = useRouter();

  // 이미지 메모리 해제
  useEffect(() => {
    return () => {
      if (state.image) URL.revokeObjectURL(state.image);
    };
  }, [state.image]);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const preview = URL.createObjectURL(file);
      dispatch({ type: "SET_IMAGE", payload: { preview, file } });
    } else {
      dispatch({ type: "CLEAR_IMAGE" });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    dispatch({ type: "SET_LOADING", payload: true });
    dispatch({ type: "SET_ERROR", payload: null });

    try {
      const newDiary = await writeDiary(
        state.title,
        state.content,
        state.imageFile
      );
      useDiaryStore.getState().addDiary(newDiary);
      alert("다이어리 작성 완료!");
      dispatch({ type: "RESET_FORM" });
      router.push("/diary/everydiary");
    } catch {
      dispatch({
        type: "SET_ERROR",
        payload: "다이어리 작성 실패. 다시 시도해주세요.",
      });
    } finally {
      dispatch({ type: "SET_LOADING", payload: false });
    }
  };

  return {
    ...state,
    dispatch,
    handleImageUpload,
    handleSubmit,
  };
};
