import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Download, Trash2, Upload } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { AppLayout } from "@/components/AppLayout";
import { DataTableView, exportTableCsv } from "@/components/DataTableView";
import { ExcelUploadDialog } from "@/components/ExcelUploadDialog";
import { PageHeader, StatCard } from "@/components/PageHeader";
import { PivotMutasiView } from "@/components/PivotMutasiView";
import { ProduktivitasRmftView } from "@/components/ProduktivitasRmftView";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { CATEGORY_BY_SLUG } from "@/lib/data-catalog";
import { useRole } from "@/lib/use-role";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/data/$slug")({
  head: () => ({
    meta: [
      { title: "Detail Kategori Data — BO Teluk Betung" },
      {
        name: "description",
        content: "Lihat, cari, dan ekspor catatan data kategori terpilih di BO Teluk Betung.",
      },
      { property: "og:title", content: "Detail Kategori Data — BO Teluk Betung" },
      {
        property: "og:description",
        content: "Lihat, cari, dan ekspor catatan data kategori terpilih.",
      },
    ],
  }),
  component: DataCategoryPage,
});

function useCount(table: string, tick: number) {
  const [count, setCount] = useState<number | null>(null);
  useEffect(() => {
    setCount(null);
    supabase
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      .from(table as any)
      .select("*", { count: "exact", head: true })
      .then(({ count: c }) => setCount(c ?? 0));
  }, [table, tick]);
  return count;
}

function DataCategoryPage() {
  const { slug } = Route.useParams();
  const category = CATEGORY_BY_SLUG.get(slug);
  const { isAdmin } = useRole();
  const [tick, setTick] = useState(0);
  const [tab, setTab] = useState<"data" | "pivot">("data");
  const [confirmWipe, setConfirmWipe] = useState(false);
  const [uploadOpen, setUploadOpen] = useState(false);
  const [csvOpen, setCsvOpen] = useState(false);
  const count = useCount(category?.table ?? "settings", tick);

  if (!category) {
    return (
      <AppLayout>
        <p className="text-sm text-muted-foreground">Kategori tidak ditemukan.</p>
      </AppLayout>
    );
  }

  const isCompareResult = category.readonly && !!CATEGORY_BY_SLUG.get(`${slug}_kenaikan`);
  const isProduktivitas = slug === "produktivitas_rmft";
  // Viewer hanya punya akses penuh di kategori Pivot Multi; selainnya read-only.
  const canManage = isAdmin || slug === "pivot_multi";

  const exportExcel = async () => {
    const { data } = await supabase
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      .from(category.table as any)
      .select("*")
      .limit(5000);
    exportTableCsv((data ?? []) as unknown as Record<string, unknown>[], `${slug}.xlsx`);
  };

  const wipe = async () => {
    const { error } = await supabase
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      .from(category.table as any)
      .delete()
      .gte("id", 0);
    setConfirmWipe(false);
    if (error) {
      toast.error(error.message);
      return;
    }
    toast.success("Semua data dihapus.");
    setTick((t) => t + 1);
  };

  return (
    <AppLayout>
      <PageHeader
        title={category.label}
        description="Manage data records for this category."
        actions={
          <>
            <Button variant="outline" onClick={exportExcel}>
              <Download className="mr-2 size-4" /> Export Excel
            </Button>
            {canManage && !category.readonly && (
              <Button onClick={() => setUploadOpen(true)}>
                <Upload className="mr-2 size-4" /> Upload Excel
              </Button>
            )}
            {canManage && category.csvUpload && (
              <Button variant="outline" onClick={() => setCsvOpen(true)}>
                <Upload className="mr-2 size-4" /> Upload CSV
              </Button>
            )}
            {canManage && (
              <Button variant="destructive" onClick={() => setConfirmWipe(true)}>
                <Trash2 className="mr-2 size-4" /> Hapus Semua Data
              </Button>
            )}
          </>
        }

      />

      {!isCompareResult && (
        <div className="mb-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <StatCard
            label={`Jumlah Data · ${category.label}`}
            value={count === null ? "…" : count.toLocaleString("id-ID")}
          />
        </div>
      )}

      {category.csvUpload && (
        <div className="mb-4 inline-flex rounded-lg border bg-muted/50 p-1">
          {(["data", "pivot"] as const).map((t) => (
            <button
              key={t}
              type="button"
              onClick={() => setTab(t)}
              className={cn(
                "rounded-md px-3 py-1.5 text-sm transition-colors",
                tab === t ? "bg-card font-medium shadow-card" : "text-muted-foreground",
              )}
            >
              {t === "data" ? "Data" : "Pivot Mutasi Rekening"}
            </button>
          ))}
        </div>
      )}

      {category.csvUpload && tab === "pivot" ? (
        <PivotMutasiView refreshKey={tick} />
      ) : isProduktivitas ? (
        <ProduktivitasRmftView key={`prod-${tick}`} canEdit={canManage} />
      ) : isCompareResult ? (
        <div className="space-y-10">
          <DataTableView
            key={`${slug}-turun-${tick}`}
            title="Penurunan"
            table={`${category.table}_penurunan`}
            columns={CATEGORY_BY_SLUG.get(`${slug}_penurunan`)?.columns ?? []}
            showDelta
            canEdit={canManage}
            canAdd={false}
          />
          <DataTableView
            key={`${slug}-naik-${tick}`}
            title="Kenaikan"
            table={`${category.table}_kenaikan`}
            columns={CATEGORY_BY_SLUG.get(`${slug}_kenaikan`)?.columns ?? []}
            showDelta
            canEdit={canManage}
            canAdd={false}
          />
        </div>
      ) : (
        <DataTableView
          key={`${slug}-${tick}`}
          table={category.table}
          columns={category.columns}
          canEdit={canManage && !category.readonly}
          canAdd={canManage && !category.readonly && !category.noAdd}
          onChanged={() => setTick((t) => t + 1)}
        />
      )}

      <ExcelUploadDialog
        open={uploadOpen}
        onOpenChange={setUploadOpen}
        table={category.table}
        label={category.label}
        onImported={() => setTick((t) => t + 1)}
      />

      {category.csvUpload && (
        <ExcelUploadDialog
          mode="csv"
          open={csvOpen}
          onOpenChange={setCsvOpen}
          table={category.table}
          label={category.label}
          onImported={() => setTick((t) => t + 1)}
        />
      )}

      <AlertDialog open={confirmWipe} onOpenChange={setConfirmWipe}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Hapus semua data {category.label}?</AlertDialogTitle>
            <AlertDialogDescription>
              Seluruh baris pada kategori ini akan dihapus permanen.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Batal</AlertDialogCancel>
            <AlertDialogAction onClick={wipe}>Hapus Semua</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </AppLayout>
  );
}
