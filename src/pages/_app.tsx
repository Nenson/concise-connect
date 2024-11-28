import { trpc } from "@/utils/trpc"
import type { AppProps } from "next/app"
import CssBaseline from "@mui/material/CssBaseline"
import { AppCacheProvider } from "@mui/material-nextjs/v15-pagesRouter"

function App(props: AppProps) {
  const { Component, pageProps } = props

  return (
    <AppCacheProvider {...props}>
      <CssBaseline>
        <Component {...pageProps} />
      </CssBaseline>
    </AppCacheProvider>
  )
}

export default trpc.withTRPC(App)
