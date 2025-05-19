import { useState, useEffect } from 'preact/hooks';
import { fetchConfig, ConfigType } from '../../services/api';
import { useTranslation } from 'react-i18next';

export default function Config() {
  const [webhookGlobal, setWebhookGlobal] = useState('');
  const [removeElementsGlobal, setRemoveElementsGlobal] = useState<string>('');
  const [storageType, setStorageType] = useState('file');
  const [s3Region, setS3Region] = useState('');
  const [s3Bucket, setS3Bucket] = useState('');
  const [s3Folder, setS3Folder] = useState('');
  const [schedule, setSchedule] = useState('');

  const { t } = useTranslation();
  

  const [config, setConfig] = useState<ConfigType>({
    schedule: '',
    webhook_global: '',
    remove_elements_global: [],
    storage_type: '',
    storage_config: {
      s3: { region: '', bucket_name: '', folder: '' }},
    urls: []
  });

  useEffect(() => {
    loadConfig();
  }, []);

  const loadConfig = async () => {
    try {
      const configData = await fetchConfig();
      setConfig(configData);
    } catch (error) {
      console.error('Error loading configurations:', error);
    }
  };


  const handleSubmit = (e: Event) => {
    e.preventDefault();

    const config = {
      webhook_global: webhookGlobal,
      remove_elements_global: removeElementsGlobal
        .split(',')
        .map((s) => s.trim()),
      storage_type: storageType,
      schedule,
      storage_config: {
        s3: {
          region: s3Region,
          bucket_name: s3Bucket,
          folder: s3Folder
        }
      }
    };

    console.log('Config:', config);
    // Aqui você pode salvar ou enviar via API
  };

  return (
    <div className="">
    <form onSubmit={handleSubmit} class="space-y-4">

      <label class="block">
        Webhook Global
        <input
          type="text"
          value={config.webhook_global}
          onInput={(e) => setWebhookGlobal((e.target as HTMLInputElement).value)}
          class="border p-2 w-full"
        />
      </label>

      <label class="block">
        {t('labels.remove_elements_global')}
        <input
          type="text"
          value={config.remove_elements_global.toString()}
          onInput={(e) => setRemoveElementsGlobal((e.target as HTMLInputElement).value)}
          class="border p-2 w-full"
        />
      </label>

      <label class="block">
        {t('labels.storage_type')}
        <select
          value={storageType}
          onChange={(e) => setStorageType((e.target as HTMLSelectElement).value)}
          class="border p-2 w-full"
        >
          <option value="file">{t('labels.file')}</option>
          <option value="s3">S3</option> 
        </select>
      </label>

      {storageType === 's3' && (
        <div class="space-y-2">
          <label class="block">
          {t('labels.s3_region')}
            <input
              type="text"
              value={config.storage_config.s3.region}
              onInput={(e) => setS3Region((e.target as HTMLInputElement).value)}
              class="border p-2 w-full"
            />
          </label>
          <label class="block">
            {t('labels.s3_bucket_name')}
            <input
              type="text"
              value={config.storage_config.s3.bucket_name}
              onInput={(e) => setS3Bucket((e.target as HTMLInputElement).value)}
              class="border p-2 w-full"
            />
          </label>
          <label class="block">
            {t('labels.s3_folder')}
            <input
              type="text"
              value={config.storage_config.s3.folder}
              onInput={(e) => setS3Folder((e.target as HTMLInputElement).value)}
              class="border p-2 w-full"
            />
          </label>
        </div>
      )}

      <label class="block">
        {t('labels.schedule')}
        <input
          type="text"
          value={config.schedule}
          onInput={(e) => setSchedule((e.target as HTMLInputElement).value)}
          class="border p-2 w-full"
        />
        {/* {cronstrue.toString(config.schedule, { locale: "en" })} */}
      </label>

      <button type="submit" class="bg-blue-500 text-white px-4 py-2 rounded">
        {t('buttons.save')}
      </button>
    </form>
    </div>
  );
}
