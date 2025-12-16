// 1. Definisi Default Kuota Per Role
const DEFAULT_KARYAWAN = { Tahunan: 12, Sakit: 2, Melahirkan: 90 };
const DEFAULT_MANAGER  = { Tahunan: 20, Sakit: 5, Melahirkan: 90 };
const DEFAULT_MAGANG   = { Tahunan: 0,  Sakit: 1, Melahirkan: 0  };

// 2. Class Parent: Karyawan
class Karyawan {
    // Constructor menerima parameter ke-3 'defaultQuota' agar child class bisa kirim angkanya sendiri
    constructor(nama, kuotaAwal = {}, defaultQuota = DEFAULT_KARYAWAN) {
        this.nama = nama;
        
        // Menggunakan logikanya: Jika ada input user pakai itu, jika tidak pakai defaultQuota
        this.kuota = {
            'Tahunan': kuotaAwal.Tahunan !== undefined ? kuotaAwal.Tahunan : defaultQuota.Tahunan,
            'Sakit': kuotaAwal.Sakit !== undefined ? kuotaAwal.Sakit : defaultQuota.Sakit,
            'Melahirkan': kuotaAwal.Melahirkan !== undefined ? kuotaAwal.Melahirkan : defaultQuota.Melahirkan
        };
    }

    ajukanCuti(jenisCuti, jumlahHari) {
        const sisaKuota = this.kuota[jenisCuti];

        // Validasi Jenis Cuti (Cek apakah key ada di object kuota)
        if (sisaKuota === undefined) {
            return `Error: Jenis cuti "${jenisCuti}" tidak valid.`;
        }

        // Validasi Kuota
        if (jumlahHari > sisaKuota) {
            return `[${this.constructor.name}] Gagal: Kuota ${jenisCuti} tidak cukup. Sisa: ${sisaKuota}.`;
        }

        // Pengurangan Kuota
        this.kuota[jenisCuti] -= jumlahHari;
        return `[${this.constructor.name}] Sukses: ${this.nama} cuti ${jenisCuti} ${jumlahHari} hari. Sisa: ${this.kuota[jenisCuti]}.`;
    }

    tampilkanKuota() {
        let output = `Sisa Kuota (${this.constructor.name}) - **${this.nama}**:\n`;
        for (const [jenis, sisa] of Object.entries(this.kuota)) {
            output += `- ${jenis}: ${sisa} hari\n`;
        }
        return output;
    }
}

// 3. Class Manager (Inheritance)
class Manager extends Karyawan {
    constructor(nama, kuotaAwal = {}) {
        // Panggil parent dengan default kuota khusus Manager
        super(nama, kuotaAwal, DEFAULT_MANAGER);
    }
}

// 4. Class Magang (Inheritance)
class Magang extends Karyawan {
    constructor(nama, kuotaAwal = {}) {
        // Panggil parent dengan default kuota khusus Magang
        super(nama, kuotaAwal, DEFAULT_MAGANG);
    }
}

// --- SIMULASI ---

console.log("--- 🏢 Inisialisasi ---");
const budi = new Karyawan('Budi');       // Default Karyawan (12 hari)
const buSari = new Manager('Ibu Sari');  // Default Manager (20 hari)
const dika = new Magang('Dika');         // Default Magang (0 hari tahunan)

console.log("\n--- 🚀 Simulasi Pengajuan ---");

// 1. Karyawan Biasa
console.log(budi.ajukanCuti('Tahunan', 5)); 

// 2. Manager (Punya 20 hari, ambil 15 hari -> Sukses)
console.log(buSari.ajukanCuti('Tahunan', 15)); 

// 3. Magang (Punya 0 hari tahunan -> Gagal)
console.log(dika.ajukanCuti('Tahunan', 1));

// 4. Magang (Punya 1 hari sakit -> Sukses)
console.log(dika.ajukanCuti('Sakit', 1));

console.log("\n--- 📊 Cek Sisa Kuota ---");
console.log(buSari.tampilkanKuota());
console.log(dika.tampilkanKuota());
