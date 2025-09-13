export type Status = {
  code: string;
  label: string;
};

export type DocumentType = {
  code: string;
  description?: string;
};

export type Application = {
  id: number;
  name: string;
  active: boolean;
};

export interface Tariff {
  idTarifa: number;
  tarifa: string;
  concept?: string;
  status: Status;
  productType?: string;
  documentType?: DocumentType;
  startDay?: string;
  endDay?: string;
  amount?: number;
  lastModifiedAt?: string;
  applications?: Application[];
}

export interface TariffQuery {
  idTarifa: number | string;
}
