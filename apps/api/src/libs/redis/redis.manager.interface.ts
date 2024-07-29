import { Cluster } from 'ioredis';

export interface IRedisManager {
  monitor(): void;
  checkRedisClient(): Promise<Cluster>;
  incr(key: string): Promise<number>;
  get(key: string): Promise<string | null>;
  set(key: string, value: number): Promise<string>;
  zadd(key: string, score: number, member: string): Promise<number>;
}
