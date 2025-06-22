export const osusConfigurationReactive = reactive<{ osusConfiguration: OsusConfiguration }>({
    osusConfiguration: DefaultOsusConfiguration,
});

export const isUndergoingProcess = reactive<{ active: boolean }>({ active: false });
