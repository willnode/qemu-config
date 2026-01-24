

// TODO: Common board for ARM?

const MACHINES = {
  // virtualize, fastest
  "q35": "ICH9 PCIe", // PCI, SCSI x86
  "virt": "Virtual Chipset", // ARM/RISCV
  // compat
  "pc": "PIIX4 PCI", // IDE x86
  // legacy
  "isapc": "ISA PC", // ISA x86
  // exotic-old
  "smdkc210": "Samsung Exynos4210",
  "raspi1ap": "Raspberry 1A",
  "raspi3ap": "Raspberry 3A",
  "raspi2b": "Raspberry 2B",
  "raspi3b": "Raspberry 3B",
  // exotic-new
  "sbsa-ref": "SBSA Reference Board",
  "xilinx-zynq-a9": "Xilinx Zynq A9",
  "raspi4b": "Raspberry 4B",
  "orangepi-pc": "Orange PI PC",
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
  "cortex-a710": "2021 ARM Cortex A710",
  // compat (x86_64-v3)
  "Skylake-Client": "2016 Intel Skylake",
  "Broadwell": "2014 Intel Broadwell",
  //// x86_64-v2
  "IvyBridge": "2012 Intel IvyBridge",
  "Westmere": "2010 Intel Core Gen 1",
  /// x86_64-v1
  "Penryn": "2007 Intel Core 2 Duo",
  "Conroe": "2006 Intel Celeron",
  /// arm
  "cortex-a76": "2018 ARM Cortex A76",
  "cortex-a32": "2016 ARM Cortex A32",
  // legacy
  "pentium3": "Intel Pentium 3", // i686
  "pentium": "Intel Pentium Pro", // i586
  "486": "Intel 80486", // i486
  "cortex-a53": "2012 ARM Cortex A53",
  "cortex-a17": "2014 ARM Cortex A17",
  // exotic-old
  "athlon": "AMD Athlon",
  // exotic-new  
  "GraniteRapids": "2024 Intel XEON P-Core",
  "SierraForest": "2024 Intel XEON E-Core",
  "EPYC-Genoa": "2022 AMD EPYC Genoa",
  "neoverse-n2": "2022 ARM Neoverse N2",
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
  "virtio-vga": "Virt-IO VGA MMIO",
  // compat
  "VGA": "PCI VGA",
  // legacy
  "isa-vga": "ISA VGA",
  "cirrus-vga": "Cirrus CLGD VGA",
  // exotic-old
  "ati-vga": "ATI VGA",
}

const DISPLAYS = { ...commonDisplays, ...x86Displays }

const DISPLAYS_OPT = {
  "virtio-gpu-pci": { gl: "virtio-gpu-gl-pci" },
  "virtio-vga": { gl: "virtio-vga-gl-pci" },
  "virtio-ramfb": { gl: "virtio-ramfb-gl" },
};

const commonInputs = {
  "virtio-pci": {
    name: "Virt-IO PCI",
    kbd: "virtio-keyboard-pci", serial: "virtio-serial-pci",
    tablet: "virtio-tablet-pci", mouse: "virtio-mouse-pci"
  },
  "virtio-device": {
    name: "Virt-IO MMIO",
    kbd: "virtio-keyboard-device", serial: "virtio-serial-device",
    tablet: "virtio-tablet-device", mouse: "virtio-mouse-device"
  },
  "usb": {
    name: "USB",
    kbd: "usb-kbd", serial: "usb-serial",
    tablet: "usb-tablet", mouse: "usb-mouse"
  },
};


const x86Inputs = {
  "ps2": {
    name: "PS/2",
    // empty values as these are the default on x86
    kbd: "", serial: "",
    tablet: "", mouse: ""
  },
};

const INPUTS = { ...commonInputs, ...x86Inputs }

// https://www.reddit.com/r/UTMapp/comments/1flphnr

const commonNetworks = {
  // virtualize
  "virtio-net-pci": "Virt-IO Net PCI",
  "virtio-net-device": "Virt-IO Net MMIO",
  // fastest
  "igb": "Intel Gigabit Net",
  "e1000e": "Intel e100e",
  // compat
  "e1000": "Intel e1000",
  "rtl8139": "Realtek 8139",
  "i82550": "Intel 8255x",
  "i82801": "Intel 82801",
  // legacy
  "usb-net": "USB Net",
};

const x86Networks = {
  // legacy
  "pcnet": "AMD LANCE",
  // exotic-old
  "ne2k-pci": "Novell 2K PCI",
  "ne2k-isa": "Novell 2K ISA",
  // exotic-new
  "rocker": "Rocker Switch",
};

const NETWORKS = { ...commonNetworks, ...x86Networks }

const SOUNDS = {
  "intel-hda": "Intel HD Audio",
  "ac97": "AC97",
  "sb16": "SoundBlaster 16",
  "pcspk": "PC Speaker",
};

// https://en.wikibooks.org/wiki/QEMU/Devices/USB/Root

