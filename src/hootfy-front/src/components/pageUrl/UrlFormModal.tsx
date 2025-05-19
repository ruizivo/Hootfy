import { useState, useEffect } from 'preact/hooks';
import { UrlEntry } from '../../services/api';
import { useTranslation } from 'react-i18next';

interface UrlFormModalProps {
  initialData?: UrlEntry;
  onClose: () => void;
  onSave: (entry: UrlEntry, index?: number) => void;
  indexToEdit?: number;
}

export default function UrlFormModal({ onClose, onSave, initialData, indexToEdit }: UrlFormModalProps) {

    const { t } = useTranslation();

  const [form, setForm] = useState<UrlEntry>({
    url: '',
    active: true,
    webhook: '',
    remove_elements: [],
    include_elements: [],
    enable_screenshot: false,
  });

  useEffect(() => {
    if (initialData) setForm(initialData);
  }, [initialData]);

  const handleChange = (e: Event) => {
    const target = e.target as HTMLInputElement;
    const { name, type, value, checked } = target;
    setForm({ ...form, [name]: type === 'checkbox' ? checked : value });
  };

  const handleListChange = (e: Event, key: 'remove_elements' | 'include_elements') => {
    const value = (e.target as HTMLInputElement).value;
    setForm({ ...form, [key]: value.split(',').map(s => s.trim()) });
  };

  const handleSubmit = (e: Event) => {
    e.preventDefault();
    onSave(form, indexToEdit);
    onClose();
  };

  return (
    <div class="fixed inset-0 bg-black/75 flex justify-center items-center z-50" >
      <div class="bg-white p-6 rounded-lg w-full max-w-3xl relative shadow-lg">
        <span onClick={onClose} class="absolute top-2 right-3 text-gray-500 text-2xl cursor-pointer">×</span>
        <h2 class="text-lg font-semibold mb-4">{indexToEdit != null ? t('labels.edit_modal_title') : t('labels.add_modal_title')}</h2>

        <form onSubmit={handleSubmit} class="space-y-6">
          <div class="grid md:grid-cols-2 gap-4">
            <div>
              <label class="block">URL</label>
              <input name="url" value={form.url} onInput={handleChange} class="w-full border px-3 py-2 rounded" 
                placeholder="https://exemplo.com"/>
            </div>
            <div>
              <label class="block">Webhook</label>
              <input name="webhook" value={form.webhook || ''} onInput={handleChange} class="w-full border px-3 py-2 rounded" 
            placeholder="http://..."/>
            </div>
            <div class="flex items-center space-x-2">
              <input type="checkbox" name="active" checked={form.active} onChange={handleChange} 
                class="h-4 w-4"/>
              <label>{t('labels.active')}</label>
            </div>
            <div class="flex items-center space-x-2">
              <input type="checkbox" name="enable_screenshot" checked={form.enable_screenshot} onChange={handleChange} 
                class="h-4 w-4"/>
              <label>{t('labels.screenshot')}</label>
            </div>
          </div>

          <div>
            <label class="block">{t('labels.remove_elements')}</label>
            <input value={form.remove_elements.join(', ')} onInput={(e) => handleListChange(e, 'remove_elements')} class="w-full border px-3 py-2 rounded" 
          placeholder=".class1, #id1"/>
          </div>

          <div>
            <label class="block">{t('labels.include_elements')}</label>
            <input value={form.include_elements.join(', ')} onInput={(e) => handleListChange(e, 'include_elements')} class="w-full border px-3 py-2 rounded" 
          placeholder="#id2, .class2"/>
          </div>

          <div class="text-right">
            <button type="submit" class="">
              {t('buttons.save')}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
