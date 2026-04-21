// ─── Error ────────────────────────────────────
export interface ServiceError {
  message: string;
  status?: number;
}

// ─── Service Response ─────────────────────────
export type ServiceResponse<T> = { data: T; error: null } | { data: null; error: ServiceError };
