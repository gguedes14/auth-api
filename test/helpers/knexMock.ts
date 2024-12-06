export class KnexMock extends Function implements PromiseLike<unknown> {
  private _results: unknown[] | string[] | number | unknown | undefined;
  private resolved = false;

  constructor(args: {
    whereResults?: unknown[];
    insertResults?: unknown[];
    updateResult?: number;
  }) {
    super();
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const closure = function (...args: unknown[]) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      return closure._call(...args);
    };
    // want to check if client passaed more than one argument
    if (Object.keys(args).length > 1) {
      throw new Error('KnexMock: Cannot search, insert or update at the same query');
    }

    if (args.whereResults) {
      this._results = args.whereResults;
    } else if (args.insertResults) {
      this._results = args.insertResults;
    } else if (args.updateResult) {
      this._results = args.updateResult;
    }

    const newClojure = Object.setPrototypeOf(closure, new.target.prototype);
    newClojure._results = this._results;

    return newClojure as KnexMock;
  }

  public then<TResult1 = unknown, TResult2 = never>(
    onfulfilled?: ((value: unknown) => TResult1 | PromiseLike<TResult1>) | null | undefined,
    onrejected?: ((reason: unknown) => TResult2 | PromiseLike<TResult2>) | null | undefined,
  ): PromiseLike<TResult1 | TResult2> {
    this.resolved = true;
    return Promise.resolve(this._results).then(onfulfilled, onrejected);
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  private _call(...args: unknown[]) {
    return this;
  }

  where(callback?: (trx: KnexMock) => KnexMock): KnexMock {
    if (typeof callback === 'function') {
      callback.call(this, this);

      return this;
    }
    return this;
  }

  orWhere(): KnexMock {
    return this;
  }

  andWhere(): KnexMock {
    return this;
  }

  whereIn(): KnexMock {
    return this;
  }

  whereNotIn(arg: string, callback?: (trx: KnexMock) => KnexMock): KnexMock {
    if (typeof callback === 'function') {
      callback.call(this, this);

      return this;
    }

    return this;
  }

  whereNot(): KnexMock {
    return this;
  }

  whereNull(): KnexMock {
    return this;
  }

  whereNotNull(): KnexMock {
    return this;
  }

  orWhereNull(): KnexMock {
    return this;
  }

  whereRaw(): KnexMock {
    return this;
  }

  first(): KnexMock {
    if (this._results instanceof Array) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      this._results = this._results ? (this._results as any)[0] : undefined;
    }
    return this;
  }

  orderBy(): KnexMock {
    return this;
  }

  limit(): KnexMock {
    return this;
  }

  offset(): KnexMock {
    return this;
  }

  distinct(): KnexMock {
    return this;
  }

  select(): KnexMock {
    return this;
  }

  count(): KnexMock {
    return this;
  }

  sum(): KnexMock {
    return this;
  }

  forUpdate(): KnexMock {
    return this;
  }

  transacting(): KnexMock {
    return this;
  }

  transaction(fn: (trx: KnexMock) => KnexMock): KnexMock {
    return fn(this);
  }

  insert(): KnexMock {
    return this;
  }

  update(): KnexMock {
    return this;
  }

  delete(): KnexMock {
    return this;
  }

  returning(): KnexMock {
    return this;
  }

  join(): KnexMock {
    return this;
  }

  on(): KnexMock {
    return this;
  }

  andOn(): KnexMock {
    return this;
  }

  leftJoin(arg: string, callback?: (trx: KnexMock) => KnexMock): KnexMock {
    if (typeof callback === 'function') {
      callback.call(this, this);

      return this;
    }

    return this;
  }

  innerJoin(arg: string, callback?: (trx: KnexMock) => KnexMock): KnexMock {
    if (typeof callback === 'function') {
      callback.call(this, this);

      return this;
    }

    return this;
  }

  max(): KnexMock {
    return this;
  }

  groupBy(): KnexMock {
    return this;
  }
  distinctOn(): KnexMock {
    return this;
  }

  from(arg: string | ((trx: KnexMock) => KnexMock)): KnexMock {
    if (typeof arg === 'function') {
      arg(this);

      return this;
    }

    return this;
  }

  as(): KnexMock {
    return this;
  }

  raw(): KnexMock {
    return this;
  }
  with(): KnexMock {
    return this;
  }
}

export default KnexMock;
