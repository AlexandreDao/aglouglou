import { useRef } from 'react'

export function useThrottle<T extends (...args: any[]) => void>(func: T, delay: number): T {
  const lastCall = useRef(0)

  return function (this: any, ...args: Parameters<T>): void {
    const now = Date.now()
    if (now - lastCall.current >= delay) {
      lastCall.current = now
      func.apply(this, args)
    }
  } as T
}
