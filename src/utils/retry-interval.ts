class RetryInterval {

    private handler: (retryInterval: RetryInterval) => void;
    private intervalMs: number;
    private retriesLeft: number;
    private interval?: NodeJS.Timer;

    constructor(handler: (retryInterval: RetryInterval) => void,
                intervalMs = 250, retries = 40) {
        this.handler = handler;
        this.retriesLeft = retries;
        this.intervalMs = intervalMs;
    }

    start = () => {
        this.interval = setInterval(() => this.handler(this), this.intervalMs);
    }

    decreaseRetry = () => {
        this.retriesLeft--;
        if (this.retriesLeft <= 0) {
            this.stop();
        }
    }

    hasMoreRetries = () => {
        return this.retriesLeft > 0;
    }

    stop = () => {
        if (this.interval) {
            clearInterval(this.interval);
        }
    }

}

export default RetryInterval;
