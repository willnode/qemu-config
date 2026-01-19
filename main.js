const { createApp, ref, computed, onMounted } = Vue;

createApp({
    setup() {
        const saved = ref([]);
        const form = ref({ arch: 'x86_64', preset: "virtualize", os: 'debian', ram: 2, smp: 2, cpu: 'max', vga: 'virtio' });

        // filtered keys, decreasing order of dependency
        const preset_keys = Object.entries(PRESET_MATRIX).map(([k, v]) => ({ key: k, i: v.index })).sort((a, b) => a.i > b.i).map(x => x.key);
        const arch_keys = ref(Object.keys(ARCH_MATRIX));
        const machine_keys = ref(Object.keys(MACHINES));
        const cpu_keys = ref(Object.keys(CPUS));
        const disk_keys = ref(Object.keys(DISKS));
        const display_keys = ref(Object.keys({}));
        const network_keys = ref(Object.keys({}));
        const sound_keys = ref(Object.keys({}));
        const input_keys = ref(Object.keys({}));

        const cmd = computed(() => {
            const presetInfo = PRESET_MATRIX[form.value.preset];
            const archInfo = ARCH_MATRIX[form.value.arch];
            if (!archInfo || !presetInfo) {
                return '// Invalid preset or arch combination';
            }
            cpu_keys.value = archInfo.modes.cpu;
            machine_keys.value = archInfo.modes.machine;
            disk_keys.value = archInfo.modes.disk;

            if ([cpu_keys, machine_keys, disk_keys].some(x => x.length == 0)) {
                return '// Data is empty here';
            }

            const osInfo = OS_MATRIX[form.value.os];
            const br = form.value.os == 'windows' ? " `\n  " : " \\\n  ";

            let parts = [
                archInfo.binary,
                `-m ${form.value.ram * 1024}`,
                `-smp ${form.value.smp}`,
                `-machine ${form.value.machine}`,
                `-cpu ${form.value.cpu}`,
                `-vga ${form.value.vga}`,
                `-netdev user,id=net0 -device ${osInfo.net},netdev=net0`
            ];

            if (osInfo.extra) parts.push(...osInfo.extra);

            return parts.join(br);
        });

        const saveToLocal = () => {
            const name = prompt("Name this VM:", "MyVM");
            if (name) {
                saved.value.push({ ...form.value, name });
                localStorage.setItem('qemu_data', JSON.stringify(saved.value));
            }
        };

        const loadFromLocal = (data) => form.value = { ...data };
        const removeSave = (idx) => {
            saved.value.splice(idx, 1);
            localStorage.setItem('qemu_data', JSON.stringify(saved.value));
        };

        onMounted(() => {
            const raw = localStorage.getItem('qemu_data');
            if (raw) saved.value = JSON.parse(raw);
        });

        return {
            PRESET_MATRIX, ARCH_MATRIX, OS_MATRIX, MACHINES, CPUS, DISKS, DISPLAYS, NETWORKS, SOUNDS, INPUTS,
            preset_keys, arch_keys, machine_keys, cpu_keys, disk_keys, display_keys, network_keys, sound_keys, input_keys,
            form, cmd, saved, saveToLocal, loadFromLocal, removeSave
        };
    }
}).mount('#app');