const USB_CONTROLLERS = {
  // virtualize
  "qemu-xhci": "QEMU xHCI",
  // fastest
  "nec-usb-xhci": "NEC xHCI",
  // compat
  "piix3-usb-uhci": "PIIX3 UHCI",  // the default qemu usb
  "piix4-usb-uhci": "PIIX4 UHCI",
  // legacy
  "ich9-usb-uhci": "Intel ICH9 UHCI",
  "vt82c686b-usb-uhci": "VT82C686B UHCI",
  // exotic-old
  "sysbus-ohci": "Sysbus OHCI",
  "pci-ohci": "Apple OHCI",
  // exotic-new, as these don't support older USB
  "usb-ehci": "USB EHCI",
  "ich9-usb-ehci": "Intel ICH9 EHCI",
};

const DISK_CONTROLLERS = {
  "virtio": "VirtIO",
  "ide": "IDE", // TODO: x86 only
  "scsi": "SCSI",
  "sata": "SATA", // AHCI
  "sd": "SD",
  "floppy": "Floppy",
  "usb": "USB",
  "nvme": "NVMe"
};

const MEDIA_TYPES = {
  "disk": "Hard Disk",
  "cdrom": "CD-ROM",
};


const PRESET_MATRIX = {
  "virtualize": {
    index: 0,
    title: "Virtualize",
    // alt_next stop here
    desc: "Prefer to virtualize devices",
    machine: ["q35", "virt"],
    cpu: ["max", "host", "qemu64", "qemu32"],
    display: ["virtio-gpu-pci"],
    disk: ['virtio'],
    usb: ['qemu-xhci'],
    network: ['virtio-net-pci', 'virtio-net-device'],
  },
  "fastest": {
    index: 1,
    title: "Fastest",
    alt_next: "virtualize",
    desc: "Prefer to emulate the highest end of hardware",
    machine: [],
    cpu: ["EPYC", "Skylake-Server", "cortex-a710"],
    display: ["virtio-vga", "virtio-ramfb"],
    disk: ['nvme', 'scsi'],
    usb: ['nec-usb-xhci'],
    network: ['igb', 'e1000e'],
  },
  "compat": {
    index: 2,
    title: "Compatibility",
    alt_next: "fastest",
    desc: "Prefer to emulate the widely used hardware",
    machine: ["pc",],
    cpu: [
      "Skylake-Client", "Broadwell", "IvyBridge", "Westmere", "Penryn", "Conroe",
      "cortex-a32", "cortex-a76",
    ],
    display: ["VGA", "ramfb"],
    disk: ['sata', 'ide'],
    usb: ['piix3-usb-uhci', 'piix4-usb-uhci'],
    network: ['e1000', 'rtl8139', 'i82550', 'i82801'],
  },
  "legacy": {
    index: 3,
    title: "Legacy",
    alt_next: "compat",
    desc: "Prefer to emulate ancient hardware",
    machine: ["isapc"],
    cpu: ["pentium3", "pentium", "486", "cortex-a53", "cortex-a17"],
    display: ["isa-vga", "cirrus-vga"],
    disk: ['sata', 'ide'],
    usb: ['ich9-usb-uhci', 'vt82c686b-usb-uhci'],
    network: ['usb-net', 'pcnet'],
  },
  "exotic-old": {
    index: 4,
    title: "Exotic Old",
    alt_next: "legacy",
    desc: "Prefer to emulate unique old hardware",
    machine: ["smdkc210", "raspi3b", "raspi2b", "raspi3ap", "raspi1ap"],
    cpu: ["athlon"],
    display: ["ati-vga"],
    disk: [],
    usb: ['sysbus-ohci', 'pci-ohci'],
    network: ['ne2k-pci', 'ne2k-isa'],
  },
  "exotic-new": {
    index: 5,
    title: "Exotic New",
    alt_next: "fastest",
    desc: "Prefer to emulate unique new hardware",
    machine: ["sbsa-ref", "xilinx-zynq-a9", "raspi4b", "orangepi-pc"],
    cpu: ["GraniteRapids", "SierraForest", "EPYC-Genoa", 'neoverse-n2'],
    display: ["bochs-display"],
    disk: [],
    usb: ['usb-ehci', 'ich9-usb-ehci'],
    network: ['rocker'],
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
  input: Object.keys({ ...commonInputs, ...x86Inputs }),
  network: Object.keys({ ...commonNetworks, ...x86Networks }),
};

const x86_64Modes = {
  cpu: ["host", "max", "qemu64", "EPYC", "Skylake-Server", "Skylake-Client", "Broadwell", "IvyBridge", "Westmere", "Penryn", "Conroe", "GraniteRapids", "SierraForest", "EPYC-Genoa"],
  machine: ["q35", "pc"],
  display: Object.keys({ ...commonDisplays, ...x86Displays }),
  input: Object.keys({ ...commonInputs, ...x86Inputs }),
  network: Object.keys({ ...commonNetworks, ...x86Networks }),
};

const armModes = {
  cpu: ["host", "max", "cortex-a32", "cortex-a17"],
  machine: ["virt", "sbsa-ref", "smdkc210", "raspi2b", "raspi1ap"],
  display: Object.keys({ ...commonDisplays }),
  input: Object.keys({ ...commonInputs }),
  network: Object.keys({ ...commonNetworks }),
};

const aarch64Modes = {
  cpu: ["host", "max", "cortex-a710", "cortex-a76", "cortex-a53", "neoverse-n2"],
  machine: ["virt", "sbsa-ref", "xilinx-zynq-a9", "orangepi-pc", "raspi4b", "raspi3b", "raspi3ap"],
  display: Object.keys({ ...commonDisplays }),
  input: Object.keys({ ...commonInputs }),
  network: Object.keys({ ...commonNetworks }),
};

const riscvModes = {
  cpu: ["virt"],
  machine: ["virt"],
  display: Object.keys({ ...commonDisplays }),
  input: Object.keys({ ...commonInputs }),
  network: Object.keys({ ...commonNetworks }),
};

const ARCH_MATRIX = {
  "x86_64": { binary: "qemu-system-x86_64", name: "x86 64-bit", modes: x86_64Modes },
  "i386": { binary: "qemu-system-i386", name: "x86 32-bit", modes: x86Modes },
  "aarch64": { binary: "qemu-system-aarch64", name: "ARM 64-bit", modes: aarch64Modes },
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
    name: "Debian", kvm: 'kvm', renderer: "gtk",
    uefi: edk2_uefi_map("/usr/share/qemu/")
  },
  "ubuntu": {
    name: "Ubuntu 24", kvm: 'kvm', renderer: "gtk",
    uefi: {
      "x86_64": {
        kind: 'pflash',
        code: `/usr/share/ovmf/OVMF.fd`,
      },
      "i386": {},
      "aarch64": {
        kind: 'pflash',
        code: '/usr/share/AAVMF/AAVMF_CODE.fd',
      },
      "aarch64": {
        kind: 'pflash',
        code: '/usr/share/AAVMF/AAVMF32_CODE.fd',
      },
      "arm": "arm",
      "riscv64": {},
      "riscv32": {},
    }
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

const GENERATE_ARGS = ({ os, arch, kvm, uefi, ram, smp, machine, cpu, drives, display, display_gpu, usb, input, input_tablet, network, sound }) => {
  let args = [];
  const archInfo = ARCH_MATRIX[arch];
  const osInfo = OS_MATRIX[os];
  const br = os == 'windows' ? " `\n  " : " \\\n  ";
  const exe = os == 'windows' ? ".exe" : "";

  args.push(archInfo.binary + exe);
  if (kvm && ['qemu32', 'qemu64', 'host'].includes(cpu)) {
    args.push(`-accel ${osInfo.kvm}`);
  }

  args.push(`-m ${ram}G`);
  args.push(`-smp ${smp}`);
  args.push(`-machine ${machine}`);
  args.push(`-cpu ${cpu}`);

  if (uefi) {
    args.push(`-drive if=pflash,format=raw,file="${osInfo.uefi[arch].code}",readonly=on`);
    // there's also vars, but require user to copy the vars file, which is a hassle
  }

  if (usb) {
    args.push(`-device ${usb},id=usb`);
  } else if (input == 'usb' || drives.some(x => x.controller == 'usb')) {
    args.push(`-device piix3-usb-uhci,id=usb`);
  }

  let usbBus = 0;
  drives.forEach((drive, i) => {
    if (!drive.path) return;
    const hdN = drive.path;
    const hdF = hdN.endsWith('.qcow2') ? 'qcow2' : 'raw';
    let flag = `-drive file=${hdN},format=${hdF},`;

    if (drive.controller === 'nvme') {
      flag += `if=none,id=nvm${i} `;
      args.push(flag);
      args.push(`-device nvme,serial=drive${i},drive=nvm${i}`)
    } else if (drive.controller === 'usb') {
      flag += `if=none,id=usb${i}`;
      args.push(flag);
      args.push(`-device usb-storage,bus=usb.${usbBus++},drive=usb${i}`)
    } else {
      flag += `if=${drive.controller},media=${drive.type}`;
      if (drive.type == "cdrom") {
        flag += ",readonly=on";
      }
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
    args.push(`-netdev user,id=net0`);
    args.push(`-device ${network},netdev=net0`);
  }

  if (sound) {
    if (sound === 'intel-hda') {
      args.push("-device intel-hda -device hda-duplex");
    } else {
      args.push(`-device ${sound}`);
    }
  }

  if (input && INPUTS[input]) {
    const inputInfo = INPUTS[input];
    if (input_tablet) {
      inputInfo.tablet && args.push(`-device ${inputInfo.tablet}`);
    } else {
      inputInfo.mouse && args.push(`-device ${inputInfo.mouse}`);
    }
    inputInfo.kbd && args.push(`-device ${inputInfo.kbd}`);
    // TODO: Serial input?
  }

  // TODO: make serial configurable?
  args.push(`-chardev stdio,signal=off,mux=on,id=char0`)
  args.push(`-serial chardev:char0 -mon chardev=char0`)
  return args.join(br);

}