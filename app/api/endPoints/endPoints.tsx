export let endPoints = {
  auth: {
    signIn: "/auth/login",
    signUp: "/auth/register",
    otp: "/auth/verify-otp",
    update: `/auth/update-password`,
    resetemail:`/auth/reset-password-link`,
    resetlink:`/auth/reset-password`,
  },
  product: {
   create: `/api/post/create`,
    list: `/api/post/list`,
    update:`/api/post/update`,
    details:`/api/post`,
    delete:`/api/delete`,
  },
};
