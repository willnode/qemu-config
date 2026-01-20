

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
  "virtio-blk": "Virt-IO BLK (basic) storage", // alias to "virtio"
  "virtio-scsi": "Virt-IO SCSI (advanced) storage",
  "virtio-9p": "Virt-IO 9P (bridged) storage",
  // fastest
  "scsi-hd": "Virtual SCSI storage",
  "nvme": "Virtual NVME storage",
  "ufs": "Universal flash storage",
  // compat
  "ahci": "ICH9 AHCI storage",
  "piix4-ide": "PIIX4 IDE storage",
  "piix3-ide": "PIIX3 IDE storage",
  "usb-storage": "Basic USB storage",
  // legacy
  // exotic-old
  // exotic-new
  "am53c974": "AMD Am53c974 PCI SCSI",
  "dc390": "Tekram DC-390 SCSI adapter",
  "megasas": "LSI MegaRAID SAS 1078",
}

const x86Disks = {
  // legacy
  "isa-ide": "ISA IDE storage",
}

const commonMedia = {
  // virtualize
  // fastest
  "scsi-cd": "Virtual SCSI CD-ROM",
  "sdhci-pci": "SDHCI SD Controller",
  // compat
  "ide-cd": "Virtual IDE CD-ROM",
  // legacy
}

const x86Media = {
  // compat (sd/usb bus)
  "emmc": "Basic eMMC",
  "sd-card": "Basic SD Controller",
  "floppy": "Floppy drive",
  // legacy
  "isa-fdc": "ISA floppy storage",
}

const DISKS = { ...commonDisks, ...x86Disks, }

const MEDIAS = { ...commonMedia, ...x86Media, }

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
  disk: Object.keys({ ...commonDisks, ...x86Disks, }),
  media: Object.keys({ ...commonMedia, ...x86Media, }),
  display: Object.keys({ ...commonDisplays, ...x86Displays }),
};

const x86_64Modes = {
  cpu: ["host", "max", "qemu64", "EPYC", "Skylake-Server", "Skylake-Client", "Broadwell", "IvyBridge", "Westmere", "Penryn", "Conroe", "GraniteRapids", "SierraForest", "EPYC-Genoa"],
  machine: ["q35", "pc"],
  disk: Object.keys({ ...commonDisks, ...x86Disks, }),
  media: Object.keys({ ...commonMedia, ...x86Media, }),
  display: Object.keys({ ...commonDisplays, ...x86Displays }),
};

const armModes = {
  cpu: ["host", "max", "cortex-a15"],
  machine: ["virt", "versatilepb"],
  disk: Object.keys({ ...commonDisks }),
  media: Object.keys({ ...commonMedia, }),
  display: Object.keys({ ...commonDisplays }),
};

const riscvModes = {
  cpu: ["virt"],
  machine: ["virt"],
  disk: Object.keys({ ...commonDisks }),
  media: Object.keys({ ...commonMedia, }),
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
  "debian": { name: "Debian/Ubuntu", kvm: 'kvm', },
  "windows": { name: "Windows", kvm: 'whpx,kernel-irqchip=off', }, // XXX nobody on internet can answer why kernel-irqchip=off needed?
  "mac": { name: "macOS", kvm: 'hvf', }
}

const GENERATE_ARGS = ({ os, arch, kvm, uefi, ram, smp, machine, cpu, disk, diskpath, media, mediapath, display, display_gpu, network, sound }) => {
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
    if (arch === 'x86_64') args.push("-bios /usr/share/ovmf/OVMF.fd");
    else if (arch === 'aarch64') args.push("-pflash /usr/share/AAVMF/AAVMF_CODE.fd");
  }

  if (diskpath && disk) {
    let diskidx = 0;
    for (const hdN of diskpath.trim().split(',')) {
      const hdI = diskidx;
      const hdF = hdN.endsWith('.qcow2') ? 'qcow2' : 'raw';
      if (disk === 'virtio-blk') {
        args.push(`-drive file=${hdN},format=${hdF},if=none,id=hd${hdI}`);
        args.push(`-device virtio-blk-pci,drive=hd${hdI}`);
      } else if (disk === 'nvme') {
        args.push(`-drive file=${hdN},format=${hdF},if=none,id=nvm0`);
        args.push(`-device nvme,serial=nvme-serial-${hdI},drive=nvm0`);
      } else if (disk === 'virtio-scsi') {
        if (diskidx == 0) {
          args.push(`-device virtio-scsi-pci,id=scsi0`);
        }
        args.push(`-device scsi-hd,drive=hd${hdI},bus=scsi0.${hdI}`);
        args.push(`-drive file=${hdN},format=${hdF},if=none,id=hd${hdI}`);
      } else if (disk === 'ahci') {
        if (diskidx == 0) {
          args.push(`-device ahci,id=ahci`);
        }
        args.push(`-device ide-hd,drive=hd${hdI},bus=ahci.${hdI}`);
        args.push(`-drive file=${hdN},format=${hdF},if=none,id=hd${hdI}`);
      } else {
        args.push(`-drive file=${hdN},format=${hdF},if=none,id=hd${hdI}`);
        args.push(`-device ${disk},drive=hd${hdI}`);
      }
      diskidx++;
    }
  }

  if (mediapath && media) {
    if (media === 'ide-cd') {
      args.push(`-drive file=${mediapath},if=ide,index=1,media=cdrom`);
    } else {
      args.push(`-drive file=${mediapath},if=none,id=cd0,media=cdrom`);
      args.push(`-device ${media},drive=cd0`);
    }
  }

  let gpu = display;
  if (display_gpu && DISPLAYS_OPT[gpu] && DISPLAYS_OPT[gpu].gl) {
    gpu = DISPLAYS_OPT[gpu].gl;
    args.push("-display sdl,gl=on");
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