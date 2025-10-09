import { create } from 'zustand';

interface SignUpData {
  id: string;
  password: string;
  email: string;
}

interface SignUpState {
  formData: SignUpData;
  setFormData: (data: SignUpData) => void;
  reset: () => void;
}

const initialState: SignUpData = {
  id: '',
  password: '',
  email: '',
};

export const useSignUpStore = create<SignUpState>((set) => ({
  formData: initialState,
  setFormData: (data) =>
    set((state) => ({
      formData: { ...state.formData, ...data },
    })),
  reset: () => set({ formData: initialState }),
}));
