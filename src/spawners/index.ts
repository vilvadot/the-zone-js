export interface Spawner<Entity> {
  spawn: (quantity?: number) => Entity[];
}
