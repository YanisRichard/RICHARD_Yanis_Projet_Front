// @/utils/emitter.ts
type EventType = `${string}:${string}`
type EventCallback<T> = (detail: T) => void

const $on = (eventType: EventType, callback: EventCallback<unknown>) => {
  document.addEventListener(eventType, callback)
}

const $trigger = <T>(eventType: EventType, detail?: T) => {
  const event = new CustomEvent(eventType, { detail })
  document.dispatchEvent(event)
}

const $off = (eventType: EventType, callback: EventCallback<unknown>) => {
  document.removeEventListener(eventType, callback)
}

export {
  $on,
  $trigger,
  $off
}