const configData = {
  architectures: {
    "x86_64": { binary: "qemu-system-x86_64", machine: "q35", cpu: "host" },
    "i386": { binary: "qemu-system-i386", machine: "pc", cpu: "pentium3" },
    "aarch64": { binary: "qemu-system-aarch64", machine: "virt", cpu: "max" },
    "arm": { binary: "qemu-system-arm", machine: "versatilepb", cpu: "cortex-a15" },
    "riscv64": { binary: "qemu-system-riscv64", machine: "virt", cpu: "rv64" },
    "riscv32": { binary: "qemu-system-riscv32", machine: "virt", cpu: "rv32" },
    "loongarch64": { binary: "qemu-system-loongarch64", machine: "virt", cpu: "la464" }
  },
  os_presets: {
    "debian": { name: "Debian/Ubuntu", vga: "virtio", net: "virtio-net-pci" },
    "windows": { name: "Windows", vga: "std", net: "e1000", extra: ["-rtc base=localtime"] },
    "mac": { name: "macOS", vga: "vmware", net: "virtio-net-pci", extra: ["-device isa-applesmc"] }
  },
  vga_options: ["virtio", "std", "qxl", "vmware", "none"]
};
