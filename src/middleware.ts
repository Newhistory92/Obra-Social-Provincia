import { authMiddleware } from "@clerk/nextjs";


export default authMiddleware({
  
    publicRoutes:["/","/api/datos/prestador"]
    
});

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*),"],
};