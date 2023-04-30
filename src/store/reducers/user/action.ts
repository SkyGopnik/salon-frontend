import axios from "axios";

import { userSlice } from "src/store/reducers/user/slice";

import { AppDispatch } from "src/store";

export const fetchUser = () => async (dispatch: AppDispatch) => {
  const { data } = await axios.get("/user/profile");

  dispatch(userSlice.actions.update(data));
};
