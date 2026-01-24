const { createApp, ref, computed, onMounted } = Vue;

createApp({
    setup() {
        const saved = ref([]);
        const form = ref({
            arch: 'x86_64', preset: "virtualize",
            os: 'debian', ram: 2, smp: 2, kvm: true,
            uefi: true,
            drives: [
                { controller: 'virtio', type: 'disk', path: 'harddrive.img' },
                { controller: 'virtio', type: 'cdrom', path: 'cd.iso' }
            ],
            usb: 'qemu-xhci',
            usb_hub: false,
            input: 'usb',
            sound: '',
            // preditable mouse
            input_tablet: true,
            // most shipped QEMU requires extra step, or buggy
            display_gpu: false,
        });

        // filtered keys, decreasing order of dependency
        const preset_keys = Object.entries(PRESET_MATRIX).map(([k, v]) => ({ key: k, i: v.index })).sort((a, b) => a.i > b.i).map(x => x.key);
        const arch_keys = ref(Object.keys(ARCH_MATRIX));
        const machine_keys = ref(Object.keys(MACHINES));
        const usb_keys = ref(Object.keys(USB_CONTROLLERS));
        const disk_keys = Object.keys(DISK_CONTROLLERS);
        const cpu_keys = ref(Object.keys(CPUS));
        const display_keys = ref(Object.keys(DISPLAYS));
        const network_keys = ref(Object.keys(NETWORKS));
        const input_keys = ref(Object.keys(INPUTS));
        const sound_keys = ref(Object.keys(SOUNDS));
        let last_preset = '';

        const computePreset = (p) => {
            return [PRESET_LOOKUP[p.cpu]].join(":");
        }
        const cmd = computed(() => {
            const archInfo = ARCH_MATRIX[form.value.arch];
            const osInfo = OS_MATRIX[form.value.os];

            if (!archInfo || !osInfo) {
                return '// Invalid arch selected';
            }
            cpu_keys.value = archInfo.modes.cpu;
            machine_keys.value = archInfo.modes.machine;
            display_keys.value = archInfo.modes.display;
            input_keys.value = archInfo.modes.input;
            network_keys.value = archInfo.modes.network;
            // usb_keys.value = archInfo.modes.usb;

            if (last_preset != '' && last_preset != computePreset(form.value)) {
                form.value.preset = '';
                last_preset = '';
            }

            if ([cpu_keys, machine_keys].some(x => x.length == 0)) {
                return '// Data is empty here';
            }

            return GENERATE_ARGS(form.value);
        });

        const saveToLocal = () => {
            const name = form.value.name || prompt("Name this preset:", "MyVM");
            if (name) {
                saved.value = saved.value.filter(x => x.name != name);
                saved.value.push({ ...form.value, name });
                localStorage.setItem('qemu_data', JSON.stringify(saved.value));
                alert("Saved!");
            }
        };

        const loadFromLocal = (data) => form.value = { ...data };
        const removeSave = (idx) => {
            saved.value.splice(idx, 1);
            localStorage.setItem('qemu_data', JSON.stringify(saved.value));
        };
        let findAlt = (data, name, preset) => {
            const presetInfo = PRESET_MATRIX[preset];
            if (!presetInfo || !presetInfo.alt_next) {
                return data[0];
            }
            return data.find(x => presetInfo[name].includes(x)) || findAlt(data, name, presetInfo.alt_next);
        }
        const usePreset = () => {
            let presetInfo = PRESET_MATRIX[form.value.preset];
            const archInfo = ARCH_MATRIX[form.value.arch];
            if (!archInfo) {
                return;
            }
            if (!presetInfo) {
                form.value.preset = PRESET_LOOKUP[form.value.cpu];
                presetInfo = PRESET_MATRIX[form.value.preset];
            }
            form.value.machine = findAlt(archInfo.modes.machine, 'machine', form.value.preset);
            form.value.cpu = findAlt(archInfo.modes.cpu, 'cpu', form.value.preset);
            form.value.display = findAlt(archInfo.modes.display, 'display', form.value.preset);
            form.value.network = findAlt(archInfo.modes.network, 'network', form.value.preset);
            for (const drive of form.value.drives) {
                drive.controller = findAlt(disk_keys, 'disk', form.value.preset);
            }
            if (form.value.input == 'ps2' && ['i386', 'x86_64'].includes(form.value.arch)) {
                form.value.input = 'usb';
            }
            form.value.uefi = form.value.arch != "i386";
            last_preset = computePreset(form.value);
        }
        const toggleKvm = () => {
            let cpu = form.value.cpu;
            if (cpu.startsWith('qemu')) {
                form.value.kvm = !form.value.kvm;
            } else {
                form.value.kvm = true;
                form.value.cpu = form.value.cpu == 'max' ? 'host' : 'max'
            }
        }
        const addDrive = () => {
            form.value.drives.push({ controller: 'virtio', type: 'disk', path: '' });
        };

        const removeDrive = (index) => {
            form.value.drives.splice(index, 1);
        };
        onMounted(() => {
            const raw = localStorage.getItem('qemu_data');
            if (raw) {
                saved.value = JSON.parse(raw);
            }
            usePreset();
        });

        return {
            PRESET_MATRIX, ARCH_MATRIX, OS_MATRIX, MACHINES, DISK_CONTROLLERS, USB_CONTROLLERS,
            CPUS, DISPLAYS, DISPLAYS_OPT, MEDIA_TYPES, NETWORKS, SOUNDS, INPUTS,
            preset_keys, arch_keys, machine_keys, cpu_keys, display_keys, network_keys, sound_keys, input_keys, usb_keys,
            form, cmd, saved, saveToLocal, loadFromLocal, removeSave, usePreset, toggleKvm, addDrive, removeDrive,
        };
    }
}).mount('#app');
