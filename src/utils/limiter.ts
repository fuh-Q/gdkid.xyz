import type { NextApiRequest } from "next";

type LimiterConfig = {
    rate: number;
    per: number;
    keyGen: (r: NextApiRequest) => string;
}

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

    private _getTokenCount(): number {
        let tokens = this._tokenCount > 0 ? this._tokenCount : 0;

        const rn = new Date();
        if (rn.getTime() > this._window.getTime() + (this._per * 1000) && this._hasChilledOut()) {
            tokens = this._maxTokens;
        }

        return tokens;
    }

    private _update(): void {
        this._tokenCount--;
        this._tokenCount = this._getTokenCount();

        const rn = new Date();
        if (rn.getTime() - this._window.getTime() > (this._per * 1000)) {
            this._window = rn;
        }

        this.last = rn;
    }

    private _hasChilledOut(): boolean {
        if (this._tokenCount > 0) {
            return true;
        }

        const rn = new Date();
        return rn.getTime() - this.last.getTime() > (this._per * 1000);
    }

    isExhausted(): boolean {
        this._update();
        return this._tokenCount <= 0;
    }
}

export default class LockoutLimiter {
    rate: number;
    per: number;
    private _keyGen: (r: NextApiRequest) => string;
    private _mapping: {[key: string]: Bucket};

    constructor(options: LimiterConfig) {
        this.rate = options.rate;
        this.per = options.per;
        this._keyGen = options.keyGen;

        this._mapping = {};
    }

    getBucket(r: NextApiRequest): Bucket {
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

    isRateLimited(r: NextApiRequest): boolean {
        const bucket = this.getBucket(r);
        return bucket.isExhausted();
    }
}
