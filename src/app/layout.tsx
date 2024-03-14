"use client"

import { Inter } from "next/font/google";
import "./globals.css";
import 'react-toastify/dist/ReactToastify.css';
import { ClerkProvider } from '@clerk/nextjs'
import { Provider } from "react-redux";
import { store } from "./store/store";
import { dark,neobrutalism } from '@clerk/themes';

import "./styles/theme.scss"

const inter = Inter({ subsets: ["latin"] });


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider 
      appearance={{
        baseTheme: dark
      }}
    >
      <Provider store={store}>
        <html lang="en">
          <body className={`${inter.className} bg-cover bg-center bg-fixed`}>
            {children}
          </body>
        </html>
      </Provider>
    </ClerkProvider>
  );
}