export type Rule = {
  defaultValue?: string;
  max?: number;
  min?: number;
  round?: number;
  trueLabel?: string;
  falseLabel?: string;
};

export type Property = {
  uuid?: string;
  schemaId?: string;
  label?: string;
  name?: string;
  type?: string;
  rw?: string;
  unit?: string;
  rule?: Rule;
  description?: string;
  value?: string;
};

export type SchemaItem = {
  uuid: string;
  name: string;
  published: boolean;
  description?: string;
  schema: {
    iotProperties?: Property[];
  };
};

export type ActiveSchema = Omit<SchemaItem, 'schema' | 'description'>;
