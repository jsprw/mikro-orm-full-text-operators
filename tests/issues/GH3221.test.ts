import 'reflect-metadata';
import { Entity, MikroORM, PrimaryKey, Property, wrap } from '@mikro-orm/core';

interface BookData {
  title: string;
}

@Entity()
class Book {

  @PrimaryKey()
  id!: string;

  @Property({ type: 'object' })
  data!: BookData;

}

test(`GH issue 3019`, async () => {
  const orm = await MikroORM.init({
    entities: [Book],
    type: 'sqlite',
    dbName: ':memory:',
  });

  const newBook = orm.em.create(Book, {
    id: 'testId',
    data: {
      title: 'testTitle',
    },
  });

  const result = { status: 'OK', data: newBook };
  expect(JSON.stringify(result)).toBe('{"status":"OK","data":{"id":"testId","data":{"title":"testTitle"}}}');

  await orm.close(true);
});