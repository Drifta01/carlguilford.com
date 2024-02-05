// type TDataSource<TRecord> = {
//   key: string;
//   datasource: TRecord;
// };

// type Record<K extends keyof any, T> = {
//   [P in K]: T;
// };

type DBRecord<K extends keyof any, T> = {
  [P in K]: T;
};

function genericTable<DBRecord>(dataSource: DBRecord[]): void {
  console.log(dataSource.length);
  console.log(dataSource.name);
  console.log(dataSource.id);

  const id = dataSource.id;

  return arg;
}

genericTable({ length: 10, value: "10" });

// function takes an unknown record array type
// function need to to work with the record type
// unknown record type has base properties

/// Datasource
/// id: number;
/// field1: string;
/// field2: string;
/// filed3: number;
