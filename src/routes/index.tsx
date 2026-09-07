import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { AppLayout } from "@/components/AppLayout";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Dashboard — BO Teluk Betung" },
      {
        name: "description",
        content:
          "Kalender agenda dan pengingat nasabah untuk tim RMFT BO Teluk Betung dalam satu dashboard.",
      },
      { property: "og:title", content: "Dashboard — BO Teluk Betung" },
      {
        property: "og:description",
        content: "Kalender agenda dan pengingat nasabah tim RMFT BO Teluk Betung.",
      },
    ],
  }),
  component: DashboardPage,
});

const DAYS = ["MIN", "SEN", "SEL", "RAB", "KAM", "JUM", "SAB"];
const MONTHS = [
  "Januari",
  "Februari",
  "Maret",
  "April",
  "Mei",
  "Juni",
  "Juli",
  "Agustus",
  "September",
  "Oktober",
  "November",
  "Desember",
];

type CalendarEvent = { id: number; tanggal: string; judul: string; warna: string | null };

const DOT: Record<string, string> = {
  amber: "bg-warning",
  green: "bg-success",
  pink: "bg-destructive",
  blue: "bg-primary",
};

function DashboardPage() {
  const today = new Date();
  const [cursor, setCursor] = useState(new Date(today.getFullYear(), today.getMonth(), 1));
  const [events, setEvents] = useState<CalendarEvent[]>([]);

  useEffect(() => {
    supabase
      .from("calendar_events")
      .select("id,tanggal,judul,warna")
      .order("tanggal")
      .then(({ data }) => setEvents((data ?? []) as CalendarEvent[]));
  }, []);

  const cells = useMemo(() => {
    const start = new Date(cursor.getFullYear(), cursor.getMonth(), 1);
    const gridStart = new Date(start);
    gridStart.setDate(1 - start.getDay());
    return Array.from({ length: 42 }, (_, i) => {
      const d = new Date(gridStart);
      d.setDate(gridStart.getDate() + i);
      return d;
    });
  }, [cursor]);

  const byDate = useMemo(() => {
    const map = new Map<string, CalendarEvent[]>();
    for (const e of events) {
      const key = e.tanggal.slice(5); // MM-DD, agenda berulang tiap tahun
      map.set(key, [...(map.get(key) ?? []), e]);
    }
    return map;
  }, [events]);

  const key = (d: Date) =>
    `${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
  const isSameDay = (a: Date, b: Date) => a.toDateString() === b.toDateString();

  return (
    <AppLayout>
      <div className="card-elevated mb-4 flex flex-wrap items-center justify-between gap-3 px-6 py-4">
        <h1 className="text-2xl font-bold tracking-tight">
          {MONTHS[cursor.getMonth()]} {cursor.getFullYear()}
        </h1>
        <div className="flex items-center gap-2">
          <Button
            variant="secondary"
            size="sm"
            onClick={() => setCursor(new Date(cursor.getFullYear(), cursor.getMonth() - 1, 1))}
          >
            ← Sebelumnya
          </Button>
          <Button
            variant="secondary"
            size="sm"
            onClick={() => setCursor(new Date(today.getFullYear(), today.getMonth(), 1))}
          >
            Hari Ini
          </Button>
          <Button
            variant="secondary"
            size="sm"
            onClick={() => setCursor(new Date(cursor.getFullYear(), cursor.getMonth() + 1, 1))}
          >
            Selanjutnya →
          </Button>
        </div>
      </div>

      <div className="card-elevated overflow-hidden">
        <div className="grid grid-cols-7 border-b bg-card">
          {DAYS.map((d) => (
            <div
              key={d}
              className="px-3 py-3 text-center text-xs font-semibold tracking-widest text-muted-foreground"
            >
              {d}
            </div>
          ))}
        </div>
        <div className="grid grid-cols-7">
          {cells.map((d, i) => {
            const inMonth = d.getMonth() === cursor.getMonth();
            const dayEvents = byDate.get(key(d)) ?? [];
            const isToday = isSameDay(d, today);
            return (
              <div
                key={i}
                className={cn(
                  "min-h-[100px] border-b border-r p-2 last:border-r-0",
                  !inMonth && "bg-muted/40 text-muted-foreground",
                  dayEvents.length > 0 && inMonth && "bg-warning/10",
                  isToday && "bg-primary/5",
                )}
              >
                <span
                  className={cn(
                    "inline-flex size-6 items-center justify-center rounded-full text-sm font-medium",
                    isToday && "bg-primary text-primary-foreground",
                  )}
                >
                  {d.getDate()}
                </span>
                <div className="mt-1 space-y-1">
                  {dayEvents.map((e) => (
                    <div
                      key={e.id}
                      className="flex items-center gap-1.5 truncate rounded border bg-card px-1.5 py-0.5 text-[11px]"
                    >
                      <span
                        className={cn("size-1.5 shrink-0 rounded-full", DOT[e.warna ?? "blue"] ?? "bg-primary")}
                      />
                      <span className="truncate">{e.judul}</span>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </AppLayout>
  );
}
