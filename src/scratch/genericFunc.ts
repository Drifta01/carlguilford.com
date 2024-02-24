type DBRecord<K extends keyof any, T> = {
  [P in K]: T;
};

function genericTable<Type, Key extends keyof Type>(obj: Type, key: Key): Type[Key] {
  return obj[key];
}

// function takes an unknown record array type
// function need to to work with the record type
// unknown record type has base properties

/// Datasource
/// id: number;
/// field1: string;
/// field2: string;
/// filed3: number;
