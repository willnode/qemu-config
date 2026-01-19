

const MACHINES = {
  // virtualize, fastest, exotic-new
  "q35": "ICH9 PCIe-enabled x86 hardware", // PCI, SCSI
  // compat, exotic-old
  "pc": "PIIX4 PCI-only x86 hardware", // IDE
  // legacy, exotic-old
  "isapc": "ISA MSDOS-era x86 hardware", // ISA
  // virtualize
  "virt": "Virtual",
}

// https://qemu-project.gitlab.io/qemu/system/qemu-cpu-models.html
// qemu-system-i386 -cpu help

const CPUS = {
  // virtualize
  "max": "Max CPU Features",
  "host": "Host (accelerated)",
  "qemu64": "Baseline (64-bit)",
  "qemu32": "Baseline (32-bit)",
  // fastest (x86_64-v4)
  "EPYC": "2017 AMD EPYC",
  "Skylake-Server": "2016 Intel Skylake Server",
  // compat (x86_64-v3)
  "Skylake-Client": "2016 Intel Skylake",
  "Broadwell": "2014 Intel Broadwell",
  //// x86_64-v2
  "IvyBridge": "2012 Intel IvyBridge",
  "Westmere": "2010 Intel Core Gen 1",
  /// x86_64-v1
  "Penryn": "2007 Intel Core 2 Duo",
  "Conroe": "2006 Intel Celeron",
  // legacy
  "pentium3": "Intel Pentium 3", // i686
  "pentium": "Intel Pentium Pro", // i586
  "486": "Intel 80486", // i486
  // exotic-old
  "athlon": "AMD Athlon",
  // exotic-new  
  "GraniteRapids": "2024 Intel XEON P-Core",
  "SierraForest": "2024 Intel XEON E-Core",
  "EPYC-Genoa": "2022 AMD EPYC Genoa",
}

// qemu-system-x86_64 -device \?

const commonDisks = {
  // virtualize
  "virtio-blk": "Virt-IO BLK (basic) disk", // alias to "virtio"
  "virtio-scsi": "Virt-IO SCSI (advanced) disk",
  "virtio-9p": "Virt-IO 9P (bridged) disk",
  "scsi-hd": "virtual SCSI disk",
  "scsi-cd": "virtual SCSI CD-ROM",
  // fastest
  "nvme": "NVME, PCI-based disk",
  "ufs": "UFS, PCI-based usb stick",
  "ahci": "ICH9 AHCI, PCI-based disk",
  // compat
  "ide-hd": "IDE-based disk",
  "ide-cd": "IDE-based CDROM",
  // exotic-old
  "usb": "USB stick",
  "sd-card": "SD Card",
  // exotic-new
  "am53c974": "AMD Am53c974 PCscsi-PCI SCSI",
  "dc390": "Tekram DC-390 SCSI adapter",
  "megasas": "LSI MegaRAID SAS 1078",
}

const x86Disks = {
  // legacy
  "isa-ide": "ISA-based disk",
  "isa-fdc": "ISA-based floppy disk",
  "floppy": "Floppy drive",
  "emmc": "eMMC",
}

const DISKS = { ...commonDisks, ...x86Disks, }

// https://www.reddit.com/r/UTMapp/comments/1fl293h

const commonDisplays = {
  // virtualize
  "virtio-gpu-pci": "Virt-IO GPU PCI",
  // fastest
  "virtio-ramfb": "Virt-IO RAM FB",
  // compat
  "ramfb": "RAM FB",
  // exotic-new
  "bochs-display": "Bosch display",
}

const x86Displays = {
  // fastest
  "virtio-vga": "Virt-IO VGA PCI",
  // compat
  "vga": "Basic VGA",
  // legacy
  "cirrus-vga": "Cirrus CLGD VGA",
  // exotic-old
  "ati-vga": "ATI VGA",
}

const DISPLAYS = { ...commonDisplays, ...x86Displays }

const DISPLAYS_GL = {
  "virtio-gpu-pci": "virtio-gpu-gl-pci",
  "virtio-vga": "virtio-vga-gl-pci",
  "virtio-ramfb": "virtio-ramfb-gl",
}

const NETWORKS = {}

const SOUNDS = {}

const INPUTS = {}

