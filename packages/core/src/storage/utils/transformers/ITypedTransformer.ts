export interface ITypedTransformer<TEntity, TDatabase> {
  to: (entityValue: TEntity | undefined) => TDatabase
  from: (databaseValue: TDatabase) => TEntity
}
