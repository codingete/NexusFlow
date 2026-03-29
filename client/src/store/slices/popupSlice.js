import { createSlice } from "@reduxjs/toolkit";

const popupSlice = createSlice({
  name: "popup",
  initialState: {
    isCreateStudentModalOpen: false,
    isCreateTeacherModalOpen: false,
  },
  reducers: {
    toggleStudentModal(state) {   // ✅ renamed to match ManageStudents.jsx
      state.isCreateStudentModalOpen = !state.isCreateStudentModalOpen;
    },
    toggleTeacherModal(state) {   // ✅ renamed to match AddTeacher.jsx
      state.isCreateTeacherModalOpen = !state.isCreateTeacherModalOpen;
    },
  },
});

export const { toggleStudentModal, toggleTeacherModal } = popupSlice.actions;
export default popupSlice.reducer;
