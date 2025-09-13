import axios from 'axios';
import type { Tariff, TariffQuery, Application } from '../types/tariff';

const apiClient = axios.create({
  baseURL: 'https://ebind-dev.egl-cloud.com',
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000,
});

export async function fetchTariff(idTarifa: number | string): Promise<Tariff[]> {
  try {
    const body: TariffQuery = { idTarifa };
    const resp = await apiClient.post('/dgs-api-bridge/tarifas/consulta', body);
    const data = resp.data;
    if (!data) return [];

    const tarifasRaw =
      data.response && Array.isArray(data.response.tarifas)
        ? data.response.tarifas
        : Array.isArray(data.tarifas)
          ? data.tarifas
          : Array.isArray(data.items)
            ? data.items
            : Array.isArray(data)
              ? data
              : [];

    // Map API fields (Spanish) to our Tariff interface
    const toStringSafe = (v: unknown): string | undefined => {
      if (v === null || v === undefined) return undefined;
      if (typeof v === 'string') return v;
      if (typeof v === 'number' || typeof v === 'boolean') return String(v);
      return undefined;
    };
    const toNumberSafe = (v: unknown) =>
      v === null || v === undefined || v === '' ? undefined : Number(v);

    const mapped: Tariff[] = tarifasRaw.map((r: unknown) => {
      const obj = r as Record<string, unknown>;

      const aplicaciones = obj['aplicativos'];
      const apps: Application[] | undefined = Array.isArray(aplicaciones)
        ? (aplicaciones.map((a) => {
            const aa = a as Record<string, unknown>;
            return {
              id: Number(aa['idAplicativo']),
              name: toStringSafe(aa['aplicativo']) ?? 'app',
              active: true,
            };
          }) as Application[])
        : undefined;

      return {
        idTarifa: Number(obj['idTarifa']),
        tarifa: toStringSafe(obj['tarifa'] ?? obj['descripcion'] ?? '') ?? '',
        concept: toStringSafe(obj['concepto'] ?? obj['concept']) ?? undefined,
        status: obj['estatus']
          ? {
              code: toStringSafe(obj['estatus']) ?? 'API',
              label: toStringSafe(obj['estatus']) ?? 'API',
            }
          : { code: 'API', label: 'API' },
        productType: toStringSafe(obj['tipoProducto']) ?? undefined,
        documentType: obj['tipoDocumento']
          ? { code: toStringSafe(obj['tipoDocumento']) ?? '', description: '' }
          : undefined,
        startDay: toStringSafe(obj['diaInicio']) ?? undefined,
        endDay: toStringSafe(obj['diaFin']) ?? undefined,
        amount: toNumberSafe(obj['importe']) ?? toNumberSafe(obj['importePropuesto']) ?? undefined,
        lastModifiedAt:
          toStringSafe(obj['fh_ultima_modificacion'] ?? obj['usuario_ultima_modificacion']) ??
          undefined,
        applications: apps,
      } as Tariff;
    });

    return mapped;
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : String(err);
    throw new Error(`Failed to fetch tariff: ${message}`);
  }
}
