import { ApplicationToolbar } from "@/components/application-toolbar.component"
import { Box } from "@mui/material"
import Head from "next/head"

export default function Home() {
  return (
    <>
      <Head>
        <title>Concise Connect</title>
        <meta name="description" content="Real-time chat application" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <Box
          sx={{
            display: "flex",
            height: "100vh",
            flexDirection: { xs: "column", md: "row" },
          }}
        >
          <ApplicationToolbar />
          <Box
            sx={{
              flexGrow: { xs: 20, md: 4 },
              padding: 4,
            }}
          >
            Users List
          </Box>
          <Box
            sx={{
              flexGrow: { xs: 20, md: 12 },
              padding: 4,
            }}
          >
            Messaging Section
          </Box>
        </Box>
      </main>
    </>
  )
}
