import { fc, reactNode } from 'nextra/schemas'
import type { FC, ReactNode } from 'react'
import { z } from 'zod'

const i18nSchema = /* @__PURE__ */ (() =>
  z.array(
    z.strictObject({
      direction: z.enum(['ltr', 'rtl']).optional(),
      locale: z.string(),
      name: z.string()
    })
  ))()

export const themeSchema = /* @__PURE__ */ (() =>
  z.strictObject({
    darkMode: z.boolean(),
    docsRepositoryBase: z.string().startsWith('https://'),
    editLink: z.strictObject({
      component: z
        .custom<
          FC<{
            children: ReactNode
            className?: string
            filePath?: string
          }>
        >(...fc)
        .or(z.null())
        .optional(),
      content: z.custom<ReactNode | FC>(...reactNode)
    }),
    feedback: z.strictObject({
      content: z.custom<ReactNode | FC>(...reactNode),
      labels: z.string(),
      useLink: z.custom<(title: string) => string>().optional()
    }),
    gitTimestamp: z.custom<ReactNode | FC<{ timestamp: Date }>>(...reactNode),
    i18n: i18nSchema,
    navigation: z.boolean().or(
      z.strictObject({
        next: z.boolean(),
        prev: z.boolean()
      })
    ),
    search: z.custom<ReactNode>(...reactNode),
    sidebar: z.strictObject({
      autoCollapse: z.boolean().optional(),
      defaultMenuCollapseLevel: z.number().min(1).int(),
      toggleButton: z.boolean()
    }),
    themeSwitch: z.strictObject({
      options: z.strictObject({
        light: z.string(),
        dark: z.string(),
        system: z.string()
      })
    }),
    toc: z.strictObject({
      backToTop: z.boolean(),
      extraContent: z.custom<ReactNode | FC>(...reactNode),
      float: z.boolean(),
      title: z.custom<ReactNode | FC>(...reactNode)
    })
  }))()

export const publicThemeSchema = /* @__PURE__ */ (() =>
  // eslint-disable-next-line deprecation/deprecation -- fixme
  themeSchema.deepPartial().extend({
    // to have `locale` and `text` as required properties
    i18n: i18nSchema.optional()
  }))()
