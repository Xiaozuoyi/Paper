/* @jsxRuntime automatic */
/** @jsxImportSource hastscript */

import { ShikiTransformer } from "shiki"
import type { Element, ElementContent } from 'hast'

interface ShikiOptions {
  languageHint: string | boolean
}

const languageHintDefaultClass = 'absolute right-2 top-2 text-base group-hover:hidden text-white  z-50'
export function transformerEnhanser(options?:ShikiOptions): ShikiTransformer {
  if (!options) {
    options = {
      languageHint: languageHintDefaultClass,
    }
  }
  if (options.languageHint === undefined)
    options.languageHint = languageHintDefaultClass

  return {
    name: 'enhanser',
    preprocess: (code, preprocessoOptions) => {
      if (!preprocessoOptions.meta)
        preprocessoOptions.meta = {}

      preprocessoOptions.meta.lang = preprocessoOptions.lang
      return code
    },
    root: (root) => {
      const pre = root.children[0] as Element
      const wrapper = <div className="group relative"></div>
      if (options!.languageHint) {
        wrapper.children.push(
          (<span className={options!.languageHint}>{pre.properties!.lang}</span>) as ElementContent,
        )
      }
      wrapper.children.push(pre)
      // @ts-expect-error shiki declared hastscript types again
      root.children[0] = wrapper
    },
  }
}