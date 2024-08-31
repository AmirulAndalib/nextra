'use client'

import '../polyfill'
import type { Heading, PageMapItem } from 'nextra'
import { useFSRoute } from 'nextra/hooks'
import { normalizePages } from 'nextra/normalize-pages'
import type { ReactElement, ReactNode } from 'react'
import { createContext, useContext, useMemo, useState } from 'react'
import { MenuProvider } from './menu'

type Config = {
  hideSidebar: boolean
  normalizePagesResult: ReturnType<typeof normalizePages>
  toc: Heading[]
  setTOC: (toc: Heading[]) => void
}

const ConfigContext = createContext<Config>({
  hideSidebar: false,
  normalizePagesResult: {} as ReturnType<typeof normalizePages>,
  toc: [],
  setTOC: () => {}
})
ConfigContext.displayName = 'Config'

export function useConfig() {
  return useContext(ConfigContext)
}

export function ConfigProvider({
  children,
  pageMap,
  footer,
  navbar
}: {
  children: ReactNode
  pageMap: PageMapItem[]
  footer: ReactNode
  navbar: ReactNode
}): ReactElement {
  const [menu, setMenu] = useState(false)
  const fsPath = useFSRoute()

  const normalizePagesResult = useMemo(
    () => normalizePages({ list: pageMap, route: fsPath }),
    [pageMap, fsPath]
  )

  const { activeType, activeThemeContext } = normalizePagesResult
  const hideSidebar = !activeThemeContext.sidebar || activeType === 'page'

  const [toc, setTOC] = useState<Heading[]>([])

  const extendedConfig: Config = {
    hideSidebar,
    normalizePagesResult,
    toc,
    setTOC
  }

  return (
    <ConfigContext.Provider value={extendedConfig}>
      <MenuProvider value={{ menu, setMenu }}>
        {activeThemeContext.navbar && navbar}
        {children}
        {activeThemeContext.footer && footer}
      </MenuProvider>
    </ConfigContext.Provider>
  )
}
