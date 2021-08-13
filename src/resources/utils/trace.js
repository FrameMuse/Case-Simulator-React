import { unstable_trace as trace } from "scheduler/tracing"

export function Ttrace(name, callback) {
  try {
    trace(name, performance.now(), callback)
  } catch (error) { }
}