// 1. Definisi Jenis Cuti dan Kuota Maksimum (sebagai konstanta statis)
const MAX_KUOTA = {
    'Tahunan': 12, 
    'Sakit': 2,    
    'Melahirkan': 90 
};

// 2. Class Karyawan
class Karyawan {
    constructor(nama, kuotaAwal = {}) {
        this.nama = nama;
        // Inisialisasi kuota sisa dengan kuota awal atau MAX_KUOTA
        this.kuota = {
            'Tahunan': kuotaAwal.Tahunan || MAX_KUOTA.Tahunan,
            'Sakit': kuotaAwal.Sakit || MAX_KUOTA.Sakit,
            'Melahirkan': kuotaAwal.Melahirkan || MAX_KUOTA.Melahirkan
        };
    }

    /**
     * Metode untuk mengajukan cuti.
     */
    ajukanCuti(jenisCuti, jumlahHari) {
        const sisaKuota = this.kuota[jenisCuti];

        // Validasi Jenis Cuti
        if (!MAX_KUOTA.hasOwnProperty(jenisCuti)) {
            return `Error: Jenis cuti "${jenisCuti}" tidak valid.`;
        }

        // Validasi Kuota
        if (jumlahHari > sisaKuota) {
            return `Kuota anda tidak cukup untuk mengajukan cuti ini. Sisa Kuota ${jenisCuti}: ${sisaKuota} hari.`;
        }

        // Pengajuan Berhasil & Pengurangan Kuota
        this.kuota[jenisCuti] -= jumlahHari;
        return `Pengajuan Cuti ${jenisCuti} selama ${jumlahHari} hari **BERHASIL**. Sisa kuota baru: ${this.kuota[jenisCuti]} hari.`;
    }

    /**
     * Metode untuk menampilkan sisa kuota.
     */
    tampilkanKuota() {
        let output = `Sisa Kuota Cuti untuk **${this.nama}**:\n`;
        for (const [jenis, sisa] of Object.entries(this.kuota)) {
            output += `- Cuti ${jenis}: ${sisa} hari\n`;
        }
        return output;
    }
}

// --- SIMULASI PENGGUNAAN ---

// Inisiasi Karyawan (Jono sudah menggunakan 2 hari Cuti Tahunan)
const jono = new Karyawan('Jono', { Tahunan: 10 });

console.log("--- 🚀 Simulasi Pengajuan Cuti ---");

// Skenario 1: Jono mengajukan Cuti Tahunan (4 hari)
console.log(jono.ajukanCuti('Tahunan', 4));

// Skenario 2: Jono mengajukan lagi, kuota tidak cukup (sisa 6 hari, ajukan 7)
console.log(jono.ajukanCuti('Tahunan', 7));

// Skenario 3: Jono mengajukan Cuti Sakit (1 hari)
console.log(jono.ajukanCuti('Sakit', 1));

console.log("\n--- 📊 Kuota Terbaru ---");
console.log(jono.tampilkanKuota());