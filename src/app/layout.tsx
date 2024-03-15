"use client"
import { Inter } from "next/font/google";
import "./globals.css";
import 'react-toastify/dist/ReactToastify.css';
import { ClerkProvider } from '@clerk/nextjs';
import { Provider } from "react-redux";
import { PersistGate } from 'redux-persist/integration/react'; // Importamos PersistGate
import { store, persistor } from "./store/store"; // Importamos store y persistor
import { dark } from '@clerk/themes';

import "./styles/theme.scss";

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
        {/* Agregamos PersistGate para envolver los componentes */}
          <html lang="en">
            <body className={`${inter.className} bg-cover bg-center bg-fixed`}>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
              {children}
        </PersistGate>
      </Provider>
            </body>
          </html>
    </ClerkProvider>
  );
}
