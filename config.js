

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

const DISPLAYS_OPT = {
  "virtio-gpu-pci": { gl: "virtio-gpu-gl-pci" },
  "virtio-vga": { gl: "virtio-vga-gl-pci" },
  "virtio-ramfb": { gl: "virtio-ramfb-gl" },
}

// https://www.reddit.com/r/UTMapp/comments/1flphnr

const NETWORKS = {
  // virtualize
  "virtio-net-pci": "Virt-IO Net PCI",
  "virtio-net-device": "Virt-IO Net MMIO",
  // fastest
  "igb": "Intel GbE PCI 2.0",
  "e1000e": "Intel GbE PCI 1.1",
  // compat
  "e1000": "Intel GbE PCI",
  "rtl8139": "Realtek 8139",
  "i82550": "Intel 8255x",
  "i82801": "Intel 82801",
  // legacy
  "usb-net": "USB Net",
  "pcnet": "AMD LANCE",
  // exotic-old
  "ne2k-pci": "Novell 2K PCI",
  "ne2k-isa": "Novell 2K ISA",
  // exotic-new
  "rocker": "Rocker Switch",
}

const SOUNDS = {
  "intel-hda": "Intel HD Audio",
  "ac97": "AC97",
  "sb16": "SoundBlaster 16",
  "pcspk": "PC Speaker",
};

const INPUTS = {
  "usb-tablet": "USB Tablet (Absolute)",
  "ps2-mouse": "PS/2 Mouse (Relative)",
  "virtio-tablet": "VirtIO Tablet"
};

const CONTROLLERS = {
  "virtio": "VirtIO (Modern)",
  "ide": "IDE (Legacy)",
  "scsi": "SCSI",
  "sata": "SATA (AHCI)",
  "usb": "USB",
  "nvme": "NVMe"
};

const MEDIA_TYPES = {
  "disk": "Hard Disk Image",
  "cdrom": "CD-ROM (ISO)",
  "floppy": "Floppy Disk"
};

