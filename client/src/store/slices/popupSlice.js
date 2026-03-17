import { createSlice } from "@reduxjs/toolkit";

const popupSlice = createSlice({
  name: "popup",
  initialState: {
    isCreateStudentModalOpen: false,
    isCreateTeacherModalOpen: false,
  },
  reducers: {
  toggleIsStudentModal(state) {
    state.isCreateStudentModalOpen = !state.isCreateStudentModalOpen;
  },
  toggleIsTeacherModal(state) {
    state.isCreateTeacherModalOpen = !state.isCreateTeacherModalOpen;
  },
},
});
export const { toggleIsStudentModal, toggleIsTeacherModal } = popupSlice.actions;
export default popupSlice.reducer;
