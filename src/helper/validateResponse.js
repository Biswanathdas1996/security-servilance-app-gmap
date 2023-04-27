export const SUCCESS_TRANSCTION = "SUCCESSFUL";
export const UNAUTH_TRANSCTION = "INVALID TOKEN";

export const validateResponseAdmin = (response) => {
  console.log("======>", response);
  switch (response?.message) {
    case SUCCESS_TRANSCTION:
      return true;
    case UNAUTH_TRANSCTION:
      var returnLink = window.location.href;
      window.location.replace(
        "#/admin/login?return=" + encodeURIComponent(returnLink)
      );

      return false;
    default:
      return false;
  }
};