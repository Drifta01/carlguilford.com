type BaseType = {
  key: number;
  name: string;
};

declare type DataRecord<T> = {
  [P in keyof T]: T[P];
} & BaseType;

declare type Address = {
  address: string;
  phone: string;
  email: string;
};

declare type Contact = {
  firstName: string;
  lastName: string;
  mobile: string;
  email: string;
} & Partial<BaseType>;

declare type Supplier = {
  phone: string;
  email: string;
  contact?: Contact;
} & BaseType;

declare type Category = {} & BaseType;

declare type Item = {
  price: number;
  category?: Category;
  supplier?: Supplier;
} & BaseType;

// Usage

const item: DataRecord<Item> = {
  key: 1,
  name: "Item",
  price: 1,
};

const category: DataRecord<Category> = {
  key: 1.44,
  name: "Category",
};

const supplier: DataRecord<Supplier> = {
  key: 1,
  name: "Supplier",
  contact: {
    key: 1,
    firstName: "John",
    lastName: "Jones",
    mobile: "123",
    email: "john@company.com",
  },
  phone: "sfsf",
  email: "sfsf",
};
