import { create } from 'zustand';

const useModalStore = create((set) => ({
  isOpen: false,
  data: null,
  openModal: (data) => set({ isOpen: true, data }),
  closeModal: () => set({ isOpen: false }),
}));

export default useModalStore;

