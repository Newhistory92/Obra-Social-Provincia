import { authMiddleware } from "@clerk/nextjs";


export default authMiddleware({
  
    publicRoutes:["/","/api/handlerafiliado"]
});

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};