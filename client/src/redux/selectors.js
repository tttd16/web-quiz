export const selectAccessToken = (state) => state.auth.accessToken;
export const selectMessage = (state) => state.auth.message;
export const selectProfile = (state) => state.profile.profile;
export const selectLoginLoading = (state) => state.auth.loading;
export const selectLoginError = (state) => state.auth.error;
