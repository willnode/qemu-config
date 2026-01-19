const { createApp, ref, computed, onMounted } = Vue;

createApp({
    setup() {
        const saved = ref([]);
        const form = ref({ arch: 'x86_64', os: 'debian', ram: 2, cpu: 2, vga: 'virtio' });

        const cmd = computed(() => {
            const archInfo = configData.architectures[form.value.arch];
            const osInfo = configData.os_presets[form.value.os];
            const br = form.value.os == 'windows' ? " `\n  " : " \\\n  ";

            let parts = [
                archInfo.binary,
                `-m ${form.value.ram * 1024}`,
                `-smp ${form.value.cpu}`,
                `-machine ${archInfo.machine}`,
                `-cpu ${archInfo.cpu}`,
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

        return { form, cmd, configData, saved, saveToLocal, loadFromLocal, removeSave };
    }
}).mount('#app');
