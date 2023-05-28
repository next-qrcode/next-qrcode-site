import React from 'react'
import { DocsThemeConfig } from 'nextra-theme-docs'
import { useRouter } from 'next/router'

const config: DocsThemeConfig = {
  useNextSeoProps() {
    const { asPath } = useRouter()
    if (asPath !== '/') {
      return {
        titleTemplate: '%s – next-qrcode'
      }
    }
  },
  head: (
    <>
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta property="og:title" content="next-qrcode" />
      <meta property="og:description" content="A QR code plugin for Next.js, Create React App, Gatsby.js as well as React apps." />
    </>
  ),
  logo: <span>next-qrcode</span>,
  project: {
    link: 'https://github.com/bunlong/next-qrcode',
  },
  // chat: {
  //   link: 'https://discord.com',
  // },
  docsRepositoryBase: 'https://github.com/next-qrcode/next-qrcode-site',
  footer: {
    text:
      <center>
        <span>
          next-qrcode by <a href="https://github.com/bunlong" target="_blank">Bunlong</a> <br/> © 2022-{new Date().getFullYear()}
        </span>
      </center>
  },
}

export default config