const PRESET_MATRIX = {
  "virtualize": {
    index: 0,
    title: "Virtualize",
    // alt_next stop here
    desc: "Prefer to virtualize devices",
    machine: ["q35", "virt"],
    cpu: ["max", "host", "qemu64", "qemu32"],
    disk: ["virtio-blk", "virtio-scsi", "virtio-9p"],
    media: [],
    display: ["virtio-gpu-pci"],
  },
  "fastest": {
    index: 1,
    title: "Fastest",
    alt_next: "virtualize",
    desc: "Prefer to emulate the highest end of hardware",
    machine: ["q35"],
    cpu: ["EPYC", "Skylake-Server"],
    disk: ["scsi-hd", "nvme", "ufs"],
    media: ["scsi-cd", "sdhci-pci"],
    display: ["virtio-vga", "virtio-ramfb"],
  },
  "compat": {
    index: 2,
    title: "Compatibility",
    alt_next: "fastest",
    desc: "Prefer to emulate the widely used hardware",
    machine: ["pc"],
    cpu: ["Skylake-Client", "Broadwell", "IvyBridge", "Westmere", "Penryn", "Conroe"],
    disk: ["ahci", "piix4-ide", "piix3-ide", "usb-storage"],
    media: ["ide-cd", "sd-card", "emmc"],
    display: ["vga", "ramfb"],
  },
  "legacy": {
    index: 3,
    title: "Legacy",
    alt_next: "compat",
    desc: "Prefer to emulate ancient hardware",
    machine: ["isapc"],
    cpu: ["pentium3", "pentium", "486"],
    disk: ["isa-ide"],
    media: ["isa-fdc", "floppy"],
    display: ["cirrus-vga"],
  },
  "exotic-old": {
    index: 4,
    title: "Exotic Old",
    alt_next: "legacy",
    desc: "Prefer to emulate unique old hardware",
    machine: ["pc", "isapc"],
    cpu: ["athlon"],
    disk: [],
    media: [],
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
    media: [],
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
  display: Object.keys({ ...commonDisplays, ...x86Displays }),
};

const x86_64Modes = {
  cpu: ["host", "max", "qemu64", "EPYC", "Skylake-Server", "Skylake-Client", "Broadwell", "IvyBridge", "Westmere", "Penryn", "Conroe", "GraniteRapids", "SierraForest", "EPYC-Genoa"],
  machine: ["q35", "pc"],
  display: Object.keys({ ...commonDisplays, ...x86Displays }),
};

const armModes = {
  cpu: ["host", "max", "cortex-a15"],
  machine: ["virt", "versatilepb"],
  display: Object.keys({ ...commonDisplays }),
};

const riscvModes = {
  cpu: ["virt"],
  machine: ["virt"],
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

/**
 * 
 * @param {string} path 
 * @returns {Record<string, {kind: string, code: string}>}
 */
const edk2_uefi_map = (path) => {
  let r = {};
  for (const [arch, name] of Object.entries({
    "x86_64": "x86_64",
    "i386": "i386",
    "aarch64": "aarch64",
    "arm": "arm",
    "riscv64": "riscv",
    "riscv32": "riscv",
  })) {
    r[arch] = {
      kind: 'pflash',
      code: `${path}edk2-${name}-code.fd`,
    }
  }
  return r;
}

const OS_MATRIX = {
  "debian": {
    name: "Debian/Ubuntu", kvm: 'kvm', renderer: "sdl2",
    uefi: edk2_uefi_map("/usr/share/qemu/")
  },
  "windows": {
    // XXX nobody on internet can answer why kernel-irqchip=off needed?
    name: "Windows", kvm: 'whpx,kernel-irqchip=off', renderer: "sdl2",
    uefi: edk2_uefi_map("C:\\Program Files\\qemu\\share\\")
  },
  "mac": {
    name: "macOS", kvm: 'hvf', renderer: "cocoa",
    uefi: edk2_uefi_map("/opt/homebrew/opt/qemu/share/qemu/"),
  }
}

const GENERATE_ARGS = ({ os, arch, kvm, uefi, ram, smp, machine, cpu, drives, display, display_gpu, network, sound }) => {
  let args = [];
  const archInfo = ARCH_MATRIX[arch];
  const osInfo = OS_MATRIX[os];
  const br = os == 'windows' ? " `\n  " : " \\\n  ";

  args.push(archInfo.binary);
  if (kvm && ['qemu32', 'qemu64', 'host'].includes(cpu)) {
    args.push(`-accel ${osInfo.kvm}`);
  }

  args.push(`-m ${ram}G`);
  args.push(`-smp ${smp}`);
  args.push(`-machine ${machine}`);
  args.push(`-cpu ${cpu}`);

  if (uefi) {
    args.push(`-drive if=pflash,format=raw,file="${osInfo.uefi[arch].code}",readonly=on`);
  }

  drives.forEach((drive, i) => {
    if (!drive.path) return;
    const hdN = drive.path;
    const hdF = hdN.endsWith('.qcow2') ? 'qcow2' : 'raw';
    let flag = `-drive file=${hdN},format=${hdF},`;

    if (drive.controller === 'nvme') {
      // NVMe is special (needs -device)
      flag += `if=none,id=nvm${i} `;
      args.push(flag);
      args.push(`-device nvme,serial=drive${i},drive=nvm${i}`)
    } else if (drive.controller === 'usb') {
      // USB is special
      flag += `if=none,id=usb${i}`;
      args.push(flag);
      args.push(`-device usb-storage,drive=usb${i}`)
    } else {
      // Standard logic (virtio, ide, scsi, sata)
      flag += `if=${drive.controller},media=${drive.type}`;
      args.push(flag);
    }
  });

  let gpu = display;
  if (display_gpu && DISPLAYS_OPT[gpu] && DISPLAYS_OPT[gpu].gl) {
    gpu = DISPLAYS_OPT[gpu].gl;
    args.push(`-display ${osInfo.renderer},gl=on`);
  }
  args.push(`-device ${gpu}`);

  if (network) {
    const nic = network;
    args.push(`-netdev user,id=net0`);
    args.push(`-device ${nic},netdev=net0`);
  }

  if (sound) {
    if (sound === 'intel-hda') {
      args.push("-device intel-hda -device hda-duplex");
    } else {
      args.push(`-device ${sound}`);
    }
  }


  return args.join(br);

}