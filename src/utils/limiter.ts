import type { IncomingMessage } from "http";
import type { GetServerSidePropsContext } from "next";

type Request = IncomingMessage & { cookies: Partial<{ [key: string]: string }> };

type LimiterOptions = {
    rate: number;
    per: number;
    keyGen: (r: Request) => string;
};

class Bucket {
    last: Date;

    private _tokenCount: number;
    private _per: number;
    private _window: Date;
    private _maxTokens: number;

    constructor(tokens: number, per: number) {
        const rn = new Date();

        this.last = rn;
        this._window = rn;
        this._per = per;
        this._tokenCount = tokens;

        this._maxTokens = tokens;
    }

    isExhausted(): boolean {
        this._update();
        return this._tokenCount <= 0;
    }

    private _update(): void {
        const rn = new Date();

        this._tokenCount--;
        this._tokenCount = this._getTokenCount(rn);

        if (rn.getTime() - this._window.getTime() > this._per * 1000) {
            this._window = rn;
        }

        this.last = rn;
    }

    private _getTokenCount(rn: Date): number {
        let tokens = this._tokenCount > 0 ? this._tokenCount : 0;

        if (rn.getTime() > this._window.getTime() + this._per * 1000 && this._hasChilledOut(rn)) {
            tokens = this._maxTokens;
        }

        return tokens;
    }

    private _hasChilledOut(rn: Date): boolean {
        if (this._tokenCount > 0) return true;

        return rn.getTime() - this.last.getTime() > this._per * 1000;
    }
}

export class LockoutLimiter {
    rate: number;
    per: number;
    private _keyGen: (r: Request) => string;
    private _mapping: { [key: string]: Bucket };

    constructor(options: LimiterOptions) {
        this.rate = options.rate;
        this.per = options.per;
        this._keyGen = options.keyGen;

        this._mapping = {};
    }

    isRateLimited(r: Request): boolean {
        const bucket = this.getBucket(r);
        return bucket.isExhausted();
    }

    getBucket(r: Request): Bucket {
        const key = this._keyGen(r);
        if (!this._mapping[key]) {
            this._mapping[key] = new Bucket(this.rate, this.per);
        }

        const rn = new Date();
        for (const [ip, bucket] of Object.entries(this._mapping)) {
            if (rn.getTime() - bucket.last.getTime() > 300000 && ip !== key) {
                delete this._mapping[ip];
            }
        }

        return this._mapping[key];
    }
}

export function getNewDefaultLimiter() {
    return new LockoutLimiter({
        rate: 3,
        per: 2,
        keyGen: (r: Request) => r.socket.remoteAddress || "",
    });
}
