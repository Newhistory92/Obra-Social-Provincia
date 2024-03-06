"use client"
import React, { useState } from 'react';
import Navbar from "./Component/navbar";


export default function Home() {
  const [showTabsContent, setShowTabsContent] = useState(false);

  return (
    <main className="flex min-h-screen flex-col justify-between p-15 relative">
      <Navbar onLogoClick={() => setShowTabsContent(false)} />
      <div className="w-full flex flex-row-reverse items-center justify-between font-mono text-sm lg:flex z-50 relative">
        {/* Aquí va tu carrusel de imágenes */}
        {/* {showTabsContent ? null : <Carousel />} */}
      </div>
    </main>
  );
}