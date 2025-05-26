"use client"

import { useEffect } from "react"
import Head from "next/head"

export function SeoProvider() {
  return (
    <Head>
      <title>Zarspada Blog</title>
      <meta name="description" content="A personal blog about technology, development, and thoughts" />
      <meta property="og:type" content="website" />
      <meta property="og:locale" content="en_US" />
      <meta property="og:url" content="https://zarspada.com/" />
      <meta property="og:site_name" content="Zarspada Blog" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:handle" content="@zarspada" />
      <meta name="twitter:site" content="@zarspada" />
    </Head>
  )
} 