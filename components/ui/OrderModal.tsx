"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Loader2, X } from "lucide-react";
import { useEffect, useId, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";

type Props = {
  open: boolean;
  onClose: () => void;
  product?: string;
};

function FloatingInput({
  label,
  value,
  onChange,
  type = "text",
  inputMode,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  type?: React.HTMLInputTypeAttribute;
  inputMode?: React.HTMLAttributes<HTMLInputElement>["inputMode"];
}) {
  const id = useId();
  return (
    <div className="relative">
      <input
        id={id}
        type={type}
        inputMode={inputMode}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder=" "
        className={[
          "peer w-full rounded-2xl border border-white/10 bg-white/5 px-4 pb-3 pt-5",
          "text-sm text-white outline-none backdrop-blur transition",
          "focus:border-white/20 focus:bg-white/7 focus:ring-2 focus:ring-white/10",
        ].join(" ")}
      />
      <label
        htmlFor={id}
        className={[
          "pointer-events-none absolute left-4 top-2 text-xs text-white/60 transition",
          "peer-placeholder-shown:top-4 peer-placeholder-shown:text-sm",
          "peer-focus:top-2 peer-focus:text-xs peer-focus:text-white/85",
        ].join(" ")}
      >
        {label}
      </label>
    </div>
  );
}

export default function OrderModal({ open, onClose, product }: Props) {
  const { t } = useTranslation();
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [location, setLocation] = useState<null | {
    lat: number;
    lng: number;
    accuracy?: number;
  }>(null);
  const [locating, setLocating] = useState(false);
  const [telegramUsername, setTelegramUsername] = useState("");
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<
    | null
    | {
      type: "success" | "error";
      text: string;
      telegramTrackUrl?: string;
    }
  >(null);

  const canSubmit = useMemo(() => {
    return Boolean(name.trim() && phone.trim() && address.trim() && product);
  }, [name, phone, address, product]);

  useEffect(() => {
    if (!open) return;
    setStatus(null);
    setTelegramUsername("");
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open, onClose]);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!canSubmit || !product) return;
    setLoading(true);
    setStatus(null);
    try {
      const res = await fetch("/api/order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name.trim(),
          phone: phone.trim(),
          address: address.trim(),
          product,
          location,
          telegramUsername: telegramUsername.trim() || undefined,
        }),
      });

      const data = (await res.json()) as {
        telegramTrackUrl?: string;
        error?: string;
      };

      if (!res.ok) throw new Error(data?.error || t("orderModal.errorGeneric"));

      setStatus({
        type: "success",
        text: t("orderModal.success"),
        telegramTrackUrl: data.telegramTrackUrl,
      });
      const delay = data.telegramTrackUrl ? 12000 : 1600;
      setTimeout(() => {
        onClose();
      }, delay);
    } catch (err) {
      setStatus({
        type: "error",
        text:
          err instanceof Error
            ? err.message
            : t("orderModal.errorGeneric"),
      });
    } finally {
      setLoading(false);
    }
  };

  const getLocation = () => {
    if (!("geolocation" in navigator)) {
      setStatus({ type: "error", text: t("orderModal.browserNoLocation") });
      return;
    }
    setLocating(true);
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setLocation({
          lat: pos.coords.latitude,
          lng: pos.coords.longitude,
          accuracy: pos.coords.accuracy,
        });
        setLocating(false);
      },
      (err) => {
        setLocating(false);
        setStatus({
          type: "error",
          text:
            err.code === err.PERMISSION_DENIED
              ? t("orderModal.locationDenied")
              : t("orderModal.locationError"),
        });
      },
      { enableHighAccuracy: true, timeout: 8000, maximumAge: 0 },
    );
  };

  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          className="fixed inset-0 z-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <button
            type="button"
            aria-label="Close order modal"
            className="absolute inset-0 bg-black/65 backdrop-blur-sm"
            onClick={onClose}
          />

          <motion.div
            className="relative mx-auto flex h-full max-w-lg items-center px-4 sm:px-6"
            initial={{ y: 18, opacity: 0, scale: 0.98 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: 10, opacity: 0, scale: 0.99 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="w-full overflow-hidden rounded-3xl border border-white/10 bg-[#0f1f1b]/85 shadow-[0_40px_120px_-60px_rgba(0,0,0,0.75)] backdrop-blur-xl">
              <div className="flex items-start justify-between gap-4 px-5 pb-4 pt-5 sm:px-6">
                <div>
                  <div className="text-xs font-semibold tracking-wide text-white/60">
                    ORDER
                  </div>
                  <div className="mt-2 text-xl font-semibold tracking-tight text-white">
                    {t("orderModal.heading")}
                  </div>
                  <div className="mt-1 text-sm text-white/65">
                    {t("orderModal.productLabel")}:{" "}
                    <span className="font-medium text-white">{product}</span>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={onClose}
                  aria-label="Close"
                  className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white/80 transition hover:bg-white/10 hover:text-white"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              <div className="px-5 pb-5 sm:px-6">
                <form onSubmit={submit} className="space-y-4">
                  <FloatingInput
                    label={t("orderModal.name")}
                    value={name}
                    onChange={setName}
                  />
                  <FloatingInput
                    label={t("orderModal.phone")}
                    value={phone}
                    onChange={setPhone}
                    type="tel"
                    inputMode="tel"
                  />
                  <FloatingInput
                    label={t("orderModal.address")}
                    value={address}
                    onChange={setAddress}
                  />
                  <FloatingInput
                    label={t("orderModal.telegramUsername")}
                    value={telegramUsername}
                    onChange={setTelegramUsername}
                  />
                  <p className="text-xs text-white/45">
                    {t("orderModal.telegramHint")}
                  </p>

                  <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                    <button
                      type="button"
                      onClick={getLocation}
                      disabled={locating}
                      className={[
                        "inline-flex h-11 items-center justify-center rounded-full border border-white/15 bg-white/10 px-4",
                        "text-sm font-semibold text-white/90 backdrop-blur transition hover:bg-white/15",
                        "disabled:opacity-60 disabled:hover:bg-white/10",
                      ].join(" ")}
                    >
                      {locating ? t("orderModal.locating") : `📍 ${t("orderModal.sendLocation")}`}
                    </button>
                    {location ? (
                      <div className="text-xs text-white/60">
                        OK · {location.lat.toFixed(5)}, {location.lng.toFixed(5)}
                      </div>
                    ) : (
                      <div className="text-xs text-white/50">
                        {t("orderModal.optional")}
                      </div>
                    )}
                  </div>
                  <button
                    type="button"
                    className="w-full pb-2 text-left text-white underline-offset-2 hover:underline"
                    onClick={() =>
                      window.open("https://t.me/Book_coffeeUz_bot", "_blank", "noopener,noreferrer")
                    }
                  >
                    📲 {t("orderModal.trackTelegram")}
                  </button>

                  {status ? (
                    <div
                      className={[
                        "rounded-2xl border p-4 text-sm",
                        status.type === "success"
                          ? "border-white/10 bg-white/7 text-white/85"
                          : "border-red-500/25 bg-red-500/10 text-white/85",
                      ].join(" ")}
                    >
                      <p>{status.text}</p>
                      {status.type === "success" && status.telegramTrackUrl ? (
                        <a
                          href={status.telegramTrackUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="mt-3 inline-flex w-full items-center justify-center rounded-full border border-white/20 bg-white/10 px-4 py-2.5 text-center text-sm font-semibold text-white transition hover:bg-white/15"
                        >
                          Telegramda /start — buyurtma holati
                        </a>
                      ) : null}
                    </div>
                  ) : null}

                  <button
                    type="submit"
                    disabled={!canSubmit || loading}
                    className={[
                      "inline-flex h-12 w-full items-center justify-center gap-2 rounded-full",
                      "bg-white text-black font-semibold tracking-tight transition",
                      "hover:bg-white/95 disabled:opacity-60 disabled:hover:bg-white",
                    ].join(" ")}
                  >
                    {loading ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : null}
                    {loading ? t("orderModal.submitting") : t("orderModal.submit")}
                  </button>
                </form>
              </div>

            </div>

          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}

