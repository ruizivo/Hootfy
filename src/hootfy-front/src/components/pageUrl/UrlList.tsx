import { useEffect, useState } from 'preact/hooks';
import UrlFormModal from './UrlFormModal';
import { addUrl, ConfigType, editUrl, fetchConfig, removeUrl, UrlEntry } from '../../services/api';
import { useTranslation } from 'react-i18next';

export default function UrlList() {
    //const [urls, setUrls] = useState<UrlEntry[]>([]);
    const [showModal, setShowModal] = useState(false);
    const [editIndex, setEditIndex] = useState<number | null>(null);
    const { t } = useTranslation();

    const [config, setConfig] = useState<ConfigType>({
        schedule: '',
        webhook_global: '',
        remove_elements_global: [],
        storage_type: '',
        storage_config: {
            s3: { region: '', bucket_name: '', folder: '' }
        },
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
            console.error('Erro ao carregar configuração:', error);
        }
    };

    const handleSave = async (entry: UrlEntry, index?: number) => {
        try {
            if (index != null) {
                await editUrl(index,entry);
            } else {
                await addUrl(entry);
            }
            loadConfig();
        } catch (error) {
            console.error('Erro ao adicionar URL:', error);
            alert('Erro ao adicionar URL');
        }
    };

    const handleDelete = async (index: number) => {
        try {
            await removeUrl(index);
            loadConfig();
        } catch (error) {
            console.error('Erro ao remover URL:', error);
            alert('Erro ao remover URL');
        }
    };

    const handleEdit = (index: number) => {
        setEditIndex(index);
        setShowModal(true);
    };

    const handleAddNew = () => {
        setEditIndex(null);
        setShowModal(true);
    };


    return (
        <div class="">
            <div class="flex justify-between items-center">
                <button onClick={handleAddNew} class="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">{t('buttons.addurl')}</button>
            </div>

            {config.urls.length === 0 && <p class="text-gray-500">{t('labels.empty_url_list')}</p>}

            <ul class="space-y-2">
                {config.urls.map((url, index) => (
                    <li key={index} class="border p-4 rounded bg-gray-50 flex justify-between items-start">
                        <div onClick={() => handleEdit(index)} class="cursor-pointer flex-1">
                            <div class="font-semibold">{url.url}</div>
                            <div class="text-sm text-gray-600">{url.active ? t('labels.active') : t('labels.inactive')} · {t('labels.screenshot')}: {url.enable_screenshot ? t('labels.yes') : t('labels.no')}</div>
                            {url.webhook && <div class="text-sm text-gray-500">Webhook: {url.webhook}</div>}
                        </div>
                        <button onClick={() => handleDelete(index)} class="bg-danger">
                            {t('buttons.delete')}
                        </button>
                    </li>
                ))}
            </ul>

            {showModal && (
                <UrlFormModal
                    onClose={() => setShowModal(false)}
                    onSave={handleSave}
                    initialData={editIndex != null ? config.urls[editIndex] : undefined}
                    indexToEdit={editIndex != null ? editIndex : undefined}
                />
            )}
        </div>
    );
}
