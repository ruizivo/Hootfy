// import { useState } from 'preact/hooks';

// interface UrlEntry {
//   url: string;
//   active: boolean;
//   webhook: string | null;
//   remove_elements: string[];
//   include_elements: string[];
//   enable_screenshot: boolean;
// }

// export default function UrlForm() {
//   const [form, setForm] = useState<UrlEntry>({
//     url: '',
//     active: true,
//     webhook: '',
//     remove_elements: [],
//     include_elements: [],
//     enable_screenshot: false,
//   });

//   const handleChange = (e: Event) => {
//     const target = e.target as HTMLInputElement;
//     const { name, type, value, checked } = target;

//     setForm({
//       ...form,
//       [name]: type === 'checkbox' ? checked : value,
//     });
//   };

//   const handleListChange = (e: Event, key: 'remove_elements' | 'include_elements') => {
//     const value = (e.target as HTMLInputElement).value;
//     setForm({ ...form, [key]: value.split(',').map(s => s.trim()) });
//   };

//   const handleSubmit = (e: Event) => {
//     e.preventDefault();
//     console.log('Dados enviados:', form);
//     // aqui você pode enviar para a API ou atualizar um estado global
//   };

//   return (
//     <form onSubmit={handleSubmit} class="max-w-3xl mx-auto p-6 bg-white rounded shadow space-y-6">
//       <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
//         <div>
//           <label class="block font-medium">URL</label>
//           <input
//             name="url"
//             value={form.url}
//             onInput={handleChange}
//             class="w-full border rounded px-3 py-2"
//             placeholder="https://exemplo.com"
//           />
//         </div>

//         <div>
//           <label class="block font-medium">Webhook (opcional)</label>
//           <input
//             name="webhook"
//             value={form.webhook || ''}
//             onInput={handleChange}
//             class="w-full border rounded px-3 py-2"
//             placeholder="http://..."
//           />
//         </div>

//         <div class="flex items-center space-x-2">
//           <input
//             type="checkbox"
//             name="active"
//             checked={form.active}
//             onChange={handleChange}
//             class="h-4 w-4"
//           />
//           <label class="font-medium">Ativo</label>
//         </div>

//         <div class="flex items-center space-x-2">
//           <input
//             type="checkbox"
//             name="enable_screenshot"
//             checked={form.enable_screenshot}
//             onChange={handleChange}
//             class="h-4 w-4"
//           />
//           <label class="font-medium">Captura de tela</label>
//         </div>
//       </div>

//       <div>
//         <label class="block font-medium">Remove Elements (separar por vírgula)</label>
//         <input
//           value={form.remove_elements.join(', ')}
//           onInput={(e) => handleListChange(e, 'remove_elements')}
//           class="w-full border rounded px-3 py-2"
//           placeholder=".class1, #id1"
//         />
//       </div>

//       <div>
//         <label class="block font-medium">Include Elements (separar por vírgula)</label>
//         <input
//           value={form.include_elements.join(', ')}
//           onInput={(e) => handleListChange(e, 'include_elements')}
//           class="w-full border rounded px-3 py-2"
//           placeholder="#id2, .class2"
//         />
//       </div>

//       <div class="text-right">
//         <button
//           type="submit"
//           class="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
//         >
//           Salvar URL
//         </button>
//       </div>
//     </form>
//   );
// }