const PRESET_MATRIX = {
  "virtualize": {
    index: 0,
    title: "Virtualize",
    // alt_next stop here
    desc: "Prefer to virtualize devices",
    machine: ["q35", "virt"],
    cpu: ["max", "host", "qemu64", "qemu32"],
    disk: ["virtio-blk", "virtio-scsi", "virtio-9p", "scsi-hd", "scsi-cd"],
    display: ["virtio-gpu-pci"],
  },
  "fastest": {
    index: 1,
    title: "Fastest",
    alt_next: "virtualize",
    desc: "Prefer to emulate the highest end of hardware",
    machine: ["q35"],
    cpu: ["EPYC", "Skylake-Server"],
    disk: ["nvme", "ufs", "ahci"],
    display: ["virtio-vga", "virtio-ramfb"],
  },
  "compat": {
    index: 2,
    title: "Compatibility",
    alt_next: "fastest",
    desc: "Prefer to emulate the widely used hardware",
    machine: ["pc"],
    cpu: ["Skylake-Client", "Broadwell", "IvyBridge", "Westmere", "Penryn", "Conroe"],
    disk: ["ide-hd", "ide-cd"],
    display: ["vga", "ramfb"],
  },
  "legacy": {
    index: 3,
    title: "Legacy",
    alt_next: "compat",
    desc: "Prefer to emulate ancient hardware",
    machine: ["isapc"],
    cpu: ["pentium3", "pentium", "486"],
    disk: ["isa-ide", "isa-fdc", "floppy", "emmc"],
    display: ["cirrus-vga"],
  },
  "exotic-old": {
    index: 4,
    title: "Exotic Old",
    alt_next: "legacy",
    desc: "Prefer to emulate unique old hardware",
    machine: ["pc", "isapc"],
    cpu: ["athlon"],
    disk: ["usb", "sd-card"],
    display: ["ati-vga"],
  },
  "exotic-new": {
    index: 5,
    title: "Exotic New",
    alt_next: "fastest",
    desc: "Prefer to emulate unique new hardware",
    machine: ["q35"],
    cpu: ["GraniteRapids", "SierraForest", "EPYC-Genoa"],
    disk: ["am53c974", "dc390", "megasas"],
    display: ["bochs-display"],
  },
}

const PRESET_LOOKUP = (() => {
  let o = {};
  for (const [k, v] of Object.entries(PRESET_MATRIX)) {
    for (const i of [...v.cpu, ...v.disk]) {
      o[i] = k;
    }
  }
  return o;
})()

const x86Modes = {
  cpu: ["host", "max", "qemu32", "pentium3", "pentium", "486", "athlon"],
  machine: ["q35", "pc", "isapc"],
  disk: Object.keys({ ...commonDisks, ...x86Disks, }),
  display: Object.keys({ ...commonDisplays, ...x86Displays }),
};

const x86_64Modes = {
  cpu: ["host", "max", "qemu64", "EPYC", "Skylake-Server", "Skylake-Client", "Broadwell", "IvyBridge", "Westmere", "Penryn", "Conroe", "GraniteRapids", "SierraForest", "EPYC-Genoa"],
  machine: ["q35", "pc"],
  disk: Object.keys({ ...commonDisks, ...x86Disks, }),
  display: Object.keys({ ...commonDisplays, ...x86Displays }),
};

const armModes = {
  cpu: ["host", "max", "cortex-a15"],
  machine: ["virt", "versatilepb"],
  disk: Object.keys({ ...commonDisks }),
  display: Object.keys({ ...commonDisplays }),
};

const riscvModes = {
  cpu: ["virt"],
  machine: ["virt"],
  disk: Object.keys({ ...commonDisks }),
  display: Object.keys({ ...commonDisplays }),
};

const ARCH_MATRIX = {
  "x86_64": { binary: "qemu-system-x86_64", name: "x86 64-bit", modes: x86_64Modes },
  "i386": { binary: "qemu-system-i386", name: "x86 32-bit", modes: x86Modes },
  "aarch64": { binary: "qemu-system-aarch64", name: "ARM 64-bit", modes: armModes },
  "arm": { binary: "qemu-system-arm", name: "ARM 32-bit", modes: armModes },
  "riscv64": { binary: "qemu-system-riscv64", name: "RISC-V 64-bit", modes: riscvModes },
  "riscv32": { binary: "qemu-system-riscv32", name: "RISC-V 32-bit", modes: riscvModes },
};

const OS_MATRIX = {
  "debian": { name: "Debian/Ubuntu", vga: "virtio", net: "virtio-net-pci" },
  "windows": { name: "Windows", vga: "std", net: "e1000", extra: ["-rtc base=localtime"] },
  "mac": { name: "macOS", vga: "vmware", net: "virtio-net-pci", extra: ["-device isa-applesmc"] }
}
