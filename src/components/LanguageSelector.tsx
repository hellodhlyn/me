import { useState } from "react";
import { Listbox } from "@headlessui/react";
import { LanguageIcon } from "@heroicons/react/24/solid";

const supportedLanguages = [
  { id: "ko", name: "한국어" },
  { id: "en", name: "English" },
  { id: "ja", name: "日本語" },
];

type LanguageSelectorProps = {
  initialLanguage: string;
  onSelect: (language: string) => void;
}

export function LanguageSelector({ initialLanguage, onSelect }: LanguageSelectorProps) {
  const [currentLanguage, setCurrentLanguage] = useState(
    supportedLanguages.find((lang) => lang.id === initialLanguage) || supportedLanguages[0]
  );

  return (
    <Listbox
      value={currentLanguage}
      onChange={(lang) => { setCurrentLanguage(lang); onSelect(lang.id); }}
    >
      <Listbox.Button className="flex items-center px-4 py-2 text-base bg-gray-000 text-gray-800 border border-gray-300 rounded-md hover:opacity-50 transition cursor-pointer shadow-lg">
        <LanguageIcon className="h-4 w-4 mr-1" />
        <span>{currentLanguage.name}</span>
      </Listbox.Button>
      <Listbox.Options className="absolute mt-2 w-24 py-1 bg-gray-000 text-gray-800 border border-gray-300 rounded-md shadow-lg">
        {supportedLanguages.map((language) => (
          <Listbox.Option
            key={language.id} value={language}
            className="py-1 px-4 hover:bg-gray-300 rounded-md transition cursor-pointer"
          >
            {language.name}
          </Listbox.Option>
        ))}
      </Listbox.Options>
    </Listbox>
  )
};
