class RetryInterval {
  private readonly handler: (retryInterval: RetryInterval) => void
  private readonly intervalMs: number
  private retriesLeft: number
  private interval?: NodeJS.Timer

  constructor (handler: (retryInterval: RetryInterval) => void,
    intervalMs: number = 250, retries: number = 40) {
    this.handler = handler
    this.retriesLeft = retries
    this.intervalMs = intervalMs
  }

  start = () => {
    this.interval = setInterval(() => this.handler(this), this.intervalMs)
  }

  decreaseRetry = () => {
    this.retriesLeft--
    if (this.retriesLeft <= 0) {
      this.stop()
    }
  }

  hasMoreRetries = () => {
    return this.retriesLeft > 0
  }

  stop = () => {
    if (this.interval) {
      clearInterval(this.interval)
    }
  }
}

export default RetryInterval
