import React, { useMemo, useState } from "react";
import { setStoredApiKey } from "../services/api-key";

type ApiKeyModalProps = {
  open: boolean;
  onClose: () => void;
  onSaved?: () => void;
};

/**
 * Modal para inserir a API Key do Gemini quando o app for aberto fora do CapyUniverse.
 * Compatível com o hub por usar a mesma chave:
 *   localStorage['capyUniverseApiKey_gemini']
 */
export const ApiKeyModal: React.FC<ApiKeyModalProps> = ({ open, onClose, onSaved }) => {
  const [value, setValue] = useState<string>("");
  const [show, setShow] = useState<boolean>(false);
  const [hint, setHint] = useState<string>("");

  const canSave = useMemo(() => value.trim().length > 10, [value]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/60 backdrop-blur-md p-4">
      <div className="w-full max-w-lg rounded-2xl border border-white/10 bg-zinc-950/80 shadow-2xl">
        <div className="flex items-start justify-between gap-4 p-5 border-b border-white/10">
          <div>
            <p className="text-xs uppercase tracking-widest text-zinc-400">CapyUniverse</p>
            <h2 className="text-lg font-bold text-white">Inserir chave Gemini</h2>
            <p className="text-sm text-zinc-400 mt-1">
              Você abriu fora do hub. Cole sua API Key e continue.
            </p>
          </div>

          <button
            onClick={onClose}
            className="text-zinc-400 hover:text-white transition"
            aria-label="Fechar"
          >
            ✕
          </button>
        </div>

        <div className="p-5 space-y-3">
          <div className="flex gap-2">
            <input
              type={show ? "text" : "password"}
              value={value}
              onChange={(e) => {
                setValue(e.target.value);
                if (hint) setHint("");
              }}
              placeholder="Cole sua API Key aqui"
              className="flex-1 rounded-xl bg-black/40 border border-white/10 px-4 py-3 text-white outline-none focus:border-blue-500/60"
            />

            <button
              type="button"
              onClick={() => setShow((s) => !s)}
              className="rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white hover:bg-white/10 transition"
            >
              {show ? "Ocultar" : "Mostrar"}
            </button>
          </div>

          {hint && <p className="text-xs text-amber-300">{hint}</p>}

          <div className="flex justify-end gap-2 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="rounded-xl border border-white/10 px-4 py-2 text-sm text-zinc-300 hover:bg-white/5 transition"
            >
              Agora não
            </button>

            <button
              type="button"
              disabled={!canSave}
              onClick={() => {
                const k = value.trim();
                if (!k) {
                  setHint("Cole uma chave válida antes de salvar.");
                  return;
                }
                setStoredApiKey(k);
                onSaved?.();
                onClose();
              }}
              className={`rounded-xl px-4 py-2 text-sm font-bold transition ${
                canSave
                  ? "bg-blue-600 hover:bg-blue-500 text-white"
                  : "bg-blue-600/30 text-white/50 cursor-not-allowed"
              }`}
            >
              Salvar chave
            </button>
          </div>

          <p className="text-[11px] text-zinc-500">
            A chave fica salva localmente no seu navegador (localStorage).
          </p>
        </div>
      </div>
    </div>
  );
};
