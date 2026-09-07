import { o as __toESM } from "../_runtime.mjs";
import { t as supabase } from "./client-BUd3fAPK.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { _ as useNavigate, g as Link, l as useRouterState } from "../_libs/@tanstack/react-router+[...].mjs";
import { N as require_jsx_runtime } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { r as useAuth } from "./router-C9FPYSkn.mjs";
import { r as logVisitOnce, t as cn } from "./utils-ButrhBye.mjs";
import { O as ChevronDown, _ as GitCompare, f as Menu, g as LayoutGrid, h as Link$1, l as ScrollText, n as Users, p as LogOut, s as Settings, x as Database } from "../_libs/lucide-react.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/AppLayout-CohIiiJx.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function useRole() {
	const { user } = useAuth();
	const [role, setRole] = (0, import_react.useState)(null);
	(0, import_react.useEffect)(() => {
		if (!user) {
			setRole(null);
			return;
		}
		supabase.from("user_roles").select("role").eq("user_id", user.id).then(({ data }) => {
			const roles = (data ?? []).map((r) => String(r.role));
			setRole(roles.includes("admin") ? "admin" : "viewer");
		});
	}, [user]);
	return {
		role,
		isAdmin: role === "admin"
	};
}
var DATA_CATEGORIES = [
	{
		slug: "edc",
		table: "data_edc",
		label: "EDC",
		group: null,
		hidden: false,
		readonly: false,
		csvUpload: false,
		noAdd: true,
		columns: [
			{
				field: "posisi",
				label: "Posisi",
				type: "date"
			},
			{
				field: "nama_uker",
				label: "Nama Uker",
				type: "string"
			},
			{
				field: "tid",
				label: "TID",
				type: "string"
			},
			{
				field: "mid",
				label: "MID",
				type: "string"
			},
			{
				field: "nama_merchant",
				label: "Nama Merchant",
				type: "string"
			},
			{
				field: "uker_nama_implementor",
				label: "Uker Implementor",
				type: "string"
			},
			{
				field: "nama_user_pemrakarsa",
				label: "Nama User Pemrakarsa",
				type: "string"
			},
			{
				field: "alamat_merchant",
				label: "Alamat",
				type: "string"
			},
			{
				field: "sales_volume",
				label: "Sales Volume",
				type: "decimal"
			},
			{
				field: "saldo_posisi",
				label: "Saldo Posisi",
				type: "decimal"
			},
			{
				field: "tiering_sales_volume",
				label: "Tiering Sales Volume",
				type: "string"
			},
			{
				field: "status_edc",
				label: "Status EDC",
				type: "string"
			}
		]
	},
	{
		slug: "qris",
		table: "data_qris",
		label: "QRIS",
		group: null,
		hidden: false,
		readonly: false,
		csvUpload: false,
		noAdd: true,
		columns: [
			{
				field: "periode",
				label: "Periode",
				type: "string"
			},
			{
				field: "posisi",
				label: "Posisi",
				type: "string"
			},
			{
				field: "region",
				label: "Region",
				type: "string"
			},
			{
				field: "rgdesc",
				label: "Rgdesc",
				type: "string"
			},
			{
				field: "mainbr",
				label: "Mainbr",
				type: "string"
			},
			{
				field: "mbdesc",
				label: "Mbdesc",
				type: "string"
			},
			{
				field: "branch",
				label: "Branch",
				type: "string"
			},
			{
				field: "x",
				label: "X",
				type: "string"
			},
			{
				field: "brdesc",
				label: "Brdesc",
				type: "string"
			},
			{
				field: "merchant_pan",
				label: "Merchant PAN",
				type: "string"
			},
			{
				field: "storeid",
				label: "Store ID",
				type: "string"
			},
			{
				field: "nama_merchant",
				label: "Nama Merchant",
				type: "string"
			},
			{
				field: "kriteria",
				label: "Kriteria",
				type: "string"
			},
			{
				field: "jenis_usaha",
				label: "Jenis Usaha",
				type: "string"
			},
			{
				field: "kode_mcc",
				label: "Kode MCC",
				type: "string"
			},
			{
				field: "mcc",
				label: "MCC",
				type: "string"
			},
			{
				field: "alamat",
				label: "Alamat",
				type: "string"
			},
			{
				field: "kode_pos",
				label: "Kode Pos",
				type: "string"
			},
			{
				field: "kota",
				label: "Kota",
				type: "string"
			},
			{
				field: "provinsi",
				label: "Provinsi",
				type: "string"
			},
			{
				field: "no_rek",
				label: "No Rek",
				type: "string"
			},
			{
				field: "cif",
				label: "CIF",
				type: "string"
			},
			{
				field: "pn",
				label: "PN",
				type: "string"
			},
			{
				field: "pn_pemrakasa",
				label: "PN Pemrakasa",
				type: "string"
			},
			{
				field: "jabatan",
				label: "Jabatan",
				type: "string"
			},
			{
				field: "tgl_balikan_pten",
				label: "Tgl Balikan PTEN",
				type: "string"
			},
			{
				field: "status",
				label: "Status",
				type: "string"
			},
			{
				field: "merchant_type",
				label: "Merchant Type",
				type: "string"
			},
			{
				field: "akumulasi_sv_onus",
				label: "Akumulasi SV Onus",
				type: "decimal"
			},
			{
				field: "akumulasi_sv_offus",
				label: "Akumulasi SV Offus",
				type: "decimal"
			},
			{
				field: "akumulasi_sv_linkaja",
				label: "Akumulasi SV LinkAja",
				type: "decimal"
			},
			{
				field: "akumulasi_sv_total",
				label: "Akumulasi SV Total",
				type: "decimal"
			},
			{
				field: "posisi_sv_total",
				label: "Posisi SV Total",
				type: "decimal"
			},
			{
				field: "akumulasi_trx_onus",
				label: "Akumulasi TRX Onus",
				type: "decimal"
			},
			{
				field: "akumulasi_trx_offus",
				label: "Akumulasi TRX Offus",
				type: "decimal"
			},
			{
				field: "akumulasi_trx_linkaja",
				label: "Akumulasi TRX LinkAja",
				type: "decimal"
			},
			{
				field: "akumulasi_trx_total",
				label: "Akumulasi TRX Total",
				type: "decimal"
			},
			{
				field: "posisi_trx_total",
				label: "Posisi TRX Total",
				type: "decimal"
			},
			{
				field: "saldo_posisi",
				label: "Saldo Posisi",
				type: "decimal"
			},
			{
				field: "ratas_saldo",
				label: "Ratas Saldo",
				type: "decimal"
			},
			{
				field: "flagging_bri_merchant",
				label: "Flagging BRI Merchant",
				type: "string"
			},
			{
				field: "status_qris",
				label: "Status QRIS",
				type: "string"
			}
		]
	},
	{
		slug: "di319_data1",
		table: "data_di319_data1",
		label: "DATA1",
		group: "DI319",
		hidden: false,
		readonly: false,
		csvUpload: false,
		noAdd: true,
		columns: [
			{
				field: "periode",
				label: "Periode",
				type: "string"
			},
			{
				field: "uker_code",
				label: "Uker Code",
				type: "string"
			},
			{
				field: "curr_code",
				label: "Curr Code",
				type: "string"
			},
			{
				field: "curr_desc",
				label: "Curr Desc",
				type: "string"
			},
			{
				field: "account_number",
				label: "Account Number",
				type: "string"
			},
			{
				field: "ciff_no",
				label: "CIFF No",
				type: "string"
			},
			{
				field: "short_name",
				label: "Short Name",
				type: "string"
			},
			{
				field: "open_dt",
				label: "Open Dt",
				type: "date"
			},
			{
				field: "balance",
				label: "Balance",
				type: "decimal"
			},
			{
				field: "in_balance",
				label: "In Balance",
				type: "decimal"
			},
			{
				field: "accrued_int",
				label: "Accrued Int",
				type: "decimal"
			},
			{
				field: "average_balance",
				label: "Average Balance",
				type: "decimal"
			},
			{
				field: "prod_code",
				label: "Prod Code",
				type: "string"
			},
			{
				field: "pn_pengelola_singlepn",
				label: "PN Pengelola SinglePN",
				type: "string"
			},
			{
				field: "pn_customer_service",
				label: "PN Customer Service",
				type: "string"
			},
			{
				field: "pn_rm_dana_mantri",
				label: "PN RM Dana/Mantri",
				type: "string"
			},
			{
				field: "pn_rm_pinjaman",
				label: "PN RM Pinjaman",
				type: "string"
			},
			{
				field: "pn_rm_merchant",
				label: "PN RM Merchant",
				type: "string"
			},
			{
				field: "pn_relationship_officer_rm_kredit_menengah",
				label: "PN Relationship Officer/RM Kredit Menengah",
				type: "string"
			},
			{
				field: "pn_sales_person",
				label: "PN Sales Person",
				type: "string"
			},
			{
				field: "pn_pab",
				label: "PN PAB",
				type: "string"
			},
			{
				field: "pn_rm_referral",
				label: "PN RM Referral",
				type: "string"
			},
			{
				field: "jumlah_pn_pemasar",
				label: "Jumlah PN Pemasar",
				type: "int"
			},
			{
				field: "balance_dalam_idr",
				label: "Balance Dalam IDR",
				type: "decimal"
			}
		]
	},
	{
		slug: "di319_data2",
		table: "data_di319_data2",
		label: "DATA2",
		group: "DI319",
		hidden: false,
		readonly: false,
		csvUpload: false,
		noAdd: true,
		columns: [
			{
				field: "periode",
				label: "Periode",
				type: "string"
			},
			{
				field: "uker_code",
				label: "Uker Code",
				type: "string"
			},
			{
				field: "curr_code",
				label: "Curr Code",
				type: "string"
			},
			{
				field: "curr_desc",
				label: "Curr Desc",
				type: "string"
			},
			{
				field: "account_number",
				label: "Account Number",
				type: "string"
			},
			{
				field: "ciff_no",
				label: "CIFF No",
				type: "string"
			},
			{
				field: "short_name",
				label: "Short Name",
				type: "string"
			},
			{
				field: "open_dt",
				label: "Open Dt",
				type: "date"
			},
			{
				field: "balance",
				label: "Balance",
				type: "decimal"
			},
			{
				field: "in_balance",
				label: "In Balance",
				type: "decimal"
			},
			{
				field: "accrued_int",
				label: "Accrued Int",
				type: "decimal"
			},
			{
				field: "average_balance",
				label: "Average Balance",
				type: "decimal"
			},
			{
				field: "prod_code",
				label: "Prod Code",
				type: "string"
			},
			{
				field: "pn_pengelola_singlepn",
				label: "PN Pengelola SinglePN",
				type: "string"
			},
			{
				field: "pn_customer_service",
				label: "PN Customer Service",
				type: "string"
			},
			{
				field: "pn_rm_dana_mantri",
				label: "PN RM Dana/Mantri",
				type: "string"
			},
			{
				field: "pn_rm_pinjaman",
				label: "PN RM Pinjaman",
				type: "string"
			},
			{
				field: "pn_rm_merchant",
				label: "PN RM Merchant",
				type: "string"
			},
			{
				field: "pn_relationship_officer_rm_kredit_menengah",
				label: "PN Relationship Officer/RM Kredit Menengah",
				type: "string"
			},
			{
				field: "pn_sales_person",
				label: "PN Sales Person",
				type: "string"
			},
			{
				field: "pn_pab",
				label: "PN PAB",
				type: "string"
			},
			{
				field: "pn_rm_referral",
				label: "PN RM Referral",
				type: "string"
			},
			{
				field: "jumlah_pn_pemasar",
				label: "Jumlah PN Pemasar",
				type: "int"
			},
			{
				field: "balance_dalam_idr",
				label: "Balance Dalam IDR",
				type: "decimal"
			}
		]
	},
	{
		slug: "di319_data3",
		table: "data_di319_data3",
		label: "DATA3",
		group: "DI319",
		hidden: false,
		readonly: false,
		csvUpload: false,
		noAdd: true,
		columns: [
			{
				field: "periode",
				label: "Periode",
				type: "string"
			},
			{
				field: "uker_code",
				label: "Uker Code",
				type: "string"
			},
			{
				field: "curr_code",
				label: "Curr Code",
				type: "string"
			},
			{
				field: "curr_desc",
				label: "Curr Desc",
				type: "string"
			},
			{
				field: "account_number",
				label: "Account Number",
				type: "string"
			},
			{
				field: "ciff_no",
				label: "CIFF No",
				type: "string"
			},
			{
				field: "short_name",
				label: "Short Name",
				type: "string"
			},
			{
				field: "open_dt",
				label: "Open Dt",
				type: "date"
			},
			{
				field: "balance",
				label: "Balance",
				type: "decimal"
			},
			{
				field: "in_balance",
				label: "In Balance",
				type: "decimal"
			},
			{
				field: "accrued_int",
				label: "Accrued Int",
				type: "decimal"
			},
			{
				field: "average_balance",
				label: "Average Balance",
				type: "decimal"
			},
			{
				field: "prod_code",
				label: "Prod Code",
				type: "string"
			},
			{
				field: "pn_pengelola_singlepn",
				label: "PN Pengelola SinglePN",
				type: "string"
			},
			{
				field: "pn_customer_service",
				label: "PN Customer Service",
				type: "string"
			},
			{
				field: "pn_rm_dana_mantri",
				label: "PN RM Dana/Mantri",
				type: "string"
			},
			{
				field: "pn_rm_pinjaman",
				label: "PN RM Pinjaman",
				type: "string"
			},
			{
				field: "pn_rm_merchant",
				label: "PN RM Merchant",
				type: "string"
			},
			{
				field: "pn_relationship_officer_rm_kredit_menengah",
				label: "PN Relationship Officer/RM Kredit Menengah",
				type: "string"
			},
			{
				field: "pn_sales_person",
				label: "PN Sales Person",
				type: "string"
			},
			{
				field: "pn_pab",
				label: "PN PAB",
				type: "string"
			},
			{
				field: "pn_rm_referral",
				label: "PN RM Referral",
				type: "string"
			},
			{
				field: "jumlah_pn_pemasar",
				label: "Jumlah PN Pemasar",
				type: "int"
			},
			{
				field: "balance_dalam_idr",
				label: "Balance Dalam IDR",
				type: "decimal"
			}
		]
	},
	{
		slug: "di321_data1",
		table: "data_di321_data1",
		label: "DATA1",
		group: "DI321",
		hidden: false,
		readonly: false,
		csvUpload: false,
		noAdd: true,
		columns: [
			{
				field: "periode",
				label: "Periode",
				type: "string"
			},
			{
				field: "kanca",
				label: "Kanca",
				type: "string"
			},
			{
				field: "curr",
				label: "Curr",
				type: "string"
			},
			{
				field: "cifno",
				label: "CIF No",
				type: "string"
			},
			{
				field: "account_number",
				label: "Account Number",
				type: "string"
			},
			{
				field: "short_name",
				label: "Short Name",
				type: "string"
			},
			{
				field: "balance",
				label: "Balance",
				type: "decimal"
			},
			{
				field: "pn_rm_dana",
				label: "PN RM Dana",
				type: "string"
			},
			{
				field: "pn_rm_pinjaman",
				label: "PN RM Pinjaman",
				type: "string"
			},
			{
				field: "pn_rm_merchant",
				label: "PN RM Merchant",
				type: "string"
			},
			{
				field: "pn_relationship_officer",
				label: "PN Relationship Officer",
				type: "string"
			}
		]
	},
	{
		slug: "di321_data2",
		table: "data_di321_data2",
		label: "DATA2",
		group: "DI321",
		hidden: false,
		readonly: false,
		csvUpload: false,
		noAdd: true,
		columns: [
			{
				field: "periode",
				label: "Periode",
				type: "string"
			},
			{
				field: "kanca",
				label: "Kanca",
				type: "string"
			},
			{
				field: "curr",
				label: "Curr",
				type: "string"
			},
			{
				field: "cifno",
				label: "CIF No",
				type: "string"
			},
			{
				field: "account_number",
				label: "Account Number",
				type: "string"
			},
			{
				field: "short_name",
				label: "Short Name",
				type: "string"
			},
			{
				field: "balance",
				label: "Balance",
				type: "decimal"
			},
			{
				field: "pn_rm_dana",
				label: "PN RM Dana",
				type: "string"
			},
			{
				field: "pn_rm_pinjaman",
				label: "PN RM Pinjaman",
				type: "string"
			},
			{
				field: "pn_rm_merchant",
				label: "PN RM Merchant",
				type: "string"
			},
			{
				field: "pn_relationship_officer",
				label: "PN Relationship Officer",
				type: "string"
			}
		]
	},
	{
		slug: "di321_data3",
		table: "data_di321_data3",
		label: "DATA3",
		group: "DI321",
		hidden: false,
		readonly: false,
		csvUpload: false,
		noAdd: true,
		columns: [
			{
				field: "periode",
				label: "Periode",
				type: "string"
			},
			{
				field: "kanca",
				label: "Kanca",
				type: "string"
			},
			{
				field: "curr",
				label: "Curr",
				type: "string"
			},
			{
				field: "cifno",
				label: "CIF No",
				type: "string"
			},
			{
				field: "account_number",
				label: "Account Number",
				type: "string"
			},
			{
				field: "short_name",
				label: "Short Name",
				type: "string"
			},
			{
				field: "balance",
				label: "Balance",
				type: "decimal"
			},
			{
				field: "pn_rm_dana",
				label: "PN RM Dana",
				type: "string"
			},
			{
				field: "pn_rm_pinjaman",
				label: "PN RM Pinjaman",
				type: "string"
			},
			{
				field: "pn_rm_merchant",
				label: "PN RM Merchant",
				type: "string"
			},
			{
				field: "pn_relationship_officer",
				label: "PN Relationship Officer",
				type: "string"
			}
		]
	},
	{
		slug: "depo_data1",
		table: "data_depo_data1",
		label: "DATA1",
		group: "DEPO",
		hidden: false,
		readonly: false,
		csvUpload: false,
		noAdd: true,
		columns: [
			{
				field: "periode",
				label: "Periode",
				type: "string"
			},
			{
				field: "kode_uker",
				label: "Kode Uker",
				type: "string"
			},
			{
				field: "cur_code",
				label: "Cur Code",
				type: "string"
			},
			{
				field: "cur_desc",
				label: "Cur Desc",
				type: "string"
			},
			{
				field: "type",
				label: "Type",
				type: "string"
			},
			{
				field: "acctno",
				label: "Acctno",
				type: "string"
			},
			{
				field: "fdr_srl_no",
				label: "FDR Srl No",
				type: "string"
			},
			{
				field: "principal_amount",
				label: "Principal Amount",
				type: "decimal"
			},
			{
				field: "short_name",
				label: "Short Name",
				type: "string"
			},
			{
				field: "withdrawable_int",
				label: "Withdrawable Int",
				type: "decimal"
			},
			{
				field: "issue_dt",
				label: "Issue Dt",
				type: "string"
			},
			{
				field: "mat_dt",
				label: "Mat Dt",
				type: "string"
			},
			{
				field: "int_rate",
				label: "Int Rate",
				type: "decimal"
			},
			{
				field: "int_tenor_disp",
				label: "Int Tenor Disp",
				type: "string"
			},
			{
				field: "renew",
				label: "Renew",
				type: "string"
			},
			{
				field: "remark",
				label: "Remark",
				type: "string"
			},
			{
				field: "pn_customer_service",
				label: "PN Customer Service",
				type: "string"
			},
			{
				field: "pn_rm_dana",
				label: "PN RM Dana",
				type: "string"
			},
			{
				field: "pn_rm_pinjaman",
				label: "PN RM Pinjaman",
				type: "string"
			},
			{
				field: "pn_rm_merchant",
				label: "PN RM Merchant",
				type: "string"
			},
			{
				field: "pn_relationship_officer",
				label: "PN Relationship Officer",
				type: "string"
			},
			{
				field: "pn_sales_person",
				label: "PN Sales Person",
				type: "string"
			},
			{
				field: "pn_pab",
				label: "PN PAB",
				type: "string"
			},
			{
				field: "pn_rm_referral",
				label: "PN RM Referral",
				type: "string"
			},
			{
				field: "jumlah_pn",
				label: "Jumlah PN",
				type: "decimal"
			},
			{
				field: "cbal_base",
				label: "CBAL Base",
				type: "decimal"
			}
		]
	},
	{
		slug: "depo_data2",
		table: "data_depo_data2",
		label: "DATA2",
		group: "DEPO",
		hidden: false,
		readonly: false,
		csvUpload: false,
		noAdd: true,
		columns: [
			{
				field: "periode",
				label: "Periode",
				type: "string"
			},
			{
				field: "kode_uker",
				label: "Kode Uker",
				type: "string"
			},
			{
				field: "cur_code",
				label: "Cur Code",
				type: "string"
			},
			{
				field: "cur_desc",
				label: "Cur Desc",
				type: "string"
			},
			{
				field: "type",
				label: "Type",
				type: "string"
			},
			{
				field: "acctno",
				label: "Acctno",
				type: "string"
			},
			{
				field: "fdr_srl_no",
				label: "FDR Srl No",
				type: "string"
			},
			{
				field: "principal_amount",
				label: "Principal Amount",
				type: "decimal"
			},
			{
				field: "short_name",
				label: "Short Name",
				type: "string"
			},
			{
				field: "withdrawable_int",
				label: "Withdrawable Int",
				type: "decimal"
			},
			{
				field: "issue_dt",
				label: "Issue Dt",
				type: "string"
			},
			{
				field: "mat_dt",
				label: "Mat Dt",
				type: "string"
			},
			{
				field: "int_rate",
				label: "Int Rate",
				type: "decimal"
			},
			{
				field: "int_tenor_disp",
				label: "Int Tenor Disp",
				type: "string"
			},
			{
				field: "renew",
				label: "Renew",
				type: "string"
			},
			{
				field: "remark",
				label: "Remark",
				type: "string"
			},
			{
				field: "pn_customer_service",
				label: "PN Customer Service",
				type: "string"
			},
			{
				field: "pn_rm_dana",
				label: "PN RM Dana",
				type: "string"
			},
			{
				field: "pn_rm_pinjaman",
				label: "PN RM Pinjaman",
				type: "string"
			},
			{
				field: "pn_rm_merchant",
				label: "PN RM Merchant",
				type: "string"
			},
			{
				field: "pn_relationship_officer",
				label: "PN Relationship Officer",
				type: "string"
			},
			{
				field: "pn_sales_person",
				label: "PN Sales Person",
				type: "string"
			},
			{
				field: "pn_pab",
				label: "PN PAB",
				type: "string"
			},
			{
				field: "pn_rm_referral",
				label: "PN RM Referral",
				type: "string"
			},
			{
				field: "jumlah_pn",
				label: "Jumlah PN",
				type: "decimal"
			},
			{
				field: "cbal_base",
				label: "CBAL Base",
				type: "decimal"
			}
		]
	},
	{
		slug: "depo_data3",
		table: "data_depo_data3",
		label: "DATA3",
		group: "DEPO",
		hidden: false,
		readonly: false,
		csvUpload: false,
		noAdd: true,
		columns: [
			{
				field: "periode",
				label: "Periode",
				type: "string"
			},
			{
				field: "kode_uker",
				label: "Kode Uker",
				type: "string"
			},
			{
				field: "cur_code",
				label: "Cur Code",
				type: "string"
			},
			{
				field: "cur_desc",
				label: "Cur Desc",
				type: "string"
			},
			{
				field: "type",
				label: "Type",
				type: "string"
			},
			{
				field: "acctno",
				label: "Acctno",
				type: "string"
			},
			{
				field: "fdr_srl_no",
				label: "FDR Srl No",
				type: "string"
			},
			{
				field: "principal_amount",
				label: "Principal Amount",
				type: "decimal"
			},
			{
				field: "short_name",
				label: "Short Name",
				type: "string"
			},
			{
				field: "withdrawable_int",
				label: "Withdrawable Int",
				type: "decimal"
			},
			{
				field: "issue_dt",
				label: "Issue Dt",
				type: "string"
			},
			{
				field: "mat_dt",
				label: "Mat Dt",
				type: "string"
			},
			{
				field: "int_rate",
				label: "Int Rate",
				type: "decimal"
			},
			{
				field: "int_tenor_disp",
				label: "Int Tenor Disp",
				type: "string"
			},
			{
				field: "renew",
				label: "Renew",
				type: "string"
			},
			{
				field: "remark",
				label: "Remark",
				type: "string"
			},
			{
				field: "pn_customer_service",
				label: "PN Customer Service",
				type: "string"
			},
			{
				field: "pn_rm_dana",
				label: "PN RM Dana",
				type: "string"
			},
			{
				field: "pn_rm_pinjaman",
				label: "PN RM Pinjaman",
				type: "string"
			},
			{
				field: "pn_rm_merchant",
				label: "PN RM Merchant",
				type: "string"
			},
			{
				field: "pn_relationship_officer",
				label: "PN Relationship Officer",
				type: "string"
			},
			{
				field: "pn_sales_person",
				label: "PN Sales Person",
				type: "string"
			},
			{
				field: "pn_pab",
				label: "PN PAB",
				type: "string"
			},
			{
				field: "pn_rm_referral",
				label: "PN RM Referral",
				type: "string"
			},
			{
				field: "jumlah_pn",
				label: "Jumlah PN",
				type: "decimal"
			},
			{
				field: "cbal_base",
				label: "CBAL Base",
				type: "decimal"
			}
		]
	},
	{
		slug: "pic_jalan",
		table: "data_pic_jalan",
		label: "PIC JALAN",
		group: null,
		hidden: false,
		readonly: false,
		csvUpload: false,
		columns: [
			{
				field: "no_urut",
				label: "No Urut",
				type: "int"
			},
			{
				field: "unit_kerja",
				label: "Unit Kerja",
				type: "string"
			},
			{
				field: "nama_rmft",
				label: "Nama RMFT",
				type: "string"
			},
			{
				field: "nama_jalan",
				label: "Nama Jalan",
				type: "string"
			},
			{
				field: "nama_toko",
				label: "Nama Toko",
				type: "string"
			},
			{
				field: "usaha",
				label: "Usaha",
				type: "string"
			},
			{
				field: "rek_bri",
				label: "Rek BRI",
				type: "string"
			},
			{
				field: "edc_bri",
				label: "EDC BRI",
				type: "string"
			},
			{
				field: "qris_bri",
				label: "QRIS BRI",
				type: "string"
			},
			{
				field: "rek_lain",
				label: "Rek Lain",
				type: "string"
			},
			{
				field: "edc_lain",
				label: "EDC Lain",
				type: "string"
			},
			{
				field: "qris_lain",
				label: "QRIS Lain",
				type: "string"
			},
			{
				field: "telpon",
				label: "Telpon",
				type: "string"
			},
			{
				field: "owner",
				label: "Owner",
				type: "string"
			},
			{
				field: "keterangan",
				label: "Keterangan",
				type: "string"
			},
			{
				field: "follow_up_terakhir",
				label: "Follow Up Terakhir",
				type: "date"
			}
		]
	},
	{
		slug: "produktivitas_rmft",
		table: "data_produktivitas_rmft",
		label: "PRODUKTIVITAS RMFT",
		group: null,
		hidden: false,
		readonly: false,
		csvUpload: false,
		columns: [
			{
				field: "rm",
				label: "RM",
				type: "string"
			},
			{
				field: "dpk",
				label: "DPK",
				type: "string"
			},
			{
				field: "tgl1",
				label: "tgl 1",
				type: "decimal"
			},
			{
				field: "tgl2",
				label: "tgl 2",
				type: "decimal"
			},
			{
				field: "tgl3",
				label: "tgl 3",
				type: "decimal"
			}
		]
	},
	{
		slug: "pivot_multi",
		table: "data_pivot_multi",
		label: "PIVOT MULTI",
		group: null,
		hidden: false,
		readonly: false,
		csvUpload: true,
		noAdd: true,
		columns: [
			{
				field: "seq",
				label: "Seq",
				type: "int"
			},
			{
				field: "no_rek",
				label: "No Rek",
				type: "string"
			},
			{
				field: "nama",
				label: "Nama",
				type: "string"
			},
			{
				field: "valuta",
				label: "Valuta",
				type: "string"
			},
			{
				field: "jenis_rekening",
				label: "Jenis Rekening",
				type: "string"
			},
			{
				field: "tanggal_transaksi",
				label: "Tanggal Transaksi",
				type: "date"
			},
			{
				field: "jam_transaksi",
				label: "Jam Transaksi",
				type: "string"
			},
			{
				field: "kode_transaksi",
				label: "Kode Transaksi",
				type: "string"
			},
			{
				field: "desk_transaksi",
				label: "Desk Transaksi",
				type: "string"
			},
			{
				field: "saldo_awal_mutasi",
				label: "Saldo Awal Mutasi",
				type: "decimal"
			},
			{
				field: "mutasi_debet",
				label: "Mutasi Debet",
				type: "decimal"
			},
			{
				field: "mutasi_kredit",
				label: "Mutasi Kredit",
				type: "decimal"
			},
			{
				field: "saldo_akhir_mutasi",
				label: "Saldo Akhir Mutasi",
				type: "decimal"
			},
			{
				field: "truser",
				label: "TR User",
				type: "string"
			},
			{
				field: "glsign",
				label: "GL Sign",
				type: "string"
			},
			{
				field: "auxtrc",
				label: "Auxtrc",
				type: "string"
			},
			{
				field: "uker_tran",
				label: "Uker Tran",
				type: "string"
			},
			{
				field: "uker_desc_tran",
				label: "Uker Desc Tran",
				type: "string"
			}
		]
	},
	{
		slug: "mtd_tab",
		table: "data_mtd_tab",
		label: "MTD TAB",
		group: "MTD YTD",
		hidden: false,
		readonly: true,
		csvUpload: false,
		columns: [
			{
				field: "periode",
				label: "Periode",
				type: "string"
			},
			{
				field: "kode_kanwil",
				label: "Kode Kanwil",
				type: "string"
			},
			{
				field: "kanwil",
				label: "Kanwil",
				type: "string"
			},
			{
				field: "kode_kanca",
				label: "Kode Kanca",
				type: "string"
			},
			{
				field: "kanca",
				label: "Kanca",
				type: "string"
			},
			{
				field: "kode_uker",
				label: "Kode Uker",
				type: "string"
			},
			{
				field: "uker",
				label: "Uker",
				type: "string"
			},
			{
				field: "curr",
				label: "Curr",
				type: "string"
			},
			{
				field: "currdesc",
				label: "Curr Desc",
				type: "string"
			},
			{
				field: "cifno",
				label: "CIF No",
				type: "string"
			},
			{
				field: "account_number",
				label: "Account Number",
				type: "bigint"
			},
			{
				field: "product_code",
				label: "Product Code",
				type: "string"
			},
			{
				field: "status",
				label: "Status",
				type: "int"
			},
			{
				field: "short_name",
				label: "Short Name",
				type: "string"
			},
			{
				field: "open_date",
				label: "Open Date",
				type: "date"
			},
			{
				field: "balance",
				label: "Balance",
				type: "decimal"
			},
			{
				field: "avail_balance",
				label: "Avail Balance",
				type: "decimal"
			},
			{
				field: "limit_amount",
				label: "Limit Amount",
				type: "decimal"
			},
			{
				field: "cr_int",
				label: "Cr Int",
				type: "decimal"
			},
			{
				field: "dr_int",
				label: "Dr Int",
				type: "decimal"
			},
			{
				field: "commitment",
				label: "Commitment",
				type: "decimal"
			},
			{
				field: "avrg_balance",
				label: "Avrg Balance",
				type: "decimal"
			},
			{
				field: "pn_pengelola_single_pn",
				label: "PN Pengelola Single PN",
				type: "string"
			},
			{
				field: "pn_customer_service",
				label: "PN Customer Service",
				type: "string"
			},
			{
				field: "pn_rm_dana",
				label: "PN RM Dana",
				type: "string"
			},
			{
				field: "pn_rm_pinjaman",
				label: "PN RM Pinjaman",
				type: "string"
			},
			{
				field: "pn_rm_merchant",
				label: "PN RM Merchant",
				type: "string"
			},
			{
				field: "pn_relationship_officer",
				label: "PN Relationship Officer",
				type: "string"
			},
			{
				field: "pn_sales_person",
				label: "PN Sales Person",
				type: "string"
			},
			{
				field: "pn_pab",
				label: "PN PAB",
				type: "string"
			},
			{
				field: "pn_rm_referral",
				label: "PN RM Referral",
				type: "string"
			}
		]
	},
	{
		slug: "ytd_tab",
		table: "data_ytd_tab",
		label: "YTD TAB",
		group: "MTD YTD",
		hidden: false,
		readonly: true,
		csvUpload: false,
		columns: [
			{
				field: "periode",
				label: "Periode",
				type: "string"
			},
			{
				field: "kode_kanwil",
				label: "Kode Kanwil",
				type: "string"
			},
			{
				field: "kanwil",
				label: "Kanwil",
				type: "string"
			},
			{
				field: "kode_kanca",
				label: "Kode Kanca",
				type: "string"
			},
			{
				field: "kanca",
				label: "Kanca",
				type: "string"
			},
			{
				field: "kode_uker",
				label: "Kode Uker",
				type: "string"
			},
			{
				field: "uker",
				label: "Uker",
				type: "string"
			},
			{
				field: "curr",
				label: "Curr",
				type: "string"
			},
			{
				field: "currdesc",
				label: "Curr Desc",
				type: "string"
			},
			{
				field: "cifno",
				label: "CIF No",
				type: "string"
			},
			{
				field: "account_number",
				label: "Account Number",
				type: "bigint"
			},
			{
				field: "product_code",
				label: "Product Code",
				type: "string"
			},
			{
				field: "status",
				label: "Status",
				type: "int"
			},
			{
				field: "short_name",
				label: "Short Name",
				type: "string"
			},
			{
				field: "open_date",
				label: "Open Date",
				type: "date"
			},
			{
				field: "balance",
				label: "Balance",
				type: "decimal"
			},
			{
				field: "avail_balance",
				label: "Avail Balance",
				type: "decimal"
			},
			{
				field: "limit_amount",
				label: "Limit Amount",
				type: "decimal"
			},
			{
				field: "cr_int",
				label: "Cr Int",
				type: "decimal"
			},
			{
				field: "dr_int",
				label: "Dr Int",
				type: "decimal"
			},
			{
				field: "commitment",
				label: "Commitment",
				type: "decimal"
			},
			{
				field: "avrg_balance",
				label: "Avrg Balance",
				type: "decimal"
			},
			{
				field: "pn_pengelola_single_pn",
				label: "PN Pengelola Single PN",
				type: "string"
			},
			{
				field: "pn_customer_service",
				label: "PN Customer Service",
				type: "string"
			},
			{
				field: "pn_rm_dana",
				label: "PN RM Dana",
				type: "string"
			},
			{
				field: "pn_rm_pinjaman",
				label: "PN RM Pinjaman",
				type: "string"
			},
			{
				field: "pn_rm_merchant",
				label: "PN RM Merchant",
				type: "string"
			},
			{
				field: "pn_relationship_officer",
				label: "PN Relationship Officer",
				type: "string"
			},
			{
				field: "pn_sales_person",
				label: "PN Sales Person",
				type: "string"
			},
			{
				field: "pn_pab",
				label: "PN PAB",
				type: "string"
			},
			{
				field: "pn_rm_referral",
				label: "PN RM Referral",
				type: "string"
			}
		]
	},
	{
		slug: "mtd_giro",
		table: "data_mtd_giro",
		label: "MTD GIRO",
		group: "MTD YTD",
		hidden: false,
		readonly: true,
		csvUpload: false,
		columns: [
			{
				field: "periode",
				label: "Periode",
				type: "string"
			},
			{
				field: "kode_kanwil",
				label: "Kode Kanwil",
				type: "string"
			},
			{
				field: "kanwil",
				label: "Kanwil",
				type: "string"
			},
			{
				field: "kode_kanca",
				label: "Kode Kanca",
				type: "string"
			},
			{
				field: "kanca",
				label: "Kanca",
				type: "string"
			},
			{
				field: "kode_uker",
				label: "Kode Uker",
				type: "string"
			},
			{
				field: "uker",
				label: "Uker",
				type: "string"
			},
			{
				field: "curr",
				label: "Curr",
				type: "string"
			},
			{
				field: "currdesc",
				label: "Curr Desc",
				type: "string"
			},
			{
				field: "cifno",
				label: "CIF No",
				type: "string"
			},
			{
				field: "account_number",
				label: "Account Number",
				type: "bigint"
			},
			{
				field: "product_code",
				label: "Product Code",
				type: "string"
			},
			{
				field: "status",
				label: "Status",
				type: "int"
			},
			{
				field: "short_name",
				label: "Short Name",
				type: "string"
			},
			{
				field: "open_date",
				label: "Open Date",
				type: "date"
			},
			{
				field: "balance",
				label: "Balance",
				type: "decimal"
			},
			{
				field: "avail_balance",
				label: "Avail Balance",
				type: "decimal"
			},
			{
				field: "limit_amount",
				label: "Limit Amount",
				type: "decimal"
			},
			{
				field: "cr_int",
				label: "Cr Int",
				type: "decimal"
			},
			{
				field: "dr_int",
				label: "Dr Int",
				type: "decimal"
			},
			{
				field: "commitment",
				label: "Commitment",
				type: "decimal"
			},
			{
				field: "avrg_balance",
				label: "Avrg Balance",
				type: "decimal"
			},
			{
				field: "pn_pengelola_single_pn",
				label: "PN Pengelola Single PN",
				type: "string"
			},
			{
				field: "pn_customer_service",
				label: "PN Customer Service",
				type: "string"
			},
			{
				field: "pn_rm_dana",
				label: "PN RM Dana",
				type: "string"
			},
			{
				field: "pn_rm_pinjaman",
				label: "PN RM Pinjaman",
				type: "string"
			},
			{
				field: "pn_rm_merchant",
				label: "PN RM Merchant",
				type: "string"
			},
			{
				field: "pn_relationship_officer",
				label: "PN Relationship Officer",
				type: "string"
			},
			{
				field: "pn_sales_person",
				label: "PN Sales Person",
				type: "string"
			},
			{
				field: "pn_pab",
				label: "PN PAB",
				type: "string"
			},
			{
				field: "pn_rm_referral",
				label: "PN RM Referral",
				type: "string"
			}
		]
	},
	{
		slug: "ytd_giro",
		table: "data_ytd_giro",
		label: "YTD GIRO",
		group: "MTD YTD",
		hidden: false,
		readonly: true,
		csvUpload: false,
		columns: [
			{
				field: "periode",
				label: "Periode",
				type: "string"
			},
			{
				field: "kode_kanwil",
				label: "Kode Kanwil",
				type: "string"
			},
			{
				field: "kanwil",
				label: "Kanwil",
				type: "string"
			},
			{
				field: "kode_kanca",
				label: "Kode Kanca",
				type: "string"
			},
			{
				field: "kanca",
				label: "Kanca",
				type: "string"
			},
			{
				field: "kode_uker",
				label: "Kode Uker",
				type: "string"
			},
			{
				field: "uker",
				label: "Uker",
				type: "string"
			},
			{
				field: "curr",
				label: "Curr",
				type: "string"
			},
			{
				field: "currdesc",
				label: "Curr Desc",
				type: "string"
			},
			{
				field: "cifno",
				label: "CIF No",
				type: "string"
			},
			{
				field: "account_number",
				label: "Account Number",
				type: "bigint"
			},
			{
				field: "product_code",
				label: "Product Code",
				type: "string"
			},
			{
				field: "status",
				label: "Status",
				type: "int"
			},
			{
				field: "short_name",
				label: "Short Name",
				type: "string"
			},
			{
				field: "open_date",
				label: "Open Date",
				type: "date"
			},
			{
				field: "balance",
				label: "Balance",
				type: "decimal"
			},
			{
				field: "avail_balance",
				label: "Avail Balance",
				type: "decimal"
			},
			{
				field: "limit_amount",
				label: "Limit Amount",
				type: "decimal"
			},
			{
				field: "cr_int",
				label: "Cr Int",
				type: "decimal"
			},
			{
				field: "dr_int",
				label: "Dr Int",
				type: "decimal"
			},
			{
				field: "commitment",
				label: "Commitment",
				type: "decimal"
			},
			{
				field: "avrg_balance",
				label: "Avrg Balance",
				type: "decimal"
			},
			{
				field: "pn_pengelola_single_pn",
				label: "PN Pengelola Single PN",
				type: "string"
			},
			{
				field: "pn_customer_service",
				label: "PN Customer Service",
				type: "string"
			},
			{
				field: "pn_rm_dana",
				label: "PN RM Dana",
				type: "string"
			},
			{
				field: "pn_rm_pinjaman",
				label: "PN RM Pinjaman",
				type: "string"
			},
			{
				field: "pn_rm_merchant",
				label: "PN RM Merchant",
				type: "string"
			},
			{
				field: "pn_relationship_officer",
				label: "PN Relationship Officer",
				type: "string"
			},
			{
				field: "pn_sales_person",
				label: "PN Sales Person",
				type: "string"
			},
			{
				field: "pn_pab",
				label: "PN PAB",
				type: "string"
			},
			{
				field: "pn_rm_referral",
				label: "PN RM Referral",
				type: "string"
			}
		]
	},
	{
		slug: "mtd_tab_penurunan",
		table: "data_mtd_tab_penurunan",
		label: "Penurunan",
		group: null,
		hidden: true,
		readonly: true,
		csvUpload: false,
		columns: [
			{
				field: "norek",
				label: "Norek",
				type: "string"
			},
			{
				field: "nama_nasabah",
				label: "Nama Nasabah",
				type: "string"
			},
			{
				field: "tgl1",
				label: "tgl 1",
				type: "decimal"
			},
			{
				field: "tgl2",
				label: "tgl 2",
				type: "decimal"
			},
			{
				field: "rm_pengelola",
				label: "RM Pengelola",
				type: "string"
			}
		]
	},
	{
		slug: "mtd_tab_kenaikan",
		table: "data_mtd_tab_kenaikan",
		label: "Kenaikan",
		group: null,
		hidden: true,
		readonly: true,
		csvUpload: false,
		columns: [
			{
				field: "norek",
				label: "Norek",
				type: "string"
			},
			{
				field: "nama_nasabah",
				label: "Nama Nasabah",
				type: "string"
			},
			{
				field: "tgl1",
				label: "tgl 1",
				type: "decimal"
			},
			{
				field: "tgl2",
				label: "tgl 2",
				type: "decimal"
			},
			{
				field: "rm_pengelola",
				label: "RM Pengelola",
				type: "string"
			}
		]
	},
	{
		slug: "ytd_tab_penurunan",
		table: "data_ytd_tab_penurunan",
		label: "Penurunan",
		group: null,
		hidden: true,
		readonly: true,
		csvUpload: false,
		columns: [
			{
				field: "norek",
				label: "Norek",
				type: "string"
			},
			{
				field: "nama_nasabah",
				label: "Nama Nasabah",
				type: "string"
			},
			{
				field: "tgl1",
				label: "tgl 1",
				type: "decimal"
			},
			{
				field: "tgl2",
				label: "tgl 2",
				type: "decimal"
			},
			{
				field: "rm_pengelola",
				label: "RM Pengelola",
				type: "string"
			}
		]
	},
	{
		slug: "ytd_tab_kenaikan",
		table: "data_ytd_tab_kenaikan",
		label: "Kenaikan",
		group: null,
		hidden: true,
		readonly: true,
		csvUpload: false,
		columns: [
			{
				field: "norek",
				label: "Norek",
				type: "string"
			},
			{
				field: "nama_nasabah",
				label: "Nama Nasabah",
				type: "string"
			},
			{
				field: "tgl1",
				label: "tgl 1",
				type: "decimal"
			},
			{
				field: "tgl2",
				label: "tgl 2",
				type: "decimal"
			},
			{
				field: "rm_pengelola",
				label: "RM Pengelola",
				type: "string"
			}
		]
	},
	{
		slug: "mtd_giro_penurunan",
		table: "data_mtd_giro_penurunan",
		label: "Penurunan",
		group: null,
		hidden: true,
		readonly: true,
		csvUpload: false,
		columns: [
			{
				field: "norek",
				label: "Norek",
				type: "string"
			},
			{
				field: "nama_nasabah",
				label: "Nama Nasabah",
				type: "string"
			},
			{
				field: "tgl1",
				label: "tgl 1",
				type: "decimal"
			},
			{
				field: "tgl2",
				label: "tgl 2",
				type: "decimal"
			},
			{
				field: "rm_pengelola",
				label: "RM Pengelola",
				type: "string"
			}
		]
	},
	{
		slug: "mtd_giro_kenaikan",
		table: "data_mtd_giro_kenaikan",
		label: "Kenaikan",
		group: null,
		hidden: true,
		readonly: true,
		csvUpload: false,
		columns: [
			{
				field: "norek",
				label: "Norek",
				type: "string"
			},
			{
				field: "nama_nasabah",
				label: "Nama Nasabah",
				type: "string"
			},
			{
				field: "tgl1",
				label: "tgl 1",
				type: "decimal"
			},
			{
				field: "tgl2",
				label: "tgl 2",
				type: "decimal"
			},
			{
				field: "rm_pengelola",
				label: "RM Pengelola",
				type: "string"
			}
		]
	},
	{
		slug: "ytd_giro_penurunan",
		table: "data_ytd_giro_penurunan",
		label: "Penurunan",
		group: null,
		hidden: true,
		readonly: true,
		csvUpload: false,
		columns: [
			{
				field: "norek",
				label: "Norek",
				type: "string"
			},
			{
				field: "nama_nasabah",
				label: "Nama Nasabah",
				type: "string"
			},
			{
				field: "tgl1",
				label: "tgl 1",
				type: "decimal"
			},
			{
				field: "tgl2",
				label: "tgl 2",
				type: "decimal"
			},
			{
				field: "rm_pengelola",
				label: "RM Pengelola",
				type: "string"
			}
		]
	},
	{
		slug: "ytd_giro_kenaikan",
		table: "data_ytd_giro_kenaikan",
		label: "Kenaikan",
		group: null,
		hidden: true,
		readonly: true,
		csvUpload: false,
		columns: [
			{
				field: "norek",
				label: "Norek",
				type: "string"
			},
			{
				field: "nama_nasabah",
				label: "Nama Nasabah",
				type: "string"
			},
			{
				field: "tgl1",
				label: "tgl 1",
				type: "decimal"
			},
			{
				field: "tgl2",
				label: "tgl 2",
				type: "decimal"
			},
			{
				field: "rm_pengelola",
				label: "RM Pengelola",
				type: "string"
			}
		]
	}
];
var CATEGORY_BY_SLUG = new Map(DATA_CATEGORIES.map((c) => [c.slug, c]));
/** Kategori yang tampil di sidebar (tidak hidden). */
var VISIBLE_CATEGORIES = DATA_CATEGORIES.filter((c) => !c.hidden);
var FLAT = [
	{
		label: "Dashboard",
		to: "/",
		icon: LayoutGrid
	},
	{
		label: "Links",
		to: "/links",
		icon: Link$1
	},
	...VISIBLE_CATEGORIES.filter((c) => !c.group).map((c) => ({
		label: c.label,
		to: "/data/$slug",
		slug: c.slug,
		icon: LayoutGrid
	}))
];
var GROUPED = Array.from(VISIBLE_CATEGORIES.filter((c) => c.group).reduce((map, c) => {
	const list = map.get(c.group) ?? [];
	list.push({
		label: c.label,
		to: "/data/$slug",
		slug: c.slug
	});
	map.set(c.group, list);
	return map;
}, /* @__PURE__ */ new Map())).map(([label, items]) => ({
	label,
	items
}));
var VIEWER_DIRECT = {
	DI319: "di319_data3",
	DI321: "di321_data3"
};
var SYSTEM = [
	{
		label: "Users",
		to: "/users",
		icon: Users
	},
	{
		label: "Activity Logs",
		to: "/logs",
		icon: ScrollText
	},
	{
		label: "Settings",
		to: "/settings",
		icon: Settings
	},
	{
		label: "Compare Data",
		to: "/compare-data",
		icon: GitCompare
	}
];
function NavLink({ item, active, sub }) {
	const Icon = item.icon;
	const className = cn("flex items-center gap-2.5 rounded-md px-3 py-2 text-sm transition-colors", sub ? "pl-9 text-sidebar-foreground/70" : "text-sidebar-foreground/85", active ? "bg-sidebar-accent font-medium text-sidebar-accent-foreground" : "hover:bg-sidebar-accent/60 hover:text-sidebar-accent-foreground");
	if (item.slug) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
		to: "/data/$slug",
		params: { slug: item.slug },
		className,
		children: [Icon && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "size-4 shrink-0" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "truncate",
			children: item.label
		})]
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
		to: item.to,
		className,
		children: [Icon && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "size-4 shrink-0" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "truncate",
			children: item.label
		})]
	});
}
function AppLayout({ children }) {
	const { user, loading, signOut } = useAuth();
	const { isAdmin } = useRole();
	const navigate = useNavigate();
	const location = useRouterState({ select: (s) => s.location });
	const [open, setOpen] = (0, import_react.useState)(false);
	const [collapsed, setCollapsed] = (0, import_react.useState)({});
	(0, import_react.useEffect)(() => {
		if (!loading && !user) navigate({ to: "/login" });
	}, [
		loading,
		user,
		navigate
	]);
	(0, import_react.useEffect)(() => setOpen(false), [location.pathname]);
	(0, import_react.useEffect)(() => {
		if (!user) return;
		const name = user.user_metadata?.["nama"] || user.email?.split("@")[0] || "user";
		logVisitOnce(name, location.pathname);
	}, [user, location.pathname]);
	if (loading || !user) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex min-h-screen items-center justify-center text-sm text-muted-foreground",
		children: "Memuat…"
	});
	const currentSlug = location.pathname.startsWith("/data/") ? decodeURIComponent(location.pathname.split("/")[2] ?? "") : "";
	const isActive = (item) => item.slug ? currentSlug === item.slug : location.pathname === item.to;
	const displayName = user.user_metadata?.["nama"] || user.email?.split("@")[0] || "User";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-screen bg-background",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
				className: cn("fixed inset-y-0 left-0 z-40 flex w-64 flex-col bg-sidebar text-sidebar-foreground transition-transform lg:translate-x-0", open ? "translate-x-0" : "-translate-x-full"),
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-2 border-b border-sidebar-border px-5 py-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Database, { className: "size-5 text-sidebar-primary" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-base font-bold tracking-tight",
							children: "FT Teluk Betung"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("nav", {
						className: "flex-1 space-y-1 overflow-y-auto px-3 py-4",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "px-3 pb-1 text-[11px] font-semibold uppercase tracking-widest text-sidebar-foreground/50",
								children: "Data Categories"
							}),
							FLAT.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(NavLink, {
								item,
								active: isActive(item)
							}, item.label)),
							GROUPED.map((group) => {
								const direct = VIEWER_DIRECT[group.label];
								if (!isAdmin && direct) {
									if (!group.items.find((i) => i.slug === direct)) return null;
									const item = {
										label: group.label,
										to: "/data/$slug",
										slug: direct,
										icon: LayoutGrid
									};
									return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(NavLink, {
										item,
										active: isActive(item)
									}, group.label);
								}
								const isOpen = !collapsed[group.label];
								return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
									type: "button",
									onClick: () => setCollapsed((c) => ({
										...c,
										[group.label]: !c[group.label]
									})),
									className: "flex w-full items-center gap-2.5 rounded-md px-3 py-2 text-sm text-sidebar-foreground/85 transition-colors hover:bg-sidebar-accent/60",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronDown, { className: cn("size-4 transition-transform", !isOpen && "-rotate-90") }), group.label]
								}), isOpen && group.items.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(NavLink, {
									item,
									active: isActive(item),
									sub: true
								}, item.slug))] }, group.label);
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "px-3 pb-1 pt-4 text-[11px] font-semibold uppercase tracking-widest text-sidebar-foreground/50",
								children: "System"
							}),
							SYSTEM.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(NavLink, {
								item,
								active: isActive(item)
							}, item.to))
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center justify-between gap-2 border-t border-sidebar-border px-5 py-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "min-w-0",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "truncate text-sm font-semibold",
								children: displayName
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "truncate text-xs text-sidebar-foreground/60",
								children: user.email
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							"aria-label": "Keluar",
							className: "rounded-md p-2 text-sidebar-foreground/70 transition-colors hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
							onClick: async () => {
								await signOut();
								navigate({ to: "/login" });
							},
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LogOut, { className: "size-4" })
						})]
					})
				]
			}),
			open && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "fixed inset-0 z-30 bg-foreground/40 lg:hidden",
				onClick: () => setOpen(false)
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "lg:pl-64",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-3 border-b bg-card px-4 py-3 lg:hidden",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						"aria-label": "Menu",
						onClick: () => setOpen(true),
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Menu, { className: "size-5" })
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "font-semibold",
						children: "FT Teluk Betung"
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", {
					className: "px-4 py-6 lg:px-6",
					children
				})]
			})
		]
	});
}
//#endregion
export { CATEGORY_BY_SLUG as n, useRole as r, AppLayout as t };
