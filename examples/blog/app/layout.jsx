import { Footer, Head, Layout, Navbar, ThemeSwitch } from 'nextra-theme-blog'
import 'nextra-theme-blog/style.css'

export const metadata = {
  title: 'Blog Example'
}

export default async function RootLayout({ children }) {
  return (
    <html lang="en">
      <Head
        backgroundColor={{
          dark: '15,23,42',
          light: '254,252,232'
        }}
      />
      <body>
        <Layout>
          <Navbar
            navs={[
              { url: '/', name: 'About' },
              { url: '/posts', name: 'Posts' }
            ]}
          >
            <ThemeSwitch />
          </Navbar>

          {children}

          <Footer>
            <abbr
              title="This site and all its content are licensed under a Creative Commons Attribution-NonCommercial 4.0 International License."
              style={{ cursor: 'help' }}
            >
              CC BY-NC 4.0
            </abbr>{' '}
            {new Date().getFullYear()} © Shu Ding.
            <a href="/feed.xml" style={{ float: 'right' }}>
              RSS
            </a>
          </Footer>
        </Layout>
      </body>
    </html>
  )
}
