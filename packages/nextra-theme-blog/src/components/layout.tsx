import { ThemeProvider } from 'next-themes'
import type { ReactElement, ReactNode } from 'react'

export function Footer({
  children = `CC BY-NC 4.0 ${new Date().getFullYear()} © Shu Ding.`
}: {
  children?: ReactNode
}): ReactElement {
  return <small className="_mt-32 _block">{children}</small>
}

export function Layout({ children }: { children: ReactNode }): ReactElement {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <article
        className="_container _px-4 _prose max-md:_prose-sm dark:_prose-invert"
        dir="ltr"
      >
        {children}
      </article>
    </ThemeProvider>
  )
}
