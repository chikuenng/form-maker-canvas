
/**
 * Client
**/

import * as runtime from './runtime/library.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model Canvas
 * 
 */
export type Canvas = $Result.DefaultSelection<Prisma.$CanvasPayload>

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Canvas
 * const canvas = await prisma.canvas.findMany()
 * ```
 *
 *
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  const U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   *
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more Canvas
   * const canvas = await prisma.canvas.findMany()
   * ```
   *
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): PrismaClient;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;


  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/concepts/components/prisma-client/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>


  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb<ClientOptions>, ExtArgs, $Utils.Call<Prisma.TypeMapCb<ClientOptions>, {
    extArgs: ExtArgs
  }>>

      /**
   * `prisma.canvas`: Exposes CRUD operations for the **Canvas** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Canvas
    * const canvas = await prisma.canvas.findMany()
    * ```
    */
  get canvas(): Prisma.CanvasDelegate<ExtArgs, ClientOptions>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql



  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
   * Metrics
   */
  export type Metrics = runtime.Metrics
  export type Metric<T> = runtime.Metric<T>
  export type MetricHistogram = runtime.MetricHistogram
  export type MetricHistogramBucket = runtime.MetricHistogramBucket

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 6.16.3
   * Query Engine version: bb420e667c1820a8c05a38023385f6cc7ef8e83a
   */
  export type PrismaVersion = {
    client: string
  }

  export const prismaVersion: PrismaVersion

  /**
   * Utility Types
   */


  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
        : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? P : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    Canvas: 'Canvas'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]


  export type Datasources = {
    db?: Datasource
  }

  interface TypeMapCb<ClientOptions = {}> extends $Utils.Fn<{extArgs: $Extensions.InternalArgs }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], ClientOptions extends { omit: infer OmitOptions } ? OmitOptions : {}>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> = {
    globalOmitOptions: {
      omit: GlobalOmitOptions
    }
    meta: {
      modelProps: "canvas"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      Canvas: {
        payload: Prisma.$CanvasPayload<ExtArgs>
        fields: Prisma.CanvasFieldRefs
        operations: {
          findUnique: {
            args: Prisma.CanvasFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CanvasPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.CanvasFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CanvasPayload>
          }
          findFirst: {
            args: Prisma.CanvasFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CanvasPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.CanvasFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CanvasPayload>
          }
          findMany: {
            args: Prisma.CanvasFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CanvasPayload>[]
          }
          create: {
            args: Prisma.CanvasCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CanvasPayload>
          }
          createMany: {
            args: Prisma.CanvasCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.CanvasDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CanvasPayload>
          }
          update: {
            args: Prisma.CanvasUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CanvasPayload>
          }
          deleteMany: {
            args: Prisma.CanvasDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.CanvasUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.CanvasUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CanvasPayload>
          }
          aggregate: {
            args: Prisma.CanvasAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateCanvas>
          }
          groupBy: {
            args: Prisma.CanvasGroupByArgs<ExtArgs>
            result: $Utils.Optional<CanvasGroupByOutputType>[]
          }
          count: {
            args: Prisma.CanvasCountArgs<ExtArgs>
            result: $Utils.Optional<CanvasCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasources?: Datasources
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasourceUrl?: string
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Shorthand for `emit: 'stdout'`
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events only
     * log: [
     *   { emit: 'event', level: 'query' },
     *   { emit: 'event', level: 'info' },
     *   { emit: 'event', level: 'warn' }
     *   { emit: 'event', level: 'error' }
     * ]
     * 
     * / Emit as events and log to stdout
     * og: [
     *  { emit: 'stdout', level: 'query' },
     *  { emit: 'stdout', level: 'info' },
     *  { emit: 'stdout', level: 'warn' }
     *  { emit: 'stdout', level: 'error' }
     * 
     * ```
     * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/logging#the-log-option).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
    /**
     * Instance of a Driver Adapter, e.g., like one provided by `@prisma/adapter-planetscale`
     */
    adapter?: runtime.SqlDriverAdapterFactory | null
    /**
     * Global configuration for omitting model fields by default.
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   omit: {
     *     user: {
     *       password: true
     *     }
     *   }
     * })
     * ```
     */
    omit?: Prisma.GlobalOmitConfig
  }
  export type GlobalOmitConfig = {
    canvas?: CanvasOmit
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type CheckIsLogLevel<T> = T extends LogLevel ? T : never;

  export type GetLogType<T> = CheckIsLogLevel<
    T extends LogDefinition ? T['level'] : T
  >;

  export type GetEvents<T extends any[]> = T extends Array<LogLevel | LogDefinition>
    ? GetLogType<T[number]>
    : never;

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'updateManyAndReturn'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */



  /**
   * Models
   */

  /**
   * Model Canvas
   */

  export type AggregateCanvas = {
    _count: CanvasCountAggregateOutputType | null
    _avg: CanvasAvgAggregateOutputType | null
    _sum: CanvasSumAggregateOutputType | null
    _min: CanvasMinAggregateOutputType | null
    _max: CanvasMaxAggregateOutputType | null
  }

  export type CanvasAvgAggregateOutputType = {
    id: number | null
    Width: number | null
    Height: number | null
  }

  export type CanvasSumAggregateOutputType = {
    id: number | null
    Width: number | null
    Height: number | null
  }

  export type CanvasMinAggregateOutputType = {
    id: number | null
    Name: string | null
    Type: string | null
    Width: number | null
    Height: number | null
  }

  export type CanvasMaxAggregateOutputType = {
    id: number | null
    Name: string | null
    Type: string | null
    Width: number | null
    Height: number | null
  }

  export type CanvasCountAggregateOutputType = {
    id: number
    Name: number
    Type: number
    Width: number
    Height: number
    _all: number
  }


  export type CanvasAvgAggregateInputType = {
    id?: true
    Width?: true
    Height?: true
  }

  export type CanvasSumAggregateInputType = {
    id?: true
    Width?: true
    Height?: true
  }

  export type CanvasMinAggregateInputType = {
    id?: true
    Name?: true
    Type?: true
    Width?: true
    Height?: true
  }

  export type CanvasMaxAggregateInputType = {
    id?: true
    Name?: true
    Type?: true
    Width?: true
    Height?: true
  }

  export type CanvasCountAggregateInputType = {
    id?: true
    Name?: true
    Type?: true
    Width?: true
    Height?: true
    _all?: true
  }

  export type CanvasAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Canvas to aggregate.
     */
    where?: CanvasWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Canvas to fetch.
     */
    orderBy?: CanvasOrderByWithRelationInput | CanvasOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: CanvasWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Canvas from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Canvas.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Canvas
    **/
    _count?: true | CanvasCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: CanvasAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: CanvasSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: CanvasMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: CanvasMaxAggregateInputType
  }

  export type GetCanvasAggregateType<T extends CanvasAggregateArgs> = {
        [P in keyof T & keyof AggregateCanvas]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateCanvas[P]>
      : GetScalarType<T[P], AggregateCanvas[P]>
  }




  export type CanvasGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CanvasWhereInput
    orderBy?: CanvasOrderByWithAggregationInput | CanvasOrderByWithAggregationInput[]
    by: CanvasScalarFieldEnum[] | CanvasScalarFieldEnum
    having?: CanvasScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: CanvasCountAggregateInputType | true
    _avg?: CanvasAvgAggregateInputType
    _sum?: CanvasSumAggregateInputType
    _min?: CanvasMinAggregateInputType
    _max?: CanvasMaxAggregateInputType
  }

  export type CanvasGroupByOutputType = {
    id: number
    Name: string
    Type: string
    Width: number
    Height: number
    _count: CanvasCountAggregateOutputType | null
    _avg: CanvasAvgAggregateOutputType | null
    _sum: CanvasSumAggregateOutputType | null
    _min: CanvasMinAggregateOutputType | null
    _max: CanvasMaxAggregateOutputType | null
  }

  type GetCanvasGroupByPayload<T extends CanvasGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<CanvasGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof CanvasGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], CanvasGroupByOutputType[P]>
            : GetScalarType<T[P], CanvasGroupByOutputType[P]>
        }
      >
    >


  export type CanvasSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    Name?: boolean
    Type?: boolean
    Width?: boolean
    Height?: boolean
  }, ExtArgs["result"]["canvas"]>



  export type CanvasSelectScalar = {
    id?: boolean
    Name?: boolean
    Type?: boolean
    Width?: boolean
    Height?: boolean
  }

  export type CanvasOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "Name" | "Type" | "Width" | "Height", ExtArgs["result"]["canvas"]>

  export type $CanvasPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Canvas"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: number
      Name: string
      Type: string
      Width: number
      Height: number
    }, ExtArgs["result"]["canvas"]>
    composites: {}
  }

  type CanvasGetPayload<S extends boolean | null | undefined | CanvasDefaultArgs> = $Result.GetResult<Prisma.$CanvasPayload, S>

  type CanvasCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<CanvasFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: CanvasCountAggregateInputType | true
    }

  export interface CanvasDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Canvas'], meta: { name: 'Canvas' } }
    /**
     * Find zero or one Canvas that matches the filter.
     * @param {CanvasFindUniqueArgs} args - Arguments to find a Canvas
     * @example
     * // Get one Canvas
     * const canvas = await prisma.canvas.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends CanvasFindUniqueArgs>(args: SelectSubset<T, CanvasFindUniqueArgs<ExtArgs>>): Prisma__CanvasClient<$Result.GetResult<Prisma.$CanvasPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Canvas that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {CanvasFindUniqueOrThrowArgs} args - Arguments to find a Canvas
     * @example
     * // Get one Canvas
     * const canvas = await prisma.canvas.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends CanvasFindUniqueOrThrowArgs>(args: SelectSubset<T, CanvasFindUniqueOrThrowArgs<ExtArgs>>): Prisma__CanvasClient<$Result.GetResult<Prisma.$CanvasPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Canvas that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CanvasFindFirstArgs} args - Arguments to find a Canvas
     * @example
     * // Get one Canvas
     * const canvas = await prisma.canvas.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends CanvasFindFirstArgs>(args?: SelectSubset<T, CanvasFindFirstArgs<ExtArgs>>): Prisma__CanvasClient<$Result.GetResult<Prisma.$CanvasPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Canvas that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CanvasFindFirstOrThrowArgs} args - Arguments to find a Canvas
     * @example
     * // Get one Canvas
     * const canvas = await prisma.canvas.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends CanvasFindFirstOrThrowArgs>(args?: SelectSubset<T, CanvasFindFirstOrThrowArgs<ExtArgs>>): Prisma__CanvasClient<$Result.GetResult<Prisma.$CanvasPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Canvas that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CanvasFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Canvas
     * const canvas = await prisma.canvas.findMany()
     * 
     * // Get first 10 Canvas
     * const canvas = await prisma.canvas.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const canvasWithIdOnly = await prisma.canvas.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends CanvasFindManyArgs>(args?: SelectSubset<T, CanvasFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CanvasPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Canvas.
     * @param {CanvasCreateArgs} args - Arguments to create a Canvas.
     * @example
     * // Create one Canvas
     * const Canvas = await prisma.canvas.create({
     *   data: {
     *     // ... data to create a Canvas
     *   }
     * })
     * 
     */
    create<T extends CanvasCreateArgs>(args: SelectSubset<T, CanvasCreateArgs<ExtArgs>>): Prisma__CanvasClient<$Result.GetResult<Prisma.$CanvasPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Canvas.
     * @param {CanvasCreateManyArgs} args - Arguments to create many Canvas.
     * @example
     * // Create many Canvas
     * const canvas = await prisma.canvas.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends CanvasCreateManyArgs>(args?: SelectSubset<T, CanvasCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a Canvas.
     * @param {CanvasDeleteArgs} args - Arguments to delete one Canvas.
     * @example
     * // Delete one Canvas
     * const Canvas = await prisma.canvas.delete({
     *   where: {
     *     // ... filter to delete one Canvas
     *   }
     * })
     * 
     */
    delete<T extends CanvasDeleteArgs>(args: SelectSubset<T, CanvasDeleteArgs<ExtArgs>>): Prisma__CanvasClient<$Result.GetResult<Prisma.$CanvasPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Canvas.
     * @param {CanvasUpdateArgs} args - Arguments to update one Canvas.
     * @example
     * // Update one Canvas
     * const canvas = await prisma.canvas.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends CanvasUpdateArgs>(args: SelectSubset<T, CanvasUpdateArgs<ExtArgs>>): Prisma__CanvasClient<$Result.GetResult<Prisma.$CanvasPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Canvas.
     * @param {CanvasDeleteManyArgs} args - Arguments to filter Canvas to delete.
     * @example
     * // Delete a few Canvas
     * const { count } = await prisma.canvas.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends CanvasDeleteManyArgs>(args?: SelectSubset<T, CanvasDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Canvas.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CanvasUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Canvas
     * const canvas = await prisma.canvas.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends CanvasUpdateManyArgs>(args: SelectSubset<T, CanvasUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Canvas.
     * @param {CanvasUpsertArgs} args - Arguments to update or create a Canvas.
     * @example
     * // Update or create a Canvas
     * const canvas = await prisma.canvas.upsert({
     *   create: {
     *     // ... data to create a Canvas
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Canvas we want to update
     *   }
     * })
     */
    upsert<T extends CanvasUpsertArgs>(args: SelectSubset<T, CanvasUpsertArgs<ExtArgs>>): Prisma__CanvasClient<$Result.GetResult<Prisma.$CanvasPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Canvas.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CanvasCountArgs} args - Arguments to filter Canvas to count.
     * @example
     * // Count the number of Canvas
     * const count = await prisma.canvas.count({
     *   where: {
     *     // ... the filter for the Canvas we want to count
     *   }
     * })
    **/
    count<T extends CanvasCountArgs>(
      args?: Subset<T, CanvasCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], CanvasCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Canvas.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CanvasAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends CanvasAggregateArgs>(args: Subset<T, CanvasAggregateArgs>): Prisma.PrismaPromise<GetCanvasAggregateType<T>>

    /**
     * Group by Canvas.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CanvasGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends CanvasGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: CanvasGroupByArgs['orderBy'] }
        : { orderBy?: CanvasGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, CanvasGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetCanvasGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Canvas model
   */
  readonly fields: CanvasFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Canvas.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__CanvasClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Canvas model
   */
  interface CanvasFieldRefs {
    readonly id: FieldRef<"Canvas", 'Int'>
    readonly Name: FieldRef<"Canvas", 'String'>
    readonly Type: FieldRef<"Canvas", 'String'>
    readonly Width: FieldRef<"Canvas", 'Int'>
    readonly Height: FieldRef<"Canvas", 'Int'>
  }
    

  // Custom InputTypes
  /**
   * Canvas findUnique
   */
  export type CanvasFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Canvas
     */
    select?: CanvasSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Canvas
     */
    omit?: CanvasOmit<ExtArgs> | null
    /**
     * Filter, which Canvas to fetch.
     */
    where: CanvasWhereUniqueInput
  }

  /**
   * Canvas findUniqueOrThrow
   */
  export type CanvasFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Canvas
     */
    select?: CanvasSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Canvas
     */
    omit?: CanvasOmit<ExtArgs> | null
    /**
     * Filter, which Canvas to fetch.
     */
    where: CanvasWhereUniqueInput
  }

  /**
   * Canvas findFirst
   */
  export type CanvasFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Canvas
     */
    select?: CanvasSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Canvas
     */
    omit?: CanvasOmit<ExtArgs> | null
    /**
     * Filter, which Canvas to fetch.
     */
    where?: CanvasWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Canvas to fetch.
     */
    orderBy?: CanvasOrderByWithRelationInput | CanvasOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Canvas.
     */
    cursor?: CanvasWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Canvas from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Canvas.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Canvas.
     */
    distinct?: CanvasScalarFieldEnum | CanvasScalarFieldEnum[]
  }

  /**
   * Canvas findFirstOrThrow
   */
  export type CanvasFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Canvas
     */
    select?: CanvasSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Canvas
     */
    omit?: CanvasOmit<ExtArgs> | null
    /**
     * Filter, which Canvas to fetch.
     */
    where?: CanvasWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Canvas to fetch.
     */
    orderBy?: CanvasOrderByWithRelationInput | CanvasOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Canvas.
     */
    cursor?: CanvasWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Canvas from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Canvas.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Canvas.
     */
    distinct?: CanvasScalarFieldEnum | CanvasScalarFieldEnum[]
  }

  /**
   * Canvas findMany
   */
  export type CanvasFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Canvas
     */
    select?: CanvasSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Canvas
     */
    omit?: CanvasOmit<ExtArgs> | null
    /**
     * Filter, which Canvas to fetch.
     */
    where?: CanvasWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Canvas to fetch.
     */
    orderBy?: CanvasOrderByWithRelationInput | CanvasOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Canvas.
     */
    cursor?: CanvasWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Canvas from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Canvas.
     */
    skip?: number
    distinct?: CanvasScalarFieldEnum | CanvasScalarFieldEnum[]
  }

  /**
   * Canvas create
   */
  export type CanvasCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Canvas
     */
    select?: CanvasSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Canvas
     */
    omit?: CanvasOmit<ExtArgs> | null
    /**
     * The data needed to create a Canvas.
     */
    data: XOR<CanvasCreateInput, CanvasUncheckedCreateInput>
  }

  /**
   * Canvas createMany
   */
  export type CanvasCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Canvas.
     */
    data: CanvasCreateManyInput | CanvasCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Canvas update
   */
  export type CanvasUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Canvas
     */
    select?: CanvasSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Canvas
     */
    omit?: CanvasOmit<ExtArgs> | null
    /**
     * The data needed to update a Canvas.
     */
    data: XOR<CanvasUpdateInput, CanvasUncheckedUpdateInput>
    /**
     * Choose, which Canvas to update.
     */
    where: CanvasWhereUniqueInput
  }

  /**
   * Canvas updateMany
   */
  export type CanvasUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Canvas.
     */
    data: XOR<CanvasUpdateManyMutationInput, CanvasUncheckedUpdateManyInput>
    /**
     * Filter which Canvas to update
     */
    where?: CanvasWhereInput
    /**
     * Limit how many Canvas to update.
     */
    limit?: number
  }

  /**
   * Canvas upsert
   */
  export type CanvasUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Canvas
     */
    select?: CanvasSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Canvas
     */
    omit?: CanvasOmit<ExtArgs> | null
    /**
     * The filter to search for the Canvas to update in case it exists.
     */
    where: CanvasWhereUniqueInput
    /**
     * In case the Canvas found by the `where` argument doesn't exist, create a new Canvas with this data.
     */
    create: XOR<CanvasCreateInput, CanvasUncheckedCreateInput>
    /**
     * In case the Canvas was found with the provided `where` argument, update it with this data.
     */
    update: XOR<CanvasUpdateInput, CanvasUncheckedUpdateInput>
  }

  /**
   * Canvas delete
   */
  export type CanvasDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Canvas
     */
    select?: CanvasSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Canvas
     */
    omit?: CanvasOmit<ExtArgs> | null
    /**
     * Filter which Canvas to delete.
     */
    where: CanvasWhereUniqueInput
  }

  /**
   * Canvas deleteMany
   */
  export type CanvasDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Canvas to delete
     */
    where?: CanvasWhereInput
    /**
     * Limit how many Canvas to delete.
     */
    limit?: number
  }

  /**
   * Canvas without action
   */
  export type CanvasDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Canvas
     */
    select?: CanvasSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Canvas
     */
    omit?: CanvasOmit<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const CanvasScalarFieldEnum: {
    id: 'id',
    Name: 'Name',
    Type: 'Type',
    Width: 'Width',
    Height: 'Height'
  };

  export type CanvasScalarFieldEnum = (typeof CanvasScalarFieldEnum)[keyof typeof CanvasScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const CanvasOrderByRelevanceFieldEnum: {
    Name: 'Name',
    Type: 'Type'
  };

  export type CanvasOrderByRelevanceFieldEnum = (typeof CanvasOrderByRelevanceFieldEnum)[keyof typeof CanvasOrderByRelevanceFieldEnum]


  /**
   * Field references
   */


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    
  /**
   * Deep Input Types
   */


  export type CanvasWhereInput = {
    AND?: CanvasWhereInput | CanvasWhereInput[]
    OR?: CanvasWhereInput[]
    NOT?: CanvasWhereInput | CanvasWhereInput[]
    id?: IntFilter<"Canvas"> | number
    Name?: StringFilter<"Canvas"> | string
    Type?: StringFilter<"Canvas"> | string
    Width?: IntFilter<"Canvas"> | number
    Height?: IntFilter<"Canvas"> | number
  }

  export type CanvasOrderByWithRelationInput = {
    id?: SortOrder
    Name?: SortOrder
    Type?: SortOrder
    Width?: SortOrder
    Height?: SortOrder
    _relevance?: CanvasOrderByRelevanceInput
  }

  export type CanvasWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: CanvasWhereInput | CanvasWhereInput[]
    OR?: CanvasWhereInput[]
    NOT?: CanvasWhereInput | CanvasWhereInput[]
    Name?: StringFilter<"Canvas"> | string
    Type?: StringFilter<"Canvas"> | string
    Width?: IntFilter<"Canvas"> | number
    Height?: IntFilter<"Canvas"> | number
  }, "id">

  export type CanvasOrderByWithAggregationInput = {
    id?: SortOrder
    Name?: SortOrder
    Type?: SortOrder
    Width?: SortOrder
    Height?: SortOrder
    _count?: CanvasCountOrderByAggregateInput
    _avg?: CanvasAvgOrderByAggregateInput
    _max?: CanvasMaxOrderByAggregateInput
    _min?: CanvasMinOrderByAggregateInput
    _sum?: CanvasSumOrderByAggregateInput
  }

  export type CanvasScalarWhereWithAggregatesInput = {
    AND?: CanvasScalarWhereWithAggregatesInput | CanvasScalarWhereWithAggregatesInput[]
    OR?: CanvasScalarWhereWithAggregatesInput[]
    NOT?: CanvasScalarWhereWithAggregatesInput | CanvasScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"Canvas"> | number
    Name?: StringWithAggregatesFilter<"Canvas"> | string
    Type?: StringWithAggregatesFilter<"Canvas"> | string
    Width?: IntWithAggregatesFilter<"Canvas"> | number
    Height?: IntWithAggregatesFilter<"Canvas"> | number
  }

  export type CanvasCreateInput = {
    Name: string
    Type: string
    Width: number
    Height: number
  }

  export type CanvasUncheckedCreateInput = {
    id?: number
    Name: string
    Type: string
    Width: number
    Height: number
  }

  export type CanvasUpdateInput = {
    Name?: StringFieldUpdateOperationsInput | string
    Type?: StringFieldUpdateOperationsInput | string
    Width?: IntFieldUpdateOperationsInput | number
    Height?: IntFieldUpdateOperationsInput | number
  }

  export type CanvasUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    Name?: StringFieldUpdateOperationsInput | string
    Type?: StringFieldUpdateOperationsInput | string
    Width?: IntFieldUpdateOperationsInput | number
    Height?: IntFieldUpdateOperationsInput | number
  }

  export type CanvasCreateManyInput = {
    id?: number
    Name: string
    Type: string
    Width: number
    Height: number
  }

  export type CanvasUpdateManyMutationInput = {
    Name?: StringFieldUpdateOperationsInput | string
    Type?: StringFieldUpdateOperationsInput | string
    Width?: IntFieldUpdateOperationsInput | number
    Height?: IntFieldUpdateOperationsInput | number
  }

  export type CanvasUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    Name?: StringFieldUpdateOperationsInput | string
    Type?: StringFieldUpdateOperationsInput | string
    Width?: IntFieldUpdateOperationsInput | number
    Height?: IntFieldUpdateOperationsInput | number
  }

  export type IntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    search?: string
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type CanvasOrderByRelevanceInput = {
    fields: CanvasOrderByRelevanceFieldEnum | CanvasOrderByRelevanceFieldEnum[]
    sort: SortOrder
    search: string
  }

  export type CanvasCountOrderByAggregateInput = {
    id?: SortOrder
    Name?: SortOrder
    Type?: SortOrder
    Width?: SortOrder
    Height?: SortOrder
  }

  export type CanvasAvgOrderByAggregateInput = {
    id?: SortOrder
    Width?: SortOrder
    Height?: SortOrder
  }

  export type CanvasMaxOrderByAggregateInput = {
    id?: SortOrder
    Name?: SortOrder
    Type?: SortOrder
    Width?: SortOrder
    Height?: SortOrder
  }

  export type CanvasMinOrderByAggregateInput = {
    id?: SortOrder
    Name?: SortOrder
    Type?: SortOrder
    Width?: SortOrder
    Height?: SortOrder
  }

  export type CanvasSumOrderByAggregateInput = {
    id?: SortOrder
    Width?: SortOrder
    Height?: SortOrder
  }

  export type IntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    search?: string
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    search?: string
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    search?: string
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }



  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}