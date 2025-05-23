// import { useState, useEffect } from 'preact/hooks';
// import { fetchConfig, addUrl, removeUrl, ConfigType } from '../../services/api';
// import { useTranslation } from 'react-i18next';



// export default function PageUrl() {
  
  
//   const { t } = useTranslation();

//   const [config, setConfig] = useState<ConfigType>({
//     schedule: '',
//     webhook_global: '',
//     remove_elements_global: [],
//     storage_type: '',
//     storage_config: {
//       file: { path: '' },
//       s3: { region: '', bucket_name: '', folder: '' }},
//     urls: []
//   });

//   const [newUrl, setNewUrl] = useState<string>('');

//   useEffect(() => {
//     loadConfig();
//   }, []);

//   const loadConfig = async () => {
//     try {
//       const configData = await fetchConfig();
//       setConfig(configData);
//     } catch (error) {
//       console.error('Erro ao carregar configuração:', error);
//     }
//   };


//   const handleAddUrl = async () => {
//     if (!newUrl) return;

//     try {
//       //await addUrl({ url: newUrl });
//       // setConfig((prev) => ({
//       //   ...prev,
//       //   urls: [...prev.urls, { url: newUrl, active:false }]
//       // }));
//       setNewUrl('');
//     } catch (error) {
//       console.error('Erro ao adicionar URL:', error);
//       alert('Erro ao adicionar URL');
//     }
//   };

//   const handleRemoveUrl = async (urlToRemove: string) => {
//     try {
//       //await removeUrl({ url: urlToRemove });
//       setConfig((prev) => ({
//         ...prev,
//         urls: prev.urls.filter(item => item.url !== urlToRemove)
//       }));
//     } catch (error) {
//       console.error('Erro ao remover URL:', error);
//       alert('Erro ao remover URL');
//     }
//   };

//   return (
//     <div className="page-url">

//       <div className="url-form">
//         <label for="first-name" class="block mb-1 text-sm font-semibold antialiased text-stone-800">Url</label>
//         <input
//           type="text"
//           value={newUrl}
//           onChange={(e: Event) => {
//             const target = e.target as HTMLInputElement;
//             setNewUrl(target.value);
//           }}
//           placeholder="https://exemplo.com"
//         />
//         <button onClick={handleAddUrl}>{t("buttons.addurl")}</button>
//       </div>

//       <ul className="url-list">
//         {config.urls.map((item, index) => (
//           <li key={index}>
//             {item.url}
//                 -    {item.active?.toString()}-
//             <button onClick={() => handleRemoveUrl(item.url)} className="bg-danger">
//               Remover
//             </button>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };
